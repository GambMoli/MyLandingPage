
  import { createRoot } from "react-dom/client";
  import { Analytics } from "@vercel/analytics/react";
  import App from "./app/App.tsx";
  import { LanguageProvider } from "./app/i18n.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <LanguageProvider>
      <App />
      <Analytics />
    </LanguageProvider>,
  );
  
