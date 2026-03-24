import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const PAYMONGO_API = "https://api.paymongo.com/v1";

function paymongoAuth(): string {
  const key = process.env["PAYMONGO_SECRET_KEY"];
  if (!key) throw new Error("PAYMONGO_SECRET_KEY is not configured.");
  return "Basic " + Buffer.from(`${key}:`).toString("base64");
}

// POST /api/give/create-checkout
router.post("/create-checkout", async (req, res) => {
  const {
    amount,        // number, in PHP (e.g. 500)
    donorName,     // string, optional
    donorEmail,    // string, optional
    note,          // string, optional ("Tithe", "Offering", etc.)
    successUrl,    // string — where to redirect on success
    cancelUrl,     // string — where to redirect on cancel
  } = req.body as {
    amount?: number;
    donorName?: string;
    donorEmail?: string;
    note?: string;
    successUrl?: string;
    cancelUrl?: string;
  };

  if (!amount || isNaN(amount) || amount < 100) {
    res.status(400).json({ error: "Minimum donation amount is ₱100." });
    return;
  }

  if (!successUrl || !cancelUrl) {
    res.status(400).json({ error: "successUrl and cancelUrl are required." });
    return;
  }

  const amountInCentavos = Math.round(amount * 100);
  const itemName = note
    ? `El-Bethel Donation — ${note}`
    : "El-Bethel Christian Fellowship Church — Donation";

  const body = {
    data: {
      attributes: {
        line_items: [
          {
            currency: "PHP",
            amount: amountInCentavos,
            name: itemName,
            quantity: 1,
          },
        ],
        payment_method_types: ["card", "gcash", "paymaya"],
        success_url: successUrl,
        cancel_url: cancelUrl,
        description:
          "Thank you for your generous gift to El-Bethel Christian Fellowship Church.",
        ...(donorName || donorEmail
          ? {
              billing: {
                ...(donorName ? { name: donorName } : {}),
                ...(donorEmail ? { email: donorEmail } : {}),
              },
            }
          : {}),
      },
    },
  };

  try {
    const response = await fetch(`${PAYMONGO_API}/checkout_sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: paymongoAuth(),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error({ status: response.status, body: errText }, "PayMongo error");
      res.status(502).json({
        error: "Payment gateway error. Please try another giving method.",
      });
      return;
    }

    const data = (await response.json()) as {
      data: { attributes: { checkout_url: string } };
    };

    const checkoutUrl = data.data.attributes.checkout_url;
    res.json({ checkoutUrl });
  } catch (err) {
    logger.error({ err }, "PayMongo request failed");
    res.status(500).json({
      error:
        !process.env["PAYMONGO_SECRET_KEY"]
          ? "Card payment is not yet configured. Please use GCash or Bank Transfer."
          : "Unable to reach payment gateway. Please try again.",
    });
  }
});

export default router;
