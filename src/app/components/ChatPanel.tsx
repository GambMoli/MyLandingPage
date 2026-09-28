import { ArrowUp, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useChat } from "../bot/useChat";
import { useLanguage } from "../i18n";
import { Avatar } from "./Avatar";

type Props = {
  id?: string;
  onClose?: () => void;
  autoFocus?: boolean;
};

export function ChatPanel({ id, onClose, autoFocus }: Props) {
  const { messages, ask, askIntent } = useChat();
  const { language } = useLanguage();
  const [draft, setDraft] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = {
    es: {
      title: "Asistente de Gabriel",
      note: "Responde al instante, corre en tu navegador",
      placeholder: "Pregunta por su experiencia, stack o proyectos",
      send: "Enviar pregunta",
      close: "Cerrar chat",
      log: "Conversación con el asistente",
    },
    en: {
      title: "Gabriel's assistant",
      note: "Instant answers, runs in your browser",
      placeholder: "Ask about his experience, stack or projects",
      send: "Send question",
      close: "Close chat",
      log: "Conversation with the assistant",
    },
  }[language];

  // Desplaza solo el historial del chat, no la pagina.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
    setDraft("");
  };

  const lastBotIndex = messages.map((m) => m.from).lastIndexOf("bot");

  return (
    <div className="chat" id={id}>
      <div className="chat__head">
        <Avatar size={36} />
        <div className="chat__who">
          <span className="chat__title">{copy.title}</span>
          <span className="chat__note">
            <span className="dot" aria-hidden="true" />
            {copy.note}
          </span>
        </div>
        {onClose ? (
          <button type="button" className="chat__close" onClick={onClose} aria-label={copy.close}>
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div className="chat__log" ref={logRef} role="log" aria-live="polite" aria-label={copy.log}>
        {messages.map((message, index) =>
          message.from === "user" ? (
            <div key={message.id} className="msg msg--user">
              <div className="msg__bubble">{message.text}</div>
            </div>
          ) : (
            <div key={message.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="msg msg--bot" title={message.meta}>
                <Avatar size={28} />
                <div className="msg__bubble">
                  <p>{message.text}</p>
                  {message.links.length > 0 ? (
                    <div className="msg__links">
                      {message.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              {index === lastBotIndex && message.suggestions.length > 0 ? (
                <div className="chips">
                  {message.suggestions.map((suggestion) => (
                    <button key={suggestion.id} type="button" className="chip" onClick={() => askIntent(suggestion.id)}>
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ),
        )}
      </div>

      <form className="chat__form" onSubmit={submit}>
        <input
          ref={inputRef}
          className="chat__input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
          maxLength={300}
          autoComplete="off"
        />
        <button type="submit" className="chat__send" disabled={!draft.trim()} aria-label={copy.send}>
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
}
