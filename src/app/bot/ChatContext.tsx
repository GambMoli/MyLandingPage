import { ReactNode, useCallback, useMemo, useState } from "react";
import { useLanguage } from "../i18n";
import { intentById, starters } from "./intents";
import { replyForIntent, respond } from "./engine";
import { ChatContext, type ChatMessage } from "./useChat";

let nextId = 1;

export function ChatProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const label = useCallback(
    (ids: string[], lang: typeof language) =>
      ids.flatMap((id) => {
        const intent = intentById.get(id);
        return intent ? [{ id, label: intent.prompt[lang] }] : [];
      }),
    [],
  );

  const ask = useCallback(
    (raw: string) => {
      const text = raw.trim().slice(0, 300);
      if (!text) return;
      const reply = respond(text, language);
      setHistory((current) => [
        ...current,
        { id: nextId++, from: "user", text },
        {
          id: nextId++,
          from: "bot",
          text: reply.text,
          links: reply.links,
          suggestions: label(reply.suggestions, reply.lang),
          meta: `${reply.intent ?? "sin intención"} · ${Math.round(reply.confidence * 100)}%`,
        },
      ]);
    },
    [language, label],
  );

  const askIntent = useCallback(
    (id: string) => {
      const intent = intentById.get(id);
      if (!intent) return;
      const reply = replyForIntent(id, language);
      setHistory((current) => [
        ...current,
        { id: nextId++, from: "user", text: intent.prompt[language] },
        {
          id: nextId++,
          from: "bot",
          text: reply.text,
          links: reply.links,
          suggestions: label(reply.suggestions, language),
        },
      ]);
    },
    [language, label],
  );

  // El saludo inicial sigue el idioma de la interfaz.
  const messages = useMemo<ChatMessage[]>(
    () => [
      {
        id: 0,
        from: "bot",
        text:
          language === "es"
            ? "Hola, soy el asistente de Gabriel. Pregúntame por su experiencia, su stack, sus proyectos o cómo contactarlo."
            : "Hi, I'm Gabriel's assistant. Ask me about his experience, stack, projects or how to reach him.",
        links: [],
        suggestions: label(starters, language),
      },
      ...history,
    ],
    [history, language, label],
  );

  const value = useMemo(
    () => ({ messages, ask, askIntent, sheetOpen, setSheetOpen }),
    [messages, ask, askIntent, sheetOpen],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
