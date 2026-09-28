import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useChat } from "../bot/useChat";
import { useLanguage } from "../i18n";
import { ChatPanel } from "./ChatPanel";

// Boton flotante que aparece cuando el chat del hero ya no esta en pantalla.
// Abre el mismo chat (misma conversacion) en un panel fijo.
export function ChatLauncher({ heroChatId }: { heroChatId: string }) {
  const { sheetOpen, setSheetOpen } = useChat();
  const { language } = useLanguage();
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(heroChatId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [heroChatId]);

  useEffect(() => {
    if (heroVisible) setSheetOpen(false);
  }, [heroVisible, setSheetOpen]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen, setSheetOpen]);

  if (sheetOpen) {
    return (
      <div className="sheet" role="dialog" aria-label={language === "es" ? "Chat con el asistente" : "Chat with the assistant"}>
        <ChatPanel onClose={() => setSheetOpen(false)} autoFocus />
      </div>
    );
  }

  return (
    <button type="button" className="launcher" hidden={heroVisible} onClick={() => setSheetOpen(true)}>
      <MessageCircle size={18} strokeWidth={1.75} />
      {language === "es" ? "Pregúntale a mi asistente" : "Ask my assistant"}
    </button>
  );
}
