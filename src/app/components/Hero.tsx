import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n";

const SOCIAL_LINKS = {
  github: "https://github.com/GambMoli",
  linkedin: "https://www.linkedin.com/in/gabriel-molina-ab1165281",
  email: "mailto:g.molinabor@gmail.com",
};

const techBadges = [
  { label: "React", color: "#61DAFB", bg: "rgba(97,218,251,0.1)" },
  { label: "Next.js", color: "#ffffff", bg: "rgba(255,255,255,0.1)" },
  { label: "TypeScript", color: "#3178C6", bg: "rgba(49,120,198,0.15)" },
  { label: "Python", color: "#FFD43B", bg: "rgba(255,212,59,0.1)" },
  { label: "NestJS", color: "#E0234E", bg: "rgba(224,35,78,0.1)" },
  { label: "AWS", color: "#FF9900", bg: "rgba(255,153,0,0.1)" },
  { label: "Docker", color: "#2496ED", bg: "rgba(36,150,237,0.12)" },
  { label: "PostgreSQL", color: "#336791", bg: "rgba(51,103,145,0.15)" },
];

function GridPattern() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ opacity: 0.2 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #0A0A0A 100%)" }} />
    </div>
  );
}

function FloatingBadge({ label, color, bg, x, y, delay }: { label: string; color: string; bg: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ delay, duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        background: bg,
        border: `1px solid ${color}30`,
        backdropFilter: "blur(12px)",
        borderRadius: 20,
        padding: "6px 14px",
        fontSize: 12,
        fontWeight: 600,
        color,
        fontFamily: "var(--font-mono)",
        boxShadow: `0 0 12px ${color}20`,
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      {label}
    </motion.div>
  );
}

export function Hero() {
  const { language } = useLanguage();

  const copy = {
    es: {
      available: "Disponible para nuevos proyectos",
      titleStart: "Construyo",
      titleAccent: "software escalable",
      titleEnd: "para negocios reales",
      subheadline:
        "Ingeniero Full-Stack especializado en Angular, Vue.js, React, Next.js, NestJS, Spring Boot, .NET, Python, infraestructura cloud y plataformas con IA.",
      description:
        "Diseno y desarrollo productos modernos, sistemas empresariales, arquitecturas en la nube y soluciones digitales que ayudan a automatizar procesos y crecer mas rapido.",
      viewProjects: "Ver proyectos",
      contactMe: "Contactarme",
      findMe: "Encuentrame en",
      scroll: "bajar",
    },
    en: {
      available: "Available for new projects",
      titleStart: "Building",
      titleAccent: "scalable software",
      titleEnd: "for real businesses",
      subheadline:
        "Full-Stack Software Engineer specialized in Angular, Vue.js, React, Next.js, NestJS, Spring Boot, .NET, Python, cloud infrastructure and AI-powered platforms.",
      description:
        "I design and build modern products, enterprise systems, cloud architectures and digital solutions that help businesses automate processes and grow faster.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      findMe: "Find me on",
      scroll: "scroll",
    },
  }[language];

  const badgePositions = [
    { x: "5%", y: "20%", delay: 0 },
    { x: "8%", y: "60%", delay: 0.5 },
    { x: "72%", y: "15%", delay: 0.3 },
    { x: "78%", y: "55%", delay: 0.8 },
    { x: "68%", y: "75%", delay: 1.2 },
    { x: "14%", y: "80%", delay: 0.6 },
    { x: "75%", y: "35%", delay: 1.5 },
    { x: "82%", y: "80%", delay: 0.4 },
  ];

  return (
    <section id="hero-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#0A0A0A" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", width: 600, height: 600, top: "-10%", left: "20%", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        <motion.div animate={{ x: [0, -25, 0], y: [0, 25, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} style={{ position: "absolute", width: 500, height: 500, bottom: "10%", right: "10%", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
      </div>

      <GridPattern />

      <div style={{ display: "none", pointerEvents: "none" }} className="badges-desktop">
        {techBadges.map((badge, index) => (
          <FloatingBadge key={badge.label} {...badge} {...badgePositions[index]} />
        ))}
      </div>

      <div id="hero-shell" style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900, padding: "0 2rem", paddingTop: 120 }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 100, padding: "6px 16px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
            <span style={{ fontSize: 13, color: "#60A5FA", fontWeight: 500 }}>{copy.available}</span>
            <Sparkles size={14} color="#60A5FA" />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#F9FAFB", marginBottom: "1.5rem" }}>
          {copy.titleStart}{" "}
          <span style={{ background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {copy.titleAccent}
          </span>
          <br />
          {copy.titleEnd}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#9CA3AF", lineHeight: 1.7, maxWidth: 760, margin: "0 auto 1.5rem" }}>
          {copy.subheadline}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }} style={{ fontSize: "1rem", color: "#6B7280", lineHeight: 1.8, maxWidth: 660, margin: "0 auto 2.5rem" }}>
          {copy.description}
        </motion.p>

        <motion.div id="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: "3rem", flexWrap: "wrap" }}>
          <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff", textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}>
            {copy.viewProjects} <ArrowRight size={16} />
          </a>
          <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#E5E7EB", textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600 }}>
            {copy.contactMe}
          </a>
        </motion.div>

        <motion.div id="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          <span style={{ color: "#4B5563", fontSize: 13 }}>{copy.findMe}</span>
          <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.1)" }} />
          {[
            { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
            { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
            { icon: Mail, href: SOCIAL_LINKS.email, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" title={label} style={{ display: "flex", alignItems: "center", color: "#6B7280", textDecoration: "none" }}>
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero-section {
            min-height: auto !important;
            padding-bottom: 56px;
          }

          #hero-actions {
            flex-direction: column;
            width: 100%;
            margin-bottom: 2rem !important;
          }

          #hero-actions a {
            width: min(100%, 320px);
            justify-content: center;
          }

          #hero-shell {
            padding-top: 144px !important;
          }

          #hero-socials {
            gap: 14px !important;
            padding-bottom: 8px;
          }
        }

        @media (min-width: 1024px) {
          .badges-desktop { display: block !important; }
        }
      `}</style>
    </section>
  );
}
