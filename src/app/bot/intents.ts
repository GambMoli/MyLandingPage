// Datos de entrenamiento y respuestas del bot.
//
// Para enseñarle algo nuevo: agrega una intencion con varias formas de preguntarlo
// (en español y en inglés) y su respuesta. Mientras mas ejemplos distintos, mejor clasifica.
// Solo pon hechos reales: el bot repite exactamente lo que escribas aqui.

import { BOOKING_URL, CONTACT_EMAIL, socials, type Localized } from "../../content/profile";
import type { TrainingExample } from "./classifier";

export type Intent = {
  id: string;
  // Como aparece la intencion cuando se ofrece como sugerencia.
  prompt: Localized;
  examples: Localized<string[]>;
  answer: Localized;
  links?: { label: Localized; href: string }[];
  next?: string[];
};

const github = socials.find((s) => s.id === "github")!.href;
const linkedin = socials.find((s) => s.id === "linkedin")!.href;
const instagram = socials.find((s) => s.id === "instagram")!.href;

const emailLink = { label: { es: "Escribir un correo", en: "Send an email" }, href: `mailto:${CONTACT_EMAIL}` };
const bookingLink = { label: { es: "Agendar 30 min", en: "Book 30 min" }, href: BOOKING_URL };

export const intents: Intent[] = [
  {
    id: "greeting",
    prompt: { es: "Hola", en: "Hi" },
    examples: {
      es: ["hola", "buenas", "buenos días", "buenas tardes", "qué tal", "hey", "saludos", "holi", "qué onda", "quiubo", "hola qué más"],
      en: ["hello", "hi", "hey there", "good morning", "good afternoon", "howdy", "hi bot"],
    },
    answer: {
      es: "Hola. Respondo preguntas sobre Gabriel: su experiencia, su stack, sus proyectos y cómo contactarlo.",
      en: "Hi. I answer questions about Gabriel: his experience, stack, projects and how to reach him.",
    },
    next: ["about", "stack", "projects", "availability"],
  },
  {
    id: "about",
    prompt: { es: "¿Quién es Gabriel?", en: "Who is Gabriel?" },
    examples: {
      es: ["quién es gabriel", "quién eres", "cuéntame de ti", "preséntate", "a qué te dedicas", "qué haces", "de qué trabajas", "resumen de tu perfil", "háblame de gabriel", "cuál es tu perfil profesional", "quién es este man", "en pocas palabras quién es"],
      en: ["who is gabriel", "who are you", "tell me about yourself", "introduce yourself", "what do you do", "what's your job", "summary of your profile", "tell me about gabriel", "professional background", "give me a quick intro", "overview of gabriel"],
    },
    answer: {
      es: "Gabriel Molina es ingeniero de software full-stack. Construye aplicaciones web, software empresarial, ERPs, APIs e integraciones cloud, y se encarga tanto del frontend como de la arquitectura del backend.",
      en: "Gabriel Molina is a full-stack software engineer. He builds web applications, enterprise software, ERPs, APIs and cloud integrations, handling both the frontend and the backend architecture.",
    },
    next: ["experience", "stack", "projects"],
  },
  {
    id: "experience",
    prompt: { es: "¿Cuánta experiencia tiene?", en: "How much experience does he have?" },
    examples: {
      es: ["cuántos años de experiencia tienes", "cuánta experiencia tienes", "dónde has trabajado", "cuál es tu trayectoria", "experiencia laboral", "en qué empresas has trabajado", "tu historial profesional", "cuántos proyectos has hecho", "hace cuánto programas", "dónde ha trabajado gabriel", "experiencia de gabriel", "cuántos años lleva programando"],
      en: ["how many years of experience", "how much experience do you have", "where have you worked", "work history", "career path", "which companies have you worked for", "professional experience", "how many projects have you delivered", "how long have you been coding", "where has gabriel worked", "how experienced is he"],
    },
    answer: {
      es: "Más de 4 años haciendo software en producción y más de 20 proyectos entregados. Desde julio de 2026 es programador full stack en 3Pi, trabaja en Nelumbo Consultores desde 2022, estuvo en Humera (2025 – 2026) y hace proyectos freelance desde 2021.",
      en: "Over 4 years building production software and more than 20 projects delivered. Since July 2026 he's a full-stack developer at 3Pi, he has worked at Nelumbo Consultores since 2022, was at Humera (2025 – 2026) and has done freelance work since 2021.",
    },
    next: ["threepi", "nelumbo", "humera", "freelance"],
  },
  {
    id: "threepi",
    prompt: { es: "¿Qué hace en 3Pi?", en: "What does he do at 3Pi?" },
    examples: {
      es: ["dónde trabajas ahora", "trabajo actual", "en qué empresa estás", "cuál es tu empleo actual", "dónde trabaja hoy", "para quién trabaja", "trabajo actual de gabriel", "qué haces en 3pi", "3pi", "tres pi", "agencia b2b", "haces pruebas automatizadas", "sabes de testing", "pruebas unitarias", "pruebas end to end", "pirámide de pruebas", "qa", "experiencia en testing", "experiencia con pruebas automatizadas"],
      en: ["where do you work now", "current job", "current company", "current employer", "where does he work today", "who does he work for", "what do you do at 3pi", "3pi", "b2b agency", "do you write automated tests", "testing experience", "unit tests", "end to end tests", "test pyramid", "qa"],
    },
    answer: {
      es: "Desde julio de 2026 es programador full stack en 3Pi, una agencia B2B de servicio completo, en remoto. Diseña e implementa la pirámide de pruebas automatizadas (unitarias, de integración y end-to-end), desarrolla en frontend y backend, y se encarga de DevOps: CI/CD, automatización y flujos de despliegue.",
      en: "Since July 2026 he's a full-stack developer at 3Pi, a full-service B2B agency, working remotely. He designs and implements the automated test pyramid (unit, integration and end-to-end), builds across frontend and backend, and handles DevOps: CI/CD, automation and deployment workflows.",
    },
    next: ["nelumbo", "cloud"],
  },
  {
    id: "nelumbo",
    prompt: { es: "¿Qué hace en Nelumbo?", en: "What does he do at Nelumbo?" },
    examples: {
      es: ["qué haces en nelumbo", "nelumbo consultores", "nelumbo", "tu rol en nelumbo", "qué hace gabriel en nelumbo"],
      en: ["what do you do at nelumbo", "nelumbo consultores", "nelumbo", "your role at nelumbo", "what does he do at nelumbo"],
    },
    answer: {
      es: "En Nelumbo Consultores, desde 2022, es ingeniero de software full-stack: soluciones empresariales, integraciones cloud, ERPs y plataformas de automatización para varias industrias. Stack: React, NestJS, Spring Boot, AWS y PostgreSQL.",
      en: "At Nelumbo Consultores, since 2022, he's a full-stack software engineer: enterprise solutions, cloud integrations, ERPs and automation platforms across industries. Stack: React, NestJS, Spring Boot, AWS and PostgreSQL.",
    },
    next: ["humera", "projects"],
  },
  {
    id: "humera",
    prompt: { es: "¿Qué hizo en Humera?", en: "What did he do at Humera?" },
    examples: {
      es: ["qué hiciste en humera", "humera", "tu rol en humera", "trabajaste en humera"],
      en: ["what did you do at humera", "humera", "your role at humera", "did you work at humera"],
    },
    answer: {
      es: "En Humera (2025 – 2026) desarrolló aplicaciones web y herramientas internas. Lideró el frontend con Angular y Vue.js y participó en el diseño de APIs y bases de datos, con .NET y SQL Server.",
      en: "At Humera (2025 – 2026) he built web applications and internal tools. He led frontend work with Angular and Vue.js and helped design APIs and databases with .NET and SQL Server.",
    },
    next: ["freelance", "frontend"],
  },
  {
    id: "freelance",
    prompt: { es: "¿Hace freelance?", en: "Does he freelance?" },
    examples: {
      es: ["haces freelance", "trabajas por tu cuenta", "trabajos independientes", "proyectos freelance", "trabajas con pymes", "haces proyectos por fuera"],
      en: ["do you freelance", "freelance work", "independent projects", "do you work with small businesses", "side projects for clients", "are you a freelancer"],
    },
    answer: {
      es: "Sí. Desde 2021 hace software a medida para pequeñas y medianas empresas: inventarios, productos SaaS y APIs REST, con Next.js, FastAPI, MongoDB y Docker.",
      en: "Yes. Since 2021 he has built custom software for small and mid-sized businesses: inventory systems, SaaS products and REST APIs, using Next.js, FastAPI, MongoDB and Docker.",
    },
    next: ["availability", "services"],
  },
  {
    id: "education",
    prompt: { es: "¿Qué estudió?", en: "What did he study?" },
    examples: {
      es: ["qué estudiaste", "tienes título", "universidad", "estudios", "eres ingeniero", "formación académica", "dónde estudiaste"],
      en: ["what did you study", "do you have a degree", "university", "education", "are you an engineer", "academic background", "where did you study"],
    },
    answer: {
      es: "Estudió ingeniería entre 2022 y 2026. En la universidad hizo proyectos de IA, APIs y visualización de datos con Python, React, PostgreSQL y machine learning; varios terminaron siendo proyectos de este portafolio.",
      en: "He studied engineering from 2022 to 2026. At university he built AI, API and data visualization projects with Python, React, PostgreSQL and machine learning; several grew into projects in this portfolio.",
    },
    next: ["ai", "projects"],
  },
  {
    id: "stack",
    prompt: { es: "¿Qué tecnologías usa?", en: "What's his stack?" },
    examples: {
      es: ["qué tecnologías usas", "cuál es tu stack", "en qué lenguajes programas", "qué lenguajes sabes", "con qué herramientas trabajas", "qué frameworks manejas", "tecnologías que dominas"],
      en: ["what technologies do you use", "what's your stack", "tech stack", "which languages do you code in", "what programming languages do you know", "what tools do you work with", "which frameworks"],
    },
    answer: {
      es: "Frontend: Angular, React, Vue.js y Next.js con TypeScript. Backend: NestJS, Node.js, Spring Boot, .NET y Python con FastAPI. Datos: PostgreSQL, MySQL, SQL Server y MongoDB. Cloud: AWS, Docker y GitHub Actions.",
      en: "Frontend: Angular, React, Vue.js and Next.js with TypeScript. Backend: NestJS, Node.js, Spring Boot, .NET and Python with FastAPI. Data: PostgreSQL, MySQL, SQL Server and MongoDB. Cloud: AWS, Docker and GitHub Actions.",
    },
    next: ["frontend", "backend", "cloud"],
  },
  {
    id: "frontend",
    prompt: { es: "¿Y en frontend?", en: "And frontend?" },
    examples: {
      es: ["sabes angular", "sabes react", "manejas vue", "frontend", "haces interfaces", "next js", "typescript", "sabes css", "diseño web", "vuejs", "has usado vue js", "sabes angular"],
      en: ["do you know angular", "do you know react", "vue experience", "frontend", "do you build user interfaces", "nextjs", "typescript", "css skills", "web design", "vuejs", "have you used vue js"],
    },
    answer: {
      es: "Trabaja a diario con Angular, React, Vue.js y Next.js, siempre con TypeScript. En Humera lideró el frontend con Angular y Vue.js.",
      en: "He works daily with Angular, React, Vue.js and Next.js, always with TypeScript. At Humera he led frontend work with Angular and Vue.js.",
    },
    next: ["backend", "projects"],
  },
  {
    id: "backend",
    prompt: { es: "¿Y en backend?", en: "And backend?" },
    examples: {
      es: ["sabes java", "spring boot", "nestjs", "node", "net", "c#", "backend", "haces apis", "python", "fastapi", "express", "nest js", "node js", "apis rest", "experiencia con apis"],
      en: ["do you know java", "spring boot", "nestjs", "node", "dotnet", "c#", "backend", "do you build apis", "python", "fastapi", "express", "nest js", "rest apis"],
    },
    answer: {
      es: "En backend usa NestJS y Express sobre Node.js, Spring Boot con Java, .NET y Python con FastAPI. Diseña APIs REST y GraphQL con autenticación, validación y reglas de negocio.",
      en: "On the backend he uses NestJS and Express on Node.js, Spring Boot with Java, .NET and Python with FastAPI. He designs REST and GraphQL APIs with authentication, validation and business rules.",
    },
    next: ["databases", "cloud"],
  },
  {
    id: "databases",
    prompt: { es: "¿Qué bases de datos?", en: "Which databases?" },
    examples: {
      es: ["qué bases de datos usas", "sabes sql", "postgres", "mongodb", "mysql", "sql server", "base de datos", "mongo", "usas postgresql", "manejas bases de datos relacionales"],
      en: ["which databases do you use", "do you know sql", "postgres", "mongodb", "mysql", "sql server", "database", "postgresql", "relational databases"],
    },
    answer: {
      es: "PostgreSQL es su base principal. También trabaja con MySQL, SQL Server, MongoDB y AWS RDS.",
      en: "PostgreSQL is his main database. He also works with MySQL, SQL Server, MongoDB and AWS RDS.",
    },
    next: ["cloud", "backend"],
  },
  {
    id: "cloud",
    prompt: { es: "¿Trabaja con AWS?", en: "Does he use AWS?" },
    examples: {
      es: ["sabes aws", "trabajas en la nube", "cloud", "docker", "ci cd", "devops", "despliegues", "github actions", "amazon web services", "cómo despliegas"],
      en: ["do you know aws", "cloud experience", "cloud", "docker", "ci cd", "devops", "deployments", "github actions", "amazon web services", "how do you deploy"],
    },
    answer: {
      es: "Sí, AWS aparece en casi todos sus proyectos. Despliega con Docker y pipelines de CI/CD en GitHub Actions, con escalado, monitoreo e infraestructura como código.",
      en: "Yes, AWS shows up in almost all his projects. He deploys with Docker and CI/CD pipelines on GitHub Actions, with scaling, monitoring and infrastructure as code.",
    },
    next: ["projects", "services"],
  },
  {
    id: "ai",
    prompt: { es: "¿Trabaja con IA?", en: "Does he work with AI?" },
    examples: {
      es: ["trabajas con inteligencia artificial", "sabes machine learning", "haces ia", "modelos de ia", "agentes de ia", "chatbots", "aprendizaje automático", "hace cosas con ia"],
      en: ["do you work with artificial intelligence", "machine learning", "do you do ai", "ai models", "ai agents", "chatbots", "llm experience"],
    },
    answer: {
      es: "Sí. Construyó una plataforma de detección de bots con IA y un tutor de cálculo conversacional, y en la universidad hizo proyectos de machine learning con Python.",
      en: "Yes. He built an AI bot detection platform and a conversational calculus tutor, and did machine learning projects with Python at university.",
    },
    next: ["project_bots", "project_tutor"],
  },
  {
    id: "projects",
    prompt: { es: "Muéstrame sus proyectos", en: "Show me his projects" },
    examples: {
      es: ["qué proyectos has hecho", "muéstrame proyectos", "portafolio", "tus mejores proyectos", "en qué has trabajado", "ejemplos de tu trabajo", "casos de éxito", "qué has construido", "qué ha construido"],
      en: ["what projects have you built", "show me projects", "portfolio", "your best projects", "what have you worked on", "examples of your work", "case studies", "can i see your work", "show me what he built"],
    },
    answer: {
      es: "Cuatro destacados: una plataforma de gestión de obras, un ERP de finanzas e inventario, un sistema de detección de bots con IA y un tutor de cálculo con IA. Pregúntame por cualquiera.",
      en: "Four highlights: a construction management platform, a finance and inventory ERP, an AI bot detection system and an AI calculus tutor. Ask me about any of them.",
    },
    links: [{ label: { es: "Ver proyectos", en: "See projects" }, href: "#work" }],
    next: ["project_construction", "project_erp", "project_bots", "project_tutor"],
  },
  {
    id: "project_construction",
    prompt: { es: "La plataforma de obras", en: "The construction platform" },
    examples: {
      es: ["plataforma de obras", "gestión de construcción", "software para constructoras", "proyecto de obras", "seguimiento de obras"],
      en: ["construction platform", "construction management", "software for builders", "construction project", "site tracking"],
    },
    answer: {
      es: "Es una plataforma para constructoras: seguimiento de obras y sus estados, gestión de personal y asistencia, y un panel operativo con reportes. Hecha con React, NestJS, PostgreSQL y AWS.",
      en: "A platform for construction companies: project and status tracking, workforce and attendance management, and an operational dashboard with reports. Built with React, NestJS, PostgreSQL and AWS.",
    },
    next: ["project_erp", "contact"],
  },
  {
    id: "project_erp",
    prompt: { es: "El ERP", en: "The ERP" },
    examples: {
      es: ["el erp", "erp de inventario", "sistema de finanzas", "inventario", "sabes hacer erps", "erp de finanzas"],
      en: ["the erp", "inventory erp", "finance system", "inventory", "can you build erps", "finance erp"],
    },
    answer: {
      es: "Un ERP de finanzas e inventario: catálogo y existencias, módulos de finanzas y compras, clientes y proveedores, todo en un solo lugar. Hecho con Angular, TypeScript, PostgreSQL y AWS.",
      en: "A finance and inventory ERP: catalog and stock, finance and purchasing modules, clients and suppliers, all in one place. Built with Angular, TypeScript, PostgreSQL and AWS.",
    },
    next: ["project_bots", "services"],
  },
  {
    id: "project_bots",
    prompt: { es: "La detección de bots", en: "The bot detection project" },
    examples: {
      es: ["detección de bots", "ciberseguridad", "tráfico sospechoso", "proyecto de seguridad", "detectar bots"],
      en: ["bot detection", "cybersecurity", "suspicious traffic", "security project", "detect bots"],
    },
    answer: {
      es: "Un dashboard que detecta tráfico automatizado y sospechoso, muestra métricas en tiempo real y monitorea retos, verificaciones y respuestas de la API. Hecho con Python, FastAPI, Angular y AWS.",
      en: "A dashboard that detects automated and suspicious traffic, shows real-time metrics and monitors challenges, verifications and API responses. Built with Python, FastAPI, Angular and AWS.",
    },
    next: ["project_tutor", "ai"],
  },
  {
    id: "project_tutor",
    prompt: { es: "El tutor de cálculo", en: "The calculus tutor" },
    examples: {
      es: ["tutor de cálculo", "tutor con ia", "proyecto de educación", "ayuda con matemáticas", "chatbot educativo"],
      en: ["calculus tutor", "ai tutor", "education project", "math help", "educational chatbot"],
    },
    answer: {
      es: "Un tutor conversacional que habla con el estudiante, resuelve ejercicios de cálculo y lo guía paso a paso en álgebra, estadística y matemáticas. Hecho con React, TypeScript, agentes de IA y AWS.",
      en: "A conversational tutor that talks with students, solves calculus exercises and guides them step by step through algebra, statistics and math. Built with React, TypeScript, AI agents and AWS.",
    },
    next: ["project_construction", "contact"],
  },
  {
    id: "services",
    prompt: { es: "¿Qué puede construir?", en: "What can he build?" },
    examples: {
      es: ["qué servicios ofreces", "qué puedes construir", "me puedes hacer una app", "necesito una página web", "necesito un sistema", "haces software a medida", "puedes hacer un saas", "integraciones", "sistema para mi empresa", "software para mi negocio", "me ayudas con un proyecto"],
      en: ["what services do you offer", "what can you build", "can you build an app for me", "i need a website", "i need a system", "custom software", "can you build a saas", "integrations"],
    },
    answer: {
      es: "Plataformas SaaS, ERPs, integraciones entre sistemas, APIs y backends, aplicaciones en AWS, productos con IA, paneles administrativos y automatización de procesos.",
      en: "SaaS platforms, ERPs, system integrations, APIs and backends, applications on AWS, AI products, admin dashboards and process automation.",
    },
    links: [bookingLink],
    next: ["availability", "pricing"],
  },
  {
    id: "availability",
    prompt: { es: "¿Está disponible?", en: "Is he available?" },
    examples: {
      es: ["estás disponible", "tienes disponibilidad", "aceptas proyectos", "puedes trabajar conmigo", "trabajas remoto", "te puedo contratar", "buscas trabajo", "estás abierto a ofertas", "puedo contratarte", "estás libre", "tienes tiempo para un proyecto nuevo", "aceptas clientes nuevos"],
      en: ["are you available", "do you have availability", "are you taking projects", "can you work with me", "do you work remotely", "can i hire you", "are you looking for a job", "open to offers", "open to work", "are you free for a new project"],
    },
    answer: {
      es: "Sí, está disponible para proyectos nuevos y trabaja de forma remota. Lo más rápido es agendar una llamada de 30 minutos o escribirle.",
      en: "Yes, he's available for new projects and works remotely. The fastest way is to book a 30-minute call or send him an email.",
    },
    links: [bookingLink, emailLink],
    next: ["pricing", "contact"],
  },
  {
    id: "pricing",
    prompt: { es: "¿Cuánto cobra?", en: "What are his rates?" },
    examples: {
      es: ["cuánto cobras", "cuál es tu tarifa", "precio de un proyecto", "cuánto cuesta", "presupuesto", "cotización", "valor por hora", "cuánto costaría una app", "cuánto vale un sistema"],
      en: ["how much do you charge", "what are your rates", "project price", "how much does it cost", "budget", "quote", "hourly rate"],
    },
    answer: {
      es: "Depende del alcance del proyecto, así que no tengo un precio fijo. Cuéntale a Gabriel qué necesitas y te envía una cotización.",
      en: "It depends on the scope, so there's no fixed price. Tell Gabriel what you need and he'll send you a quote.",
    },
    links: [bookingLink, emailLink],
    next: ["contact"],
  },
  {
    id: "contact",
    prompt: { es: "¿Cómo lo contacto?", en: "How do I contact him?" },
    examples: {
      es: ["cómo te contacto", "cuál es tu correo", "email", "quiero hablar contigo", "agendar una reunión", "llamada", "tu número", "cómo te escribo"],
      en: ["how can i contact you", "what's your email", "email address", "i want to talk to you", "schedule a meeting", "book a call", "phone number", "how do i reach you", "get in touch", "contact details"],
    },
    answer: {
      es: `Escríbele a ${CONTACT_EMAIL}, usa el formulario al final de la página o agenda una llamada de 30 minutos.`,
      en: `Email him at ${CONTACT_EMAIL}, use the form at the bottom of the page or book a 30-minute call.`,
    },
    links: [emailLink, bookingLink, { label: { es: "Ir al formulario", en: "Go to the form" }, href: "#contact" }],
    next: ["socials"],
  },
  {
    id: "socials",
    prompt: { es: "Sus redes", en: "His social links" },
    examples: {
      es: ["tienes github", "tu linkedin", "redes sociales", "dónde te encuentro", "tu perfil", "código fuente", "tienes instagram", "tu instagram", "ig", "dónde te sigo"],
      en: ["github", "linkedin", "social media", "where can i find you", "your profile", "source code", "instagram", "do you have instagram", "ig", "where can i follow you"],
    },
    answer: {
      es: "Lo encuentras en GitHub como GambMoli, en LinkedIn como Gabriel Molina y en Instagram como @codecongabo.",
      en: "You can find him on GitHub as GambMoli, on LinkedIn as Gabriel Molina and on Instagram as @codecongabo.",
    },
    links: [
      { label: { es: "GitHub", en: "GitHub" }, href: github },
      { label: { es: "LinkedIn", en: "LinkedIn" }, href: linkedin },
      { label: { es: "Instagram", en: "Instagram" }, href: instagram },
    ],
    next: ["contact"],
  },
  {
    id: "bot",
    prompt: { es: "¿Cómo funcionas?", en: "How do you work?" },
    examples: {
      es: ["cómo funcionas", "eres una ia", "eres chatgpt", "eres un bot", "quién te hizo", "qué modelo usas", "cómo te entrenaron", "estoy hablando con una persona", "eres real", "eres chat gpt", "cómo funciona este chat"],
      en: ["how do you work", "are you an ai", "are you chatgpt", "are you a bot", "who made you", "what model are you", "how were you trained", "are you a real person", "am i talking to a human", "how does this chatbot work", "chat gpt"],
    },
    answer: {
      es: "Soy un clasificador pequeño, hecho a mano, que corre en tu navegador. Convierto tu pregunta en un vector TF-IDF de palabras y trigramas de letras, la comparo con frases de ejemplo y respondo con la intención más parecida (k vecinos más cercanos). No uso ningún servicio externo.",
      en: "I'm a small hand-built classifier that runs in your browser. I turn your question into a TF-IDF vector of words and letter trigrams, compare it with example phrases and reply with the closest intent (k-nearest neighbours). No external service involved.",
    },
    next: ["ai", "about"],
  },
  {
    id: "thanks",
    prompt: { es: "Gracias", en: "Thanks" },
    examples: {
      es: ["gracias", "muchas gracias", "genial", "perfecto", "excelente", "vale", "ok gracias", "chévere"],
      en: ["thanks", "thank you", "great", "perfect", "awesome", "cool", "ok thanks", "nice", "thx", "ty"],
    },
    answer: {
      es: "Con gusto. Si quieres seguir la conversación con Gabriel, escríbele o agenda una llamada.",
      en: "You're welcome. If you want to continue the conversation with Gabriel, email him or book a call.",
    },
    links: [bookingLink],
  },
  {
    id: "bye",
    prompt: { es: "Adiós", en: "Bye" },
    examples: {
      es: ["adiós", "chao", "hasta luego", "nos vemos", "me voy"],
      en: ["bye", "goodbye", "see you", "see you later", "i'm leaving"],
    },
    answer: {
      es: "Hasta luego. Gracias por pasar.",
      en: "See you. Thanks for stopping by.",
    },
  },
];

export const intentById = new Map(intents.map((intent) => [intent.id, intent]));

export const trainingExamples: TrainingExample[] = intents.flatMap((intent) =>
  (["es", "en"] as const).flatMap((lang) =>
    intent.examples[lang].map((text) => ({ intent: intent.id, lang, text })),
  ),
);

export const fallback = {
  answer: {
    es: `No tengo ese dato. Puedes preguntárselo directamente a Gabriel en ${CONTACT_EMAIL}.`,
    en: `I don't have that information. You can ask Gabriel directly at ${CONTACT_EMAIL}.`,
  },
  unsure: {
    es: "No estoy seguro de haber entendido. ¿Preguntas por alguno de estos temas?",
    en: "I'm not sure I understood. Are you asking about one of these?",
  },
  links: [emailLink],
};

export const starters = ["about", "stack", "projects", "availability"];
