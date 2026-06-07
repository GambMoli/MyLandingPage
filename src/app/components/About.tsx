import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Code2, Layers, Rocket, Terminal } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "../i18n";

const timeline = {
  es: [
    {
      period: "2022 - Actualidad",
      role: "Ingeniero de Software Full-Stack",
      company: "Nelumbo Consultores",
      description: "Construyendo soluciones empresariales, integraciones cloud, ERPs y plataformas de automatizacion para multiples industrias.",
      tags: ["React", "NestJS", "Spring Boot", "AWS", "PostgreSQL"],
      icon: Rocket,
      color: "#3B82F6",
    },
    {
      period: "2025 - 2026",
      role: "Desarrollador de Software",
      company: "Humera",
      description: "Desarrollo de aplicaciones web y herramientas internas, liderando frontend con Angular y Vue.js en conjunto con diseno de APIs y base de datos.",
      tags: ["Angular", "Vue.js", ".NET", "SQL Server"],
      icon: Layers,
      color: "#8B5CF6",
    },
    {
      period: "2021 - Actualidad",
      role: "Full-Stack Developer",
      company: "Proyectos freelance",
      description: "Entrega de soluciones a medida para pequenas y medianas empresas, desde inventarios hasta SaaS y APIs REST.",
      tags: ["Next.js", "FastAPI", "MongoDB", "Docker"],
      icon: Code2,
      color: "#06B6D4",
    },
    {
      period: "2022 - 2026",
      role: "Estudiante de Ingenieria",
      company: "Proyectos universitarios",
      description: "Desarrollo de proyectos academicos con IA, APIs y visualizacion de datos, base de varias de las soluciones que hoy hacen parte del portafolio.",
      tags: ["Python", "React", "PostgreSQL", "Machine Learning"],
      icon: Terminal,
      color: "#10B981",
    },
  ],
  en: [
    {
      period: "2022 - Present",
      role: "Full-Stack Software Engineer",
      company: "Nelumbo Consultores",
      description: "Building enterprise solutions, cloud integrations, ERPs and automation platforms for multiple industries.",
      tags: ["React", "NestJS", "Spring Boot", "AWS", "PostgreSQL"],
      icon: Rocket,
      color: "#3B82F6",
    },
    {
      period: "2025 - 2026",
      role: "Software Developer",
      company: "Humera",
      description: "Built web applications and internal tools, leading frontend work with Angular and Vue.js while collaborating on API and database design.",
      tags: ["Angular", "Vue.js", ".NET", "SQL Server"],
      icon: Layers,
      color: "#8B5CF6",
    },
    {
      period: "2021 - Present",
      role: "Full-Stack Developer",
      company: "Freelance Projects",
      description: "Delivered custom solutions for small and mid-sized businesses, from inventory systems to SaaS products and REST APIs.",
      tags: ["Next.js", "FastAPI", "MongoDB", "Docker"],
      icon: Code2,
      color: "#06B6D4",
    },
    {
      period: "2022 - 2026",
      role: "Engineering Student",
      company: "University Projects",
      description: "Built academic projects in AI, APIs and data visualization, which later evolved into several portfolio solutions.",
      tags: ["Python", "React", "PostgreSQL", "Machine Learning"],
      icon: Terminal,
      color: "#10B981",
    },
  ],
};

function TimelineItem({ item, index, isLast }: { item: (typeof timeline)["es"][0]; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ display: "flex", gap: 24, marginBottom: 32 }}
    >
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${item.color}18`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} color={item.color} />
        </div>
        {!isLast ? <div style={{ width: 2, flex: 1, minHeight: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)", marginTop: 8 }} /> : null}
      </div>

      <div style={{ flex: 1, background: "rgba(17,24,39,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
          <div>
            <h4 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{item.role}</h4>
            <p style={{ color: item.color, fontSize: 14, fontWeight: 600 }}>{item.company}</p>
          </div>
          <span style={{ color: "#6B7280", fontSize: 12, fontFamily: "var(--font-mono)", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 6 }}>{item.period}</span>
        </div>
        <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{item.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontSize: 12, padding: "3px 10px", borderRadius: 100, fontFamily: "var(--font-mono)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  const copy = {
    es: {
      section: "01 / sobre mi",
      title: "Sobre mi",
      p1: "Ingeniero de software Full-Stack con experiencia en aplicaciones web, software empresarial, ERPs, APIs, cloud y automatizacion.",
      p2: "Combino frontend solido con arquitectura backend para desarrollar productos escalables de principio a fin.",
      p3: "Me enfoco en codigo limpio, mantenibilidad, rendimiento e impacto real en negocio.",
      stats: ["Anos de experiencia", "Proyectos entregados", "Stacks dominados", "Listo para remoto"],
      timeline: "Trayectoria profesional",
    },
    en: {
      section: "01 / about",
      title: "About Me",
      p1: "Full-Stack Software Engineer with experience in web apps, enterprise software, ERPs, APIs, cloud systems and automation.",
      p2: "I combine strong frontend skills with backend architecture to build scalable products end to end.",
      p3: "I focus on clean code, maintainability, performance and real business impact.",
      stats: ["Years experience", "Projects delivered", "Stacks mastered", "Remote-ready"],
      timeline: "Career Timeline",
    },
  }[language];

  const currentTimeline = timeline[language];

  return (
    <section id="about" style={{ padding: "120px 0", background: "#0A0A0A", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="about-grid">
          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 100, padding: "5px 14px" }}>
              <span style={{ fontSize: 12, color: "#A78BFA", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{copy.section}</span>
            </div>

            <h2 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", marginBottom: 24 }}>{copy.title}</h2>
            <p style={{ color: "#9CA3AF", lineHeight: 1.8, marginBottom: 20, fontSize: 16 }}>{copy.p1}</p>
            <p style={{ color: "#9CA3AF", lineHeight: 1.8, marginBottom: 20, fontSize: 16 }}>{copy.p2}</p>
            <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontSize: 16 }}>{copy.p3}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 }}>
              {[
                { value: "4+", label: copy.stats[0], color: "#3B82F6" },
                { value: "20+", label: copy.stats[1], color: "#8B5CF6" },
                { value: "10+", label: copy.stats[2], color: "#06B6D4" },
                { value: "100%", label: copy.stats[3], color: "#10B981" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "rgba(17,24,39,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ color: "#6B7280", fontSize: 13, marginTop: 6 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ marginBottom: 32 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "5px 14px" }}>
                <span style={{ fontSize: 12, color: "#60A5FA", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{copy.timeline}</span>
              </div>
            </motion.div>

            {currentTimeline.map((item, index) => (
              <TimelineItem key={`${item.company}-${index}`} item={item} index={index} isLast={index === currentTimeline.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
