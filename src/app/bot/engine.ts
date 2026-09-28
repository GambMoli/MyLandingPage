import { IntentClassifier, UNSURE, normalize, type Lang } from "./classifier";
import { fallback, intentById, starters, trainingExamples } from "./intents";

export type BotLink = { label: string; href: string };

export type BotReply = {
  text: string;
  links: BotLink[];
  // Ids de intenciones que se ofrecen como siguientes preguntas.
  suggestions: string[];
  // Para inspeccionar el modelo: intencion elegida y similitud del vecino mas cercano.
  intent: string | null;
  confidence: number;
};

// Se entrena una sola vez, al cargar el modulo (unos 500 ejemplos: milisegundos).
const classifier = new IntentClassifier(trainingExamples);

export function replyForIntent(id: string, lang: Lang, confidence = 1): BotReply {
  const intent = intentById.get(id);
  if (!intent) return fallbackReply(lang, []);
  return {
    text: intent.answer[lang],
    links: (intent.links ?? []).map((link) => ({ label: link.label[lang], href: link.href })),
    suggestions: intent.next ?? [],
    intent: id,
    confidence,
  };
}

function fallbackReply(lang: Lang, candidates: string[]): BotReply {
  if (candidates.length > 0) {
    return { text: fallback.unsure[lang], links: [], suggestions: candidates, intent: null, confidence: 0 };
  }
  return {
    text: fallback.answer[lang],
    links: fallback.links.map((link) => ({ label: link.label[lang], href: link.href })),
    suggestions: starters,
    intent: null,
    confidence: 0,
  };
}

export function respond(text: string, uiLang: Lang): BotReply & { lang: Lang } {
  const prediction = classifier.predict(text, uiLang);
  const { lang } = prediction;

  if (prediction.intent) {
    return { ...replyForIntent(prediction.intent, lang, prediction.confidence), lang };
  }

  // "What does Gabriel do?" queda sin rasgos utiles al quitar stopwords y el nombre.
  if (prediction.candidates.length === 0 && /\b(gabriel|molina)\b/.test(normalize(text))) {
    return { ...replyForIntent("about", lang, 0), lang };
  }

  const candidates = prediction.candidates
    .filter((candidate) => candidate.score >= UNSURE)
    .slice(0, 3)
    .map((candidate) => candidate.intent);
  return { ...fallbackReply(lang, candidates), confidence: prediction.confidence, lang };
}
