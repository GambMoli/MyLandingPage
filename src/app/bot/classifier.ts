// Clasificador de intenciones que corre en el navegador.
//
// Cada pregunta se convierte en un vector TF-IDF con dos tipos de rasgos:
//   - palabras (sin tildes, sin stopwords y con un stemming muy simple)
//   - trigramas de caracteres, que hacen al modelo tolerante a errores de tipeo ("angluar")
// Para clasificar se compara la pregunta con todos los ejemplos de entrenamiento por
// similitud coseno y votan los k vecinos mas cercanos (k-NN).

export type Lang = "es" | "en";

export type TrainingExample = { intent: string; lang: Lang; text: string };

export type Prediction = {
  intent: string | null;
  confidence: number;
  lang: Lang;
  // Intenciones candidatas ordenadas por puntaje, para sugerir "quisiste decir...".
  candidates: { intent: string; score: number }[];
};

type Vector = Map<string, number>;

const STOPWORDS: Record<Lang, string[]> = {
  es: "a al algo algun alguna algunas alguno algunos ante antes como con cual cuales cuando de del desde donde e el ella ellas ello ellos en entre era es esa esas ese eso esos esta estas este esto estos fue ha hay la las le les lo los me mi mis muy nos o para pero por que se sea ser si sin sobre su sus te tu tus un una uno unos y ya yo tiene tienes puedo puede puedes quiero quisiera dime cuentame sabes eres estas esta quien cuanto cuantos cuanta cuantas".split(" "),
  en: "a about am an and any are as at be been but by can could do does did for from has have he her his how i if in into is it its me my of on or our she so some tell than that the their them there these they this to was we were what when where which who whom why will with would you your know please he him she many much some".split(" "),
};

// El nombre aparece en casi cualquier pregunta, asi que no ayuda a distinguir intenciones.
const STOP = new Set([...STOPWORDS.es, ...STOPWORDS.en, "gabriel", "molina", "gabo"]);
const LANG_HINTS: Record<Lang, Set<string>> = {
  es: new Set([...STOPWORDS.es, "hola", "gracias", "cuanto", "cuantos", "trabajas", "trabaja", "usas", "usa", "proyectos", "experiencia", "contacto", "disponible", "quien", "eres", "adios"]),
  en: new Set([...STOPWORDS.en, "hello", "hi", "thanks", "much", "many", "work", "works", "use", "uses", "projects", "experience", "contact", "available", "who", "are", "bye"]),
};

// Terminaciones que se recortan para agrupar variantes ("proyectos" -> "proyect", "working" -> "work").
const SUFFIXES = ["aciones", "acion", "amente", "mente", "iendo", "ando", "ados", "adas", "ado", "ada", "ing", "ers", "er", "ed", "es", "os", "as", "s", "o", "a"];

// Los trigramas pesan menos que las palabras completas: ayudan con typos pero no deben dominar.
const CHAR_WEIGHT = 0.45;
const K = 5;

// Por encima de CONFIDENT se responde directo; entre UNSURE y CONFIDENT se ofrecen
// las intenciones candidatas. Calibrados con preguntas fuera del entrenamiento.
// Peso de los rasgos desconocidos: muy alto castiga los typos, muy bajo infla la confianza.
const UNSEEN_WEIGHT = 0.5;

export const CONFIDENT = 0.3;
export const UNSURE = 0.1;
const NEAR_EXACT = 0.9;

export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z0-9#+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stem(word: string) {
  if (word.length <= 4) return word;
  for (const suffix of SUFFIXES) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 3) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}

function tokenize(text: string) {
  return normalize(text).split(" ").filter(Boolean);
}

function features(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  const add = (key: string, weight: number) => counts.set(key, (counts.get(key) ?? 0) + weight);

  for (const token of tokenize(text)) {
    if (token.length < 2 || STOP.has(token)) continue;
    add(`w:${stem(token)}`, 1);
    const padded = `^${token}$`;
    if (token.length >= 3) {
      for (let i = 0; i + 3 <= padded.length; i++) add(`c:${padded.slice(i, i + 3)}`, CHAR_WEIGHT);
    }
  }
  return counts;
}

