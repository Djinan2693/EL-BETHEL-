import { Router, type IRouter } from "express";
import healthRouter from "./health";
import emailRouter from "./email";
import giveRouter from "./give";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/email", emailRouter);
router.use("/give", giveRouter);

export default router;
