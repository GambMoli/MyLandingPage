// Contenido del sitio. Lo usan tanto las secciones como el bot (src/app/bot/intents.ts).
// Si cambias algo aqui, revisa tambien las respuestas del bot.

export type Language = "es" | "en";
export type Localized<T = string> = Record<Language, T>;

export const CONTACT_EMAIL = "g.molinabor@gmail.com";

// Redes sociales. Para agregar otra (Instagram, X, YouTube...), agrega una entrada aqui
// y aparecera en el hero, en contacto y en el footer.
export const socials: { id: string; label: string; handle: string; href: string }[] = [
  { id: "github", label: "GitHub", handle: "GambMoli", href: "https://github.com/GambMoli" },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "gabriel-molina",
    href: "https://www.linkedin.com/in/gabriel-molina-ab1165281",
  },
  { id: "instagram", label: "Instagram", handle: "@codecongabo", href: "https://www.instagram.com/codecongabo/" },
  { id: "email", label: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  // { id: "x", label: "X", handle: "@tu_usuario", href: "https://x.com/tu_usuario" },
];

export const BOOKING_URL = "https://cal.com/gabriel-molina-h3zrjf/30min";

// Foto de perfil. Pon tu foto en /public (por ejemplo /gabriel.jpg) y escribe la ruta aqui.
// Mientras sea null se muestran tus iniciales.
export const PROFILE_PHOTO: string | null = null;

export const stats: { value: string; label: Localized }[] = [
  { value: "4+", label: { es: "años en producción", en: "years in production" } },
  { value: "20+", label: { es: "proyectos entregados", en: "projects delivered" } },
  { value: "10+", label: { es: "integraciones empresariales", en: "enterprise integrations" } },
  { value: "15+", label: { es: "tecnologías en uso", en: "technologies in use" } },
];

export type Project = {
  id: string;
  title: Localized;
  category: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  techs: string[];
  image: string;
};

export const projects: Project[] = [
  {
    id: "construction",
    title: { es: "Plataforma de gestión de obras", en: "Construction management platform" },
    category: { es: "Software empresarial", en: "Business software" },
    description: {
      es: "Para constructoras: control operativo, seguimiento de obras, supervisores, clientes y reportes en tiempo real.",
      en: "For construction companies: operational control, project tracking, supervisors, clients and real-time reporting.",
    },
    highlights: {
      es: ["Seguimiento de obras y sus estados", "Gestión de personal y asistencia", "Panel operativo con reportes"],
      en: ["Project and status tracking", "Workforce and attendance management", "Operational dashboard with reports"],
    },
    techs: ["React", "NestJS", "PostgreSQL", "AWS"],
    image: "/obras.png",
  },
  {
    id: "erp",
    title: { es: "ERP de finanzas e inventario", en: "Finance and inventory ERP" },
    category: { es: "ERP", en: "ERP" },
    description: {
      es: "Inventario, finanzas, clientes, proveedores y control administrativo, con una interfaz pensada para la operación diaria.",
      en: "Inventory, finance, clients, suppliers and administrative control, with an interface built for daily operations.",
    },
    highlights: {
      es: ["Inventario y catálogo de productos", "Módulos de finanzas y compras", "Gestión centralizada del negocio"],
      en: ["Inventory and product catalog", "Finance and purchasing modules", "Centralized business management"],
    },
    techs: ["Angular", "TypeScript", "PostgreSQL", "AWS"],
    image: "/ERP.png",
  },
  {
    id: "botdetection",
    title: { es: "Detección de bots con IA", en: "AI bot detection" },
    category: { es: "Ciberseguridad e IA", en: "Cybersecurity and AI" },
    description: {
      es: "Dashboard que detecta tráfico automatizado, mide comportamiento y monitorea amenazas en tiempo real.",
      en: "A dashboard that detects automated traffic, measures behavior and monitors threats in real time.",
    },
    highlights: {
      es: ["Detección de bots y tráfico sospechoso", "Métricas visuales en tiempo real", "Monitoreo de retos, verificación y respuestas de la API"],
      en: ["Bot and suspicious traffic detection", "Real-time visual metrics", "Challenge, verification and API response monitoring"],
    },
    techs: ["Python", "FastAPI", "Angular", "AWS"],
    image: "/Botdetection.png",
  },
  {
    id: "tutor",
    title: { es: "Tutor de cálculo con IA", en: "AI calculus tutor" },
    category: { es: "Educación e IA", en: "Education and AI" },
    description: {
      es: "Tutor conversacional que resuelve ejercicios de cálculo y guía al estudiante paso a paso en álgebra, estadística y matemáticas.",
      en: "A conversational tutor that solves calculus exercises and guides students step by step through algebra, statistics and math.",
    },
    highlights: {
      es: ["Agente conversacional para estudiantes", "Cálculo, álgebra y estadística", "Resolución guiada de ejercicios"],
      en: ["Conversational agent for students", "Calculus, algebra and statistics", "Guided exercise solving"],
    },
    techs: ["React", "AI Agents", "TypeScript", "AWS"],
    image: "/Chatbot.png",
  },
];

export type Role = {
  period: Localized;
  role: Localized;
  company: Localized;
  description: Localized;
  tags: string[];
};