export function detectLanguage(text: string, fallback: Lang): Lang {
  let es = 0;
  let en = 0;
  for (const token of tokenize(text)) {
    if (LANG_HINTS.es.has(token)) es++;
    if (LANG_HINTS.en.has(token)) en++;
  }
  if (/[ñ¿¡]|[áéíóú]/i.test(text)) es += 2;
  if (es === en) return fallback;
  return es > en ? "es" : "en";
}

function l2normalize(vector: Vector) {
  let sum = 0;
  for (const value of vector.values()) sum += value * value;
  const norm = Math.sqrt(sum) || 1;
  for (const [key, value] of vector) vector.set(key, value / norm);
  return vector;
}

function cosine(a: Vector, b: Vector) {
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  let dot = 0;
  for (const [key, value] of small) {
    const other = large.get(key);
    if (other !== undefined) dot += value * other;
  }
  return dot;
}

export class IntentClassifier {
  private idf = new Map<string, number>();
  private unseenIdf = 1;
  private docs: { intent: string; lang: Lang; vector: Vector }[] = [];

  constructor(examples: TrainingExample[]) {
    const featureSets = examples.map((example) => features(example.text));

    const documentFrequency = new Map<string, number>();
    for (const set of featureSets) {
      for (const key of set.keys()) documentFrequency.set(key, (documentFrequency.get(key) ?? 0) + 1);
    }
    const total = examples.length;
    for (const [key, df] of documentFrequency) {
      this.idf.set(key, Math.log((total + 1) / (df + 1)) + 1);
    }
    this.unseenIdf = (Math.log(total + 1) + 1) * UNSEEN_WEIGHT;

    this.docs = examples.map((example, index) => ({
      intent: example.intent,
      lang: example.lang,
      vector: this.weigh(featureSets[index]),
    }));
  }

  private weigh(counts: Map<string, number>): Vector {
    const vector: Vector = new Map();
    for (const [key, tf] of counts) {
      // Un rasgo que nunca aparecio en el entrenamiento no suma al producto punto, pero si
      // a la norma: asi "where does he work today" no queda reducido a "work" con 96% de confianza.
      vector.set(key, (1 + Math.log(tf)) * (this.idf.get(key) ?? this.unseenIdf));
    }
    return l2normalize(vector);
  }

  predict(text: string, fallbackLang: Lang, threshold = CONFIDENT): Prediction {
    const lang = detectLanguage(text, fallbackLang);
    const query = this.weigh(features(text));
    if (![...query.keys()].some((key) => this.idf.has(key))) return { intent: null, confidence: 0, lang, candidates: [] };

    const neighbours = this.docs
      .map((doc) => ({ intent: doc.intent, score: cosine(query, doc.vector) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, K);

    const votes = new Map<string, number>();
    const best = new Map<string, number>();
    for (const { intent, score } of neighbours) {
      // Al cuadrado: un vecino casi identico pesa mas que varios medianamente parecidos.
      votes.set(intent, (votes.get(intent) ?? 0) + score ** 2);
      best.set(intent, Math.max(best.get(intent) ?? 0, score));
    }

    const candidates = [...votes.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([intent]) => ({ intent, score: best.get(intent) ?? 0 }));

    // Si hay un ejemplo casi identico a la pregunta, gana aunque pierda la votacion.
    const nearest = neighbours[0];
    if (nearest && nearest.score >= NEAR_EXACT && candidates[0]?.intent !== nearest.intent) {
      const index = candidates.findIndex((candidate) => candidate.intent === nearest.intent);
      candidates.unshift(...candidates.splice(index, 1));
    }

    const top = candidates[0];
    const confidence = top?.score ?? 0;
    return {
      intent: top && confidence >= threshold ? top.intent : null,
      confidence,
      lang,
      candidates,
    };
  }
}
