import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadSiteContent } from "./lib/siteContent";

// Load the content edited from /admin (popup, banner, photos…) before the
// first render. Falls back to built-in defaults after 2 s or on any error.
loadSiteContent().finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
