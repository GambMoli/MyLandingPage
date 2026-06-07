import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "../i18n";

type Project = {
  id: number;
  title: {
    es: string;
    en: string;
  };
  category: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  highlights: {
    es: string[];
    en: string[];
  };
  techs: string[];
  image: string;
  accent: string;
  demo: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: {
      es: "Plataforma de gestion de construccion",
      en: "Construction Management Platform",
    },
    category: {
      es: "Software empresarial",
      en: "Business Software",
    },
    description: {
      es: "Plataforma para constructoras enfocada en control operativo, seguimiento de obras, supervisores, clientes y reportes en tiempo real.",
      en: "A construction operations platform focused on project tracking, supervisors, clients, and real-time reporting.",
    },
    highlights: {
      es: [
        "Seguimiento de obras y estados",
        "Gestion de personal y asistencia",
        "Panel operativo con reportes",
      ],
      en: [
        "Project and status tracking",
        "Workforce and attendance management",
        "Operational dashboard with reporting",
      ],
    },
    techs: ["React", "NestJS", "PostgreSQL", "AWS"],
    image: "/obras.png",
    accent: "#3B82F6",
    demo: "#contact",
  },
  {
    id: 2,
    title: {
      es: "ERP de finanzas e inventario",
      en: "Finance and Inventory ERP",
    },
    category: {
      es: "ERP",
      en: "ERP",
    },
    description: {
      es: "Sistema ERP para inventario, finanzas, clientes, proveedores y control administrativo con una interfaz clara para la operacion diaria.",
      en: "An ERP system for inventory, finance, clients, suppliers, and administrative control with a clear daily-operations interface.",
    },
    highlights: {
      es: [
        "Inventario y catalogo de productos",
        "Modulos de finanzas y compras",
        "Gestion centralizada del negocio",
      ],
      en: [
        "Inventory and product catalog",
        "Finance and purchasing modules",
        "Centralized business management",
      ],
    },
    techs: ["Angular", "TypeScript", "PostgreSQL", "AWS"],
    image: "/ERP.png",
    accent: "#8B5CF6",
    demo: "#contact",
  },
  {
    id: 3,
    title: {
      es: "Plataforma de deteccion de bots con IA",
      en: "AI Bot Detection Platform",
    },
    category: {
      es: "Ciberseguridad e IA",
      en: "Cybersecurity and AI",
    },
    description: {
      es: "Dashboard para deteccion de trafico automatizado, metricas de comportamiento y monitoreo continuo de amenazas en tiempo real.",
      en: "A monitoring dashboard for automated traffic detection, behavior metrics, and continuous real-time threat analysis.",
    },
    highlights: {
      es: [
        "Deteccion de bots y trafico sospechoso",
        "Metricas visuales en tiempo real",
        "Monitoreo de retos, verificacion y respuesta API",
      ],
      en: [
        "Bot and suspicious traffic detection",
        "Real-time visual metrics",
        "Challenge, verification, and API response monitoring",
      ],
    },
    techs: ["Python", "FastAPI", "Angular", "AWS"],
    image: "/Botdetection.png",
    accent: "#EF4444",
    demo: "#contact",
  },
  {
    id: 4,
    title: {
      es: "Tutor de calculo con IA",
      en: "AI Calculus Tutor",
    },
    category: {
      es: "Educacion e IA",
      en: "Education and AI",
    },
    description: {
      es: "Tutor academico conversacional que habla con el estudiante, resuelve ejercicios de calculo y lo guia paso a paso en algebra, estadistica y matematicas.",
      en: "A conversational academic tutor that talks with students, solves calculus exercises, and guides them step by step through algebra, statistics, and math.",
    },
    highlights: {
      es: [
        "Agente conversacional para estudiantes",
        "Soporte para calculo, algebra y estadistica",
        "Experiencia guiada para resolver ejercicios",
      ],
      en: [
        "Conversational agent for students",
        "Support for calculus, algebra, and statistics",
        "Guided experience for solving exercises",
      ],
    },
    techs: ["React", "AI Agents", "TypeScript", "AWS"],
    image: "/Chatbot.png",
    accent: "#2563EB",
    demo: "#contact",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { language } = useLanguage();

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        background: "rgba(13, 17, 28, 0.82)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          background: "#101828",
        }}
      >
        <img
          src={project.image}
          alt={project.title[language]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,11,18,0.04) 0%, rgba(8,11,18,0.12) 55%, rgba(8,11,18,0.72) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(10,10,10,0.62)",
            border: `1px solid ${project.accent}55`,
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: project.accent,
            }}
          />
          <span
            style={{
              color: "#F8FAFC",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.category[language]}
          </span>
        </div>
      </div>

      <div style={{ padding: "28px 24px 24px" }}>
        <h3
          style={{
            color: "#F8FAFC",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
            lineHeight: 1.15,
            marginBottom: 14,
          }}
        >
          {project.title[language]}
        </h3>

        <p
          style={{
            color: "#CBD5E1",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.75,
            marginBottom: 18,
          }}
        >
          {project.description[language]}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {project.highlights[language].map((highlight) => (
            <div
              key={highlight}
              style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
            >
              <span
                style={{
                  color: project.accent,
                  fontSize: 16,
                  lineHeight: 1.2,
                  marginTop: 1,
                }}
              >
                •
              </span>
              <span
                style={{
                  color: "#E2E8F0",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {highlight}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
          {project.techs.map((tech) => (
            <span
              key={tech}
              style={{
                padding: "7px 12px",
                borderRadius: 999,
                border: `1px solid ${project.accent}33`,
                background: `${project.accent}14`,
                color: "#F8FAFC",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.demo}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: project.accent,
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {language === "es" ? "Hablemos de este proyecto" : "Let's talk about this project"}
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  return (
    <section id="projects" style={{ background: "#0A0A0A", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top, rgba(37,99,235,0.1), transparent 38%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 2rem" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.25)",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: "#93C5FD",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}
            >
              03 / {language === "es" ? "proyectos" : "projects"}
            </span>
          </div>

          <h2
            style={{
              color: "#F8FAFC",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.02,
              marginBottom: 16,
            }}
          >
            {language === "es" ? "Mis mejores proyectos" : "My Best Projects"}
          </h2>

          <p
            style={{
              color: "#94A3B8",
              maxWidth: 760,
              margin: "0 auto",
              fontSize: 16,
              lineHeight: 1.8,
              fontFamily: "var(--font-body)",
            }}
          >
            {language === "es"
              ? "Una seleccion de productos digitales construidos para resolver problemas reales en operacion, automatizacion, analitica e inteligencia artificial."
              : "A selection of digital products built to solve real problems in operations, automation, analytics, and artificial intelligence."}
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 28,
          }}
          className="projects-grid"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
