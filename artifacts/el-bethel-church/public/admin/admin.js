/* El-Bethel website editor — front end (no build step, plain JS). */
(function () {
  "use strict";

  let csrf = document.querySelector('meta[name="csrf"]').content;

  /* ── tiny helpers ─────────────────────────────────────── */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (k === "value") el.value = v;
      else if (k === "checked") el.checked = !!v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid);
    return el;
  }
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const imgUrl = (src) => (!src ? "" : src.startsWith("/") || /^https?:/i.test(src) ? src : "/images/" + src.replace(/^images\//, ""));

  async function api(action, body, isForm) {
    const opts = { method: body ? "POST" : "GET", headers: { "X-CSRF-Token": csrf }, credentials: "same-origin" };
    if (body) {
      if (isForm) opts.body = body;
      else { opts.body = JSON.stringify(body); opts.headers["Content-Type"] = "application/json"; }
    }
    let res, data;
    try {
      res = await fetch("api.php?action=" + action, opts);
      data = await res.json();
    } catch {
      throw new Error("No connection to the server. Check your internet and try again.");
    }
    if (res.status === 401 && !["login", "verify_code", "resend_code"].includes(action)) { location.reload(); throw new Error(data.error); }
    if (!data.ok) throw new Error(data.error || "Something went wrong.");
    return data;
  }

  let toastTimer;
  function toast(msg, isError) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.toggle("error", !!isError);
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), isError ? 6000 : 3000);
  }

  /* ── Sign-in page ─────────────────────────────────────── */
  const loginForm = document.getElementById("login");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = loginForm.querySelector(".form-error");
      const btn = loginForm.querySelector("button");
      err.hidden = true;
      btn.disabled = true;
      btn.textContent = "Signing in…";
      try {
        const r = await api("login", { username: loginForm.username.value, password: loginForm.password.value });
        if (r.csrf) csrf = r.csrf;
        if (r.mfa) return showCodeStep(r.email);
        location.reload();
      } catch (ex) {
        err.textContent = ex.message;
        err.hidden = false;
        btn.disabled = false;
        btn.textContent = "Sign in";
      }
    });

    /* Step 2: the code emailed to the church */
    const codeForm = document.getElementById("code-form");
    function showCodeStep(email) {
      document.getElementById("code-email").textContent = email;
      loginForm.hidden = true;
      codeForm.hidden = false;
      document.querySelector(".gate-note").textContent = "One more step to keep the website safe.";
      codeForm.code.focus();
    }
    codeForm.code.addEventListener("input", () => {
      codeForm.code.value = codeForm.code.value.replace(/\D/g, "").slice(0, 6);
      if (codeForm.code.value.length === 6) codeForm.requestSubmit();
    });
    codeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = codeForm.querySelector(".form-error");
      const btn = codeForm.querySelector("button[type=submit]");
      if (btn.disabled) return;
      err.hidden = true;
      btn.disabled = true;
      btn.textContent = "Checking…";
      try {
        await api("verify_code", { code: codeForm.code.value, remember: codeForm.remember.checked });
        location.reload();
      } catch (ex) {
        err.textContent = ex.message;
        err.hidden = false;
        btn.disabled = false;
        btn.textContent = "Continue";
        codeForm.code.select();
        if (/sign in again/i.test(ex.message)) setTimeout(() => location.reload(), 2500);
      }
    });
    document.getElementById("resend").addEventListener("click", async () => {
      const err = codeForm.querySelector(".form-error");
      try {
        const r = await api("resend_code", {});
        err.hidden = true;
        document.getElementById("code-email").textContent = r.email;
        codeForm.querySelector(".code-sent").firstChild.textContent = "New code sent to ";
      } catch (ex) {
        err.textContent = ex.message;
        err.hidden = false;
      }
    });
    return;
  }
  if (!document.getElementById("editor")) return;

  /* ── State ────────────────────────────────────────────── */
  let saved = null;   // what is live on the website
  let draft = null;   // what is being edited
  let backups = [];
  let current = "popup";

  const PAGES = [
    ["", "No button"],
    ["/", "Home page"],
    ["/about", "About us"],
    ["/events", "Events"],
    ["/sermons", "Sermons"],
    ["/prayer", "Prayer request"],
    ["/give", "Give"],
    ["/contact", "Contact"],
    ["other", "Another website…"],
  ];

  const SECTIONS = [
    ["popup", "Popup message", renderPopup],
    ["banner", "Scrolling banner", renderBanner],
    ["home", "Home page top", renderHome],
    ["gallery", "Photo gallery", renderGallery],
    ["services", "Service times", renderServices],
    ["contact", "Contact & address", renderContact],
    ["history", "Previous versions", renderHistory],
  ];

  function merge(defaults, content) {
    const d = clone(defaults || {});
    const c = content || {};
    // A saved section fully replaces its default (so a removed button stays removed).
    const out = {
      ticker: Object.assign({ enabled: false, speed: "normal", items: [] }, clone(c.ticker || d.ticker || {})),
      home: Object.assign({}, d.home, clone(c.home || {})),
      announcement: Object.assign({ enabled: false, showOnceForHours: 72, title: "" }, clone(c.announcement || d.announcement || {})),
      church: Object.assign({}, d.church, clone(c.church || {})),
      services: clone(c.services || d.services || []),
    };
    const cta = out.announcement.cta || {};
    out.announcement.cta = { label: cta.label || "", href: cta.href || "" };
    ["badge", "description", "date", "time", "location", "image"].forEach((k) => { if (out.announcement[k] == null) out.announcement[k] = ""; });
    return out;
  }

  const dirty = () => !!draft && JSON.stringify(draft) !== JSON.stringify(saved);
  function sectionDirty(id) {
    if (!draft || !saved) return false;
    const key = { popup: "announcement", banner: "ticker", contact: "church", services: "services" }[id];
    if (key) return JSON.stringify(draft[key]) !== JSON.stringify(saved[key]);
    if (id === "home") {
      const pick = (o) => JSON.stringify([o.heroTitleLine1, o.heroTitleLine2, o.heroSubtitle, o.heroSlides, o.stats, o.storyTitle, o.storyImage]);
      return pick(draft.home) !== pick(saved.home);
    }
    if (id === "gallery") return JSON.stringify([draft.home.gallery, draft.home.galleryTitle]) !== JSON.stringify([saved.home.gallery, saved.home.galleryTitle]);
    return false;
  }

  /** Call after every edit: refreshes the save bar, nav dots and previews. */
  function changed() {
    const d = dirty();
    const bar = document.getElementById("savebar");
    bar.classList.toggle("is-clean", !d);
    document.getElementById("savebar-text").textContent = d ? "You have changes that are not published yet" : "Everything is published";
    document.getElementById("discard").hidden = !d;
    const save = document.getElementById("save");
    if (!save.dataset.busy) save.disabled = !d;
    renderNav();
    document.querySelectorAll("[data-preview]").forEach((el) => el.replaceWith(PREVIEWS[el.dataset.preview]()));
  }

  /* ── Navigation ───────────────────────────────────────── */
  function renderNav() {
    const nav = document.getElementById("sections");
    nav.replaceChildren(
      ...SECTIONS.map(([id, label]) =>
        h("button", { type: "button", "aria-current": id === current ? "true" : "false", onclick: () => go(id) },
          label, sectionDirty(id) ? h("span", { class: "dot", title: "Not published yet" }) : null)
      )
    );
    const active = nav.querySelector('[aria-current="true"]');
    if (active && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = active.offsetLeft - 16;
  }
  function go(id) {
    current = id;
    renderNav();
    renderEditor();
    document.getElementById("editor").focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }
  function renderEditor() {
    const fn = SECTIONS.find((s) => s[0] === current)[2];
    document.getElementById("editor").replaceChildren(...fn());
  }

  /* ── Generic fields ───────────────────────────────────── */
  function text(label, obj, key, opts = {}) {
    const attrs = {
      value: obj[key] || "",
      maxlength: opts.max || 200,
      placeholder: opts.placeholder || "",
      type: opts.type || "text",
      oninput: (e) => { obj[key] = e.target.value; changed(); },
    };
    const field = opts.multiline ? h("textarea", attrs) : h("input", attrs);
    if (opts.multiline) field.value = obj[key] || "";
    return h("label", {}, label, opts.hint ? h("span", { class: "hint" }, opts.hint) : null, field);
  }

  function toggle(label, obj, key, onLabel, offLabel) {
    const state = h("span", { class: "state" }, obj[key] ? onLabel : offLabel);
    return h("label", { class: "switch" }, label, state,
      h("input", { type: "checkbox", role: "switch", checked: obj[key], onchange: (e) => { obj[key] = e.target.checked; state.textContent = e.target.checked ? onLabel : offLabel; changed(); } }));
  }

  /** Page picker + optional web address, for buttons and banner links. */
  function linkPicker(label, get, set, noneLabel) {
    const value = get() || "";
    const known = PAGES.some(([v]) => v === value && v !== "other");
    const sel = h("select", {});
    PAGES.forEach(([v, l]) => sel.append(h("option", { value: v }, v === "" ? noneLabel : l)));
    sel.value = known ? value : "other";
    const url = h("input", { type: "url", value: known ? "" : value, placeholder: "https://…", oninput: (e) => { set(e.target.value.trim()); changed(); } });
    const urlWrap = h("label", { hidden: known }, "Web address", url);
    sel.addEventListener("change", () => {
      if (sel.value === "other") { urlWrap.hidden = false; set(url.value.trim()); url.focus(); }
      else { urlWrap.hidden = true; set(sel.value); }
      changed();
    });
    return h("div", { class: "fields" }, h("label", {}, label, sel), urlWrap);
  }

  /* ── Photo upload (resized in the browser first) ──────── */
  function choosePhoto() {
    return new Promise((resolve) => {
      const input = h("input", { type: "file", accept: "image/jpeg,image/png,image/webp,image/*" });
      input.addEventListener("change", () => resolve(input.files[0] || null));
      input.click();
    });
  }

  async function shrink(file) {
    if (file.type === "image/png" && file.size < 3e6) return file; // keep transparency
    const url = await new Promise((ok, bad) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = bad; r.readAsDataURL(file); });
    const img = await new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => bad(new Error("This file is not a photo we can read. Please choose a JPG or PNG.")); i.src = url; });
    const max = 2000;
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = h("canvas", { width: Math.round(img.naturalWidth * scale), height: Math.round(img.naturalHeight * scale) });
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    return new Promise((ok) => canvas.toBlob((b) => ok(b || file), "image/jpeg", 0.86));
  }

  /** Ask for a photo, upload it, return its path (or null). */
  async function uploadPhoto(busyEl) {
    const file = await choosePhoto();
    if (!file) return null;
    busyEl && busyEl.classList.add("uploading");
    try {
      const blob = await shrink(file);
      const fd = new FormData();
      fd.append("image", blob, blob.type === "image/png" ? "photo.png" : "photo.jpg");
      const { path } = await api("upload", fd, true);
      return path;
    } catch (e) {
      toast(e.message, true);
      return null;
    } finally {
      busyEl && busyEl.classList.remove("uploading");
    }
  }

  /** Editable grid of photos (hero slides, gallery). */
  function photoGrid(list, opts) {
    const grid = h("div", { class: "photos" });
    function draw() {
      grid.replaceChildren(
        ...list.map((p, i) => {
          const card = h("div", { class: "photo" },
            h("div", { class: "photo-img" }, h("img", { src: imgUrl(p.src), alt: "", loading: "lazy" }), opts.numbered ? h("span", { class: "badge" }, "Photo " + (i + 1)) : null),
            h("div", { class: "photo-body" },
              h("input", { value: p.alt, maxlength: 160, placeholder: "Short description", "aria-label": "Description of photo " + (i + 1), oninput: (e) => { p.alt = e.target.value; changed(); } }),
              h("div", { class: "photo-actions" },
                h("button", { type: "button", class: "icon-btn", title: "Move earlier", "aria-label": "Move earlier", disabled: i === 0, onclick: () => { list.splice(i - 1, 0, list.splice(i, 1)[0]); draw(); changed(); } }, "←"),
                h("button", { type: "button", class: "icon-btn", title: "Move later", "aria-label": "Move later", disabled: i === list.length - 1, onclick: () => { list.splice(i + 1, 0, list.splice(i, 1)[0]); draw(); changed(); } }, "→"),
                h("button", { type: "button", class: "btn btn-ghost btn-small", onclick: async () => { const path = await uploadPhoto(card); if (path) { p.src = path; draw(); changed(); } } }, "Replace"),
                h("button", { type: "button", class: "icon-btn remove", title: "Remove", "aria-label": "Remove photo " + (i + 1), disabled: list.length <= 1,
                  onclick: () => { list.splice(i, 1); draw(); changed(); } }, "✕")
              )
            )
          );
          return card;
        }),
        list.length < opts.max
          ? h("button", { type: "button", class: "photo-add", onclick: async (e) => { const path = await uploadPhoto(e.currentTarget); if (path) { list.push({ src: path, alt: "" }); draw(); changed(); } } },
              h("span", {}, "+ Add a photo", h("small", {}, "JPG or PNG from your phone or computer")))
          : null
      );
    }
    draw();
    return grid;
  }

  function singlePhoto(label, hint, obj, key, removable) {
    const wrap = h("div", { class: "single-photo" });
    function draw() {
      wrap.replaceChildren(
        h("div", { class: "photo-img" }, obj[key] ? h("img", { src: imgUrl(obj[key]), alt: "" }) : h("p", { class: "empty", style: "padding:1rem" }, "No photo")),
        h("div", { class: "fields" },
          h("strong", {}, label), h("span", { class: "hint" }, hint),
          h("div", { class: "actions" },
            h("button", { type: "button", class: "btn btn-navy btn-small", onclick: async () => { const p = await uploadPhoto(wrap); if (p) { obj[key] = p; draw(); changed(); } } }, obj[key] ? "Change photo" : "Add a photo"),
            removable && obj[key] ? h("button", { type: "button", class: "btn btn-ghost btn-small btn-danger", onclick: () => { obj[key] = ""; draw(); changed(); } }, "Remove photo") : null
          )
        )
      );
    }
    draw();
    return wrap;
  }

  /* ── Live previews ────────────────────────────────────── */
  const PREVIEWS = {
    popup() {
      const a = draft.announcement;
      const box = h("div", { class: "preview", "data-preview": "popup" }, h("p", { class: "preview-label" }, "What visitors will see"));
      if (!a.enabled) {
        box.append(h("div", { class: "pv-backdrop" }, h("p", { class: "pv-off" }, "The popup is switched off. Visitors won't see it.")));
        return box;
      }
      const meta = [a.date, a.time, a.location].filter(Boolean);
      box.append(h("div", { class: "pv-backdrop" },
        h("div", { class: "pv-modal" },
          a.image ? h("div", { class: "pv-img" }, h("img", { src: imgUrl(a.image), alt: "" })) : null,
          h("div", { class: "pv-body" },
            a.badge ? h("span", { class: "pv-badge" }, a.badge) : null,
            h("p", { class: "pv-title" }, a.title || "Add a title"),
            a.description ? h("p", { class: "pv-desc" }, a.description) : null,
            meta.length ? h("div", { class: "pv-meta" }, meta.map((v) => h("div", {}, v))) : null,
            a.cta && a.cta.label && a.cta.href ? h("span", { class: "pv-cta" }, a.cta.label) : null
          )
        )
      ));
      return box;
    },
    banner() {
      const t = draft.ticker;
      const items = t.items.filter((i) => i.text.trim());
      const box = h("div", { class: "preview", "data-preview": "banner" }, h("p", { class: "preview-label" }, "Top of every page"));
      if (!t.enabled || !items.length) {
        box.append(h("div", { class: "pv-backdrop" }, h("p", { class: "pv-off" }, !t.enabled ? "The banner is switched off." : "Add a message to see the banner.")));
        return box;
      }
      const seq = () => items.flatMap((i) => [h("span", {}, i.text), h("i", {}, "✦")]);
      const track = h("div", { class: "pv-ticker-track" }, seq(), seq(), seq(), seq());
      track.style.animationDuration = { slow: 40, normal: 25, fast: 14 }[t.speed] * Math.max(1, items.length / 2) + "s";
      box.append(h("div", { class: "pv-ticker" }, track));
      return box;
    },
  };

  /* ── Sections ─────────────────────────────────────────── */
  function header(title, lede) {
    return [h("h2", {}, title), h("p", { class: "lede" }, lede)];
  }

  function renderPopup() {
    const a = draft.announcement;
    return [
      ...header("Popup message", "The window that opens a moment after someone arrives on the website. Use it for a special service, an event or an important notice."),
      h("div", { class: "split" },
        h("div", {},
          h("div", { class: "panel" },
            toggle("Show the popup", a, "enabled", "On", "Off"),
            h("label", {}, "How often should a visitor see it?",
              (() => {
                const s = h("select", { onchange: (e) => { a.showOnceForHours = +e.target.value; changed(); } },
                  h("option", { value: 0 }, "Every time they open the website"),
                  h("option", { value: 24 }, "Once a day"),
                  h("option", { value: 72 }, "Once every 3 days"),
                  h("option", { value: 168 }, "Once a week"));
                s.value = String([0, 24, 72, 168].includes(+a.showOnceForHours) ? +a.showOnceForHours : 72);
                return s;
              })())
          ),
          h("div", { class: "panel" },
            h("h3", {}, "Picture"),
            singlePhoto("Popup picture", "A flyer or photo. Optional.", a, "image", true)
          ),
          h("div", { class: "panel" },
            h("h3", {}, "Text"),
            text("Small label above the title", a, "badge", { max: 40, placeholder: "Important update", hint: "Optional" }),
            text("Title", a, "title", { max: 120 }),
            text("Message", a, "description", { max: 600, multiline: true }),
            h("div", { class: "row" },
              text("Date", a, "date", { max: 80, placeholder: "Sunday, June 14" }),
              text("Time", a, "time", { max: 80, placeholder: "4:00 PM – 6:30 PM" })),
            text("Place", a, "location", { max: 200, hint: "Optional" })
          ),
          h("div", { class: "panel" },
            h("h3", {}, "Button"),
            h("span", { class: "hint" }, "Where should the button take people?"),
            linkPicker("Button opens", () => a.cta.href, (v) => (a.cta.href = v), "No button"),
            text("Button text", a.cta, "label", { max: 40, placeholder: "See the details" })
          )
        ),
        PREVIEWS.popup()
      ),
    ];
  }

  function renderBanner() {
    const t = draft.ticker;
    const list = h("div", { class: "list" });
    function draw() {
      list.replaceChildren(
        ...(t.items.length ? [] : [h("p", { class: "empty" }, "No messages yet. Add one below.")]),
        ...t.items.map((item, i) =>
          h("div", { class: "list-item" },
            h("div", { class: "fields" },
              text("Message " + (i + 1), item, "text", { max: 200, placeholder: "Join us this Sunday at 4:00 PM" }),
              linkPicker("When clicked, open", () => item.link, (v) => { if (v) item.link = v; else delete item.link; }, "Nothing (just text)")),
            h("div", { class: "item-tools" },
              h("button", { type: "button", class: "icon-btn", "aria-label": "Move up", disabled: i === 0, onclick: () => { t.items.splice(i - 1, 0, t.items.splice(i, 1)[0]); draw(); changed(); } }, "↑"),
              h("button", { type: "button", class: "icon-btn", "aria-label": "Move down", disabled: i === t.items.length - 1, onclick: () => { t.items.splice(i + 1, 0, t.items.splice(i, 1)[0]); draw(); changed(); } }, "↓"),
              h("button", { type: "button", class: "icon-btn remove", "aria-label": "Delete message " + (i + 1), onclick: () => { t.items.splice(i, 1); draw(); changed(); } }, "✕"))
          )
        )
      );
    }
    draw();
    const speed = h("select", { onchange: (e) => { t.speed = e.target.value; changed(); } },
      h("option", { value: "slow" }, "Slow"), h("option", { value: "normal" }, "Normal"), h("option", { value: "fast" }, "Fast"));
    speed.value = t.speed;
    return [
      ...header("Scrolling banner", "A thin strip of text moving across the very top of every page. Good for short reminders."),
      h("div", { class: "split" },
        h("div", {},
          h("div", { class: "panel" }, toggle("Show the banner", t, "enabled", "On", "Off"), h("label", {}, "Speed", speed)),
          h("div", { class: "panel" }, h("h3", {}, "Messages"), list,
            h("button", { type: "button", class: "btn btn-ghost", onclick: () => { if (t.items.length >= 12) return toast("12 messages maximum.", true); t.items.push({ text: "" }); draw(); changed(); list.querySelector(".list-item:last-child input").focus(); } }, "+ Add a message"))
        ),
        PREVIEWS.banner()
      ),
    ];
  }

  function renderHome() {
    const m = draft.home;
    return [
      ...header("Home page top", "The big photos and words people see first on the home page."),
      h("div", { class: "panel" },
        h("h3", {}, "Big title"),
        h("span", { class: "hint" }, "Start the second line with & to keep the gold ampersand."),
        h("div", { class: "row" }, text("First line", m, "heroTitleLine1", { max: 60 }), text("Second line", m, "heroTitleLine2", { max: 60 })),
        text("Sentence under the title", m, "heroSubtitle", { max: 300, multiline: true })
      ),
      h("div", { class: "panel" },
        h("h3", {}, "Slideshow photos"),
        h("span", { class: "hint" }, "Wide photos work best. They change one after the other, in this order. Up to 8."),
        photoGrid(m.heroSlides, { max: 8, numbered: true })
      ),
      h("div", { class: "panel" },
        h("h3", {}, "Numbers under the slideshow"),
        h("div", { class: "list" }, m.stats.map((s, i) =>
          h("div", { class: "row" }, text("Number " + (i + 1), s, "value", { max: 12 }), text("Label", s, "label", { max: 40 }))))
      ),
      h("div", { class: "panel" },
        h("h3", {}, "“Our story” section"),
        text("Title", m, "storyTitle", { max: 80 }),
        singlePhoto("Section photo", "Shown next to the church's story.", m, "storyImage", false)
      ),
    ];
  }

  function renderGallery() {
    const m = draft.home;
    return [
      ...header("Photo gallery", "The wall of photos on the home page. Add new pictures after an event, remove old ones, or change their order."),
      h("div", { class: "panel" }, text("Gallery title", m, "galleryTitle", { max: 80 })),
      h("div", { class: "panel" }, h("h3", {}, "Photos (" + m.gallery.length + ")"), h("span", { class: "hint" }, "Up to 40 photos. The description helps people using screen readers and Google."), photoGrid(m.gallery, { max: 40 })),
    ];
  }

  function renderServices() {
    const list = draft.services;
    const box = h("div", { class: "list" });
    function draw() {
      box.replaceChildren(...list.map((svc, i) =>
        h("div", { class: "list-item" },
          h("div", { class: "fields" },
            h("div", { class: "row" },
              text("Day", svc, "day", { max: 30, placeholder: "Sunday" }),
              text("Time", svc, "time", { max: 60, placeholder: "4:00 PM \u2013 6:30 PM" })),
            text("Name of the service", svc, "name", { max: 80, placeholder: "Sunday Worship Service" }),
            text("Place", svc, "place", { max: 120, placeholder: "Sunshine Place Jupiter, Makati" }),
            h("label", { class: "check" }, h("input", { type: "checkbox", checked: svc.online, onchange: (e) => { svc.online = e.target.checked; changed(); } }), "This service is online (shows a globe instead of a map pin)"),
            text("Short description", svc, "description", { max: 300, multiline: true })),
          h("div", { class: "item-tools" },
            h("button", { type: "button", class: "icon-btn", "aria-label": "Move up", disabled: i === 0, onclick: () => { list.splice(i - 1, 0, list.splice(i, 1)[0]); draw(); changed(); } }, "\u2191"),
            h("button", { type: "button", class: "icon-btn", "aria-label": "Move down", disabled: i === list.length - 1, onclick: () => { list.splice(i + 1, 0, list.splice(i, 1)[0]); draw(); changed(); } }, "\u2193"),
            h("button", { type: "button", class: "icon-btn remove", "aria-label": "Delete service " + (i + 1), disabled: list.length <= 1, onclick: () => { list.splice(i, 1); draw(); changed(); } }, "\u2715"))
        )));
    }
    draw();
    return [
      ...header("Service times", "The service cards on the home page (\u201cJoin Us This Week\u201d), the schedule on the Contact page and in the footer. The first service is also shown on the About and Give pages."),
      h("div", { class: "panel" },
        box,
        h("button", { type: "button", class: "btn btn-ghost", onclick: () => { if (list.length >= 4) return toast("4 services maximum.", true); list.push({ day: "", name: "", time: "", place: "", online: false, description: "" }); draw(); changed(); } }, "+ Add a service")
      ),
      h("p", { class: "hint" }, "The \u201cGet Directions\u201d button under the cards opens the map from Contact & address."),
    ];
  }

  function renderContact() {
    const c = draft.church;
    const mapHref = () => c.mapLink || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(c.address || "");
    const check = h("a", { href: mapHref(), target: "_blank", rel: "noopener", class: "btn btn-ghost btn-small" }, "Check on Google Maps");
    const syncCheck = () => { check.href = mapHref(); };
    return [
      ...header("Contact & address", "Shown on the Contact page, in the footer, on the home page and on the Give page. Change it here and it changes everywhere."),
      h("div", { class: "panel" },
        h("h3", {}, "Phone"),
        h("div", { class: "row" },
          text("Phone number", c, "phone", { max: 40, type: "tel" }),
          text("Small line under it", c, "phoneNote", { max: 80, placeholder: "Mon – Fri, 9 AM – 5 PM" }))
      ),
      h("div", { class: "panel" },
        h("h3", {}, "Email"),
        h("div", { class: "row" },
          text("Email address", c, "email", { max: 120, type: "email" }),
          text("Small line under it", c, "emailNote", { max: 80, placeholder: "We reply within 24 hours" }))
      ),
      h("div", { class: "panel", oninput: syncCheck },
        h("h3", {}, "Address"),
        text("Full address", c, "address", { max: 300, multiline: true, hint: "Used in the footer, the home page and for the map button." }),
        h("div", { class: "row" },
          text("Area (big line on the Contact page)", c, "areaLine", { max: 80, placeholder: "Bel-Air, Makati City" }),
          text("Building or floor (small line)", c, "buildingLine", { max: 120, placeholder: "Sunshine Place Jupiter, Roof Deck" })),
        text("How to get here", c, "directions", { max: 400, multiline: true, hint: "The sentence above the map on the Contact page." }),
        text("Google Maps link", c, "mapLink", { max: 500, type: "url", placeholder: "https://maps.app.goo.gl/…", hint: "Optional. Leave empty and the map button searches the full address. To get a link: open Google Maps, find the church, tap Share, copy the link." }),
        h("div", {}, check)
      ),
      h("div", { class: "panel" },
        h("h3", {}, "Office hours"),
        text("Office hours", c, "officeHours", { max: 200, multiline: true, hint: "One line per day, e.g. “Sunday: After service”." })
      ),
    ];
  }

  function renderHistory() {
    const fmt = (iso) => (iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "Unknown date");
    const list = h("div", { class: "history" });
    if (!backups.length) list.append(h("p", { class: "empty" }, "Nothing here yet. Each time you publish, the version before it is kept here for a while."));
    backups.forEach((b) => {
      const btn = h("button", { type: "button", class: "btn btn-ghost btn-small" }, "Go back to this version");
      const row = h("div", { class: "history-row" }, h("div", {}, h("strong", {}, fmt(b.date)), h("small", {}, b.original ? "The website as it was before the editor was first used" : b.restore ? "Saved before a restore" : "The website as it was before the next change")), btn);
      btn.addEventListener("click", () => {
        const yes = h("button", { type: "button", class: "btn btn-gold btn-small" }, "Yes, restore");
        const no = h("button", { type: "button", class: "btn btn-ghost btn-small" }, "Cancel");
        const box = h("div", { class: "confirm" }, "Replace the live website with this version?", yes, no);
        btn.replaceWith(box);
        no.onclick = () => box.replaceWith(btn);
        yes.onclick = async () => {
          yes.disabled = true;
          try {
            const r = await api("restore", { name: b.name });
            applySaved(r.content, r.backups);
            toast("Version restored. The website is updated.");
          } catch (e) { toast(e.message, true); yes.disabled = false; }
        };
      });
      list.append(row);
    });
    return [
      ...header("Previous versions", "Made a mistake? Put the website back the way it was. The last 25 versions are kept."),
      dirty() ? h("p", { class: "lede" }, "You have changes that are not published yet. Restoring will throw them away.") : null,
      list,
    ].filter(Boolean);
  }

  /* ── Save / discard ───────────────────────────────────── */
  function applySaved(content, list) {
    saved = merge(defaults, content);
    draft = clone(saved);
    backups = list || backups;
    changed();
    renderEditor();
  }

  let defaults = null;
  async function boot() {
    try {
      const r = await api("load");
      defaults = r.defaults;
      if (!defaults && !r.content) throw new Error("The editor files are incomplete. Please contact the website manager.");
      applySaved(r.content, r.backups);
    } catch (e) {
      document.getElementById("editor").replaceChildren(h("p", { class: "form-error" }, e.message));
    }
  }

  document.getElementById("save").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.dataset.busy = "1";
    btn.textContent = "Publishing…";
    try {
      const r = await api("save", { content: draft });
      applySaved(r.content, r.backups);
      toast("Published. Visitors now see your changes.");
    } catch (ex) {
      toast(ex.message, true);
    } finally {
      delete btn.dataset.busy;
      btn.textContent = "Publish changes";
      btn.disabled = !dirty();
    }
  });

  document.getElementById("discard").addEventListener("click", () => {
    draft = clone(saved);
    changed();
    renderEditor();
    toast("Changes undone.");
  });

  document.getElementById("logout").addEventListener("click", async () => {
    if (dirty() && !window.confirm("You have changes that are not published. Sign out anyway?")) return;
    saved = draft; // skip the leave-page warning
    try { await api("logout", {}); } finally { location.reload(); }
  });

  window.addEventListener("beforeunload", (e) => {
    if (draft && dirty()) { e.preventDefault(); e.returnValue = ""; }
  });

  renderNav();
  boot();
})();