export const experience: Role[] = [
  {
    period: { es: "jul. 2026 – hoy", en: "Jul 2026 – now" },
    role: { es: "Programador full stack", en: "Full-stack developer" },
    company: { es: "3Pi, agencia B2B de servicio completo (remoto)", en: "3Pi, full-service B2B agency (remote)" },
    description: {
      es: "Diseño e implemento la pirámide de pruebas automatizadas (unitarias, de integración y end-to-end) y desarrollo en frontend y backend. También llevo DevOps: CI/CD, automatización y flujos de despliegue que integran desarrollo y pruebas.",
      en: "I design and implement the automated test pyramid (unit, integration and end-to-end) and build across frontend and backend. I also handle DevOps: CI/CD, automation and deployment workflows that bring development and testing together.",
    },
    tags: ["Unit tests", "Integration tests", "E2E", "CI/CD", "DevOps"],
  },
  {
    period: { es: "2022 – hoy", en: "2022 – now" },
    role: { es: "Ingeniero de software full-stack", en: "Full-stack software engineer" },
    company: { es: "Nelumbo Consultores", en: "Nelumbo Consultores" },
    description: {
      es: "Soluciones empresariales, integraciones cloud, ERPs y plataformas de automatización para varias industrias.",
      en: "Enterprise solutions, cloud integrations, ERPs and automation platforms for several industries.",
    },
    tags: ["React", "NestJS", "Spring Boot", "AWS", "PostgreSQL"],
  },
  {
    period: { es: "2025 – 2026", en: "2025 – 2026" },
    role: { es: "Desarrollador de software", en: "Software developer" },
    company: { es: "Humera", en: "Humera" },
    description: {
      es: "Aplicaciones web y herramientas internas. Lideré el frontend con Angular y Vue.js y participé en el diseño de APIs y bases de datos.",
      en: "Web applications and internal tools. Led frontend work with Angular and Vue.js and helped design APIs and databases.",
    },
    tags: ["Angular", "Vue.js", ".NET", "SQL Server"],
  },
  {
    period: { es: "2021 – hoy", en: "2021 – now" },
    role: { es: "Desarrollador full-stack", en: "Full-stack developer" },
    company: { es: "Proyectos freelance", en: "Freelance projects" },
    description: {
      es: "Software a medida para pequeñas y medianas empresas: desde inventarios hasta productos SaaS y APIs REST.",
      en: "Custom software for small and mid-sized businesses: from inventory systems to SaaS products and REST APIs.",
    },
    tags: ["Next.js", "FastAPI", "MongoDB", "Docker"],
  },
  {
    period: { es: "2022 – 2026", en: "2022 – 2026" },
    role: { es: "Estudiante de ingeniería", en: "Engineering student" },
    company: { es: "Universidad", en: "University" },
    description: {
      es: "Proyectos académicos con IA, APIs y visualización de datos. Varios terminaron siendo proyectos de este portafolio.",
      en: "Academic projects in AI, APIs and data visualization. Several grew into projects in this portfolio.",
    },
    tags: ["Python", "React", "PostgreSQL", "Machine Learning"],
  },
];

export const stack: { group: Localized; items: string[] }[] = [
  {
    group: { es: "Frontend", en: "Frontend" },
    items: ["Angular", "React", "Vue.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    group: { es: "Backend", en: "Backend" },
    items: ["NestJS", "Node.js", "Express", "Spring Boot", "Java", ".NET", "Python", "FastAPI"],
  },
  {
    group: { es: "Bases de datos", en: "Databases" },
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "AWS RDS"],
  },
  {
    group: { es: "Cloud y DevOps", en: "Cloud and DevOps" },
    items: ["AWS", "Docker", "GitHub Actions", "CI/CD"],
  },
  {
    group: { es: "Día a día", en: "Day to day" },
    items: ["Git", "GitHub", "Postman", "Jira"],
  },
];

export const services: { icon: string; title: Localized; description: Localized }[] = [
  {
    icon: "globe",
    title: { es: "Plataformas SaaS", en: "SaaS platforms" },
    description: {
      es: "De la idea al lanzamiento, con usuarios, pagos y una arquitectura que aguante el crecimiento.",
      en: "From idea to launch, with users, billing and an architecture that holds up as you grow.",
    },
  },
  {
    icon: "package",
    title: { es: "ERPs", en: "ERPs" },
    description: {
      es: "Inventario, finanzas, RR. HH. y los flujos propios de tu operación.",
      en: "Inventory, finance, HR and the workflows specific to your operation.",
    },
  },
  {
    icon: "workflow",
    title: { es: "Integraciones", en: "Integrations" },
    description: {
      es: "Conecto tus sistemas con terceros, ERPs y servicios cloud: APIs, webhooks y ETL.",
      en: "I connect your systems with third parties, ERPs and cloud services: APIs, webhooks and ETL.",
    },
  },
  {
    icon: "database",
    title: { es: "APIs y backends", en: "APIs and backends" },
    description: {
      es: "REST y GraphQL documentadas, con autenticación, validación y reglas de negocio.",
      en: "Documented REST and GraphQL APIs with authentication, validation and business rules.",
    },
  },
  {
    icon: "cloud",
    title: { es: "Aplicaciones en AWS", en: "Applications on AWS" },
    description: {
      es: "Despliegue con escalado, monitoreo, CI/CD e infraestructura como código.",
      en: "Deployment with scaling, monitoring, CI/CD and infrastructure as code.",
    },
  },
  {
    icon: "cpu",
    title: { es: "Productos con IA", en: "AI products" },
    description: {
      es: "Modelos, pipelines de datos y automatización inteligente dentro de tu producto.",
      en: "Models, data pipelines and intelligent automation inside your product.",
    },
  },
  {
    icon: "dashboard",
    title: { es: "Paneles administrativos", en: "Admin dashboards" },
    description: {
      es: "Tablas, filtros, gráficas y permisos por rol para tu equipo interno.",
      en: "Tables, filters, charts and role-based access for your internal team.",
    },
  },
  {
    icon: "settings",
    title: { es: "Automatización", en: "Automation" },
    description: {
      es: "Flujos que reemplazan trabajo manual y reducen errores.",
      en: "Workflows that replace manual work and cut errors.",
    },
  },
];
