import { createContext, useContext } from "react";
import type { BotLink } from "./engine";

// El contexto vive aparte del ChatProvider: si un archivo exporta a la vez un componente y
// un hook, la recarga en caliente de Vite puede crear dos copias del contexto.

export type ChatMessage =
  | { id: number; from: "user"; text: string }
  | {
      id: number;
      from: "bot";
      text: string;
      links: BotLink[];
      suggestions: { id: string; label: string }[];
      meta?: string;
    };

export type ChatContextValue = {
  messages: ChatMessage[];
  ask: (text: string) => void;
  askIntent: (id: string) => void;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
};

export const ChatContext = createContext<ChatContextValue | null>(null);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
}
