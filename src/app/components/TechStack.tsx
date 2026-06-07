import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { useLanguage } from "../i18n";

const categories = [
  {
    name: "Frontend",
    color: "#61DAFB",
    techs: [
      { name: "Angular", icon: "A", level: 90, desc: "Enterprise SPAs" },
      { name: "Vue.js", icon: "V", level: 88, desc: "Reactive UIs" },
      { name: "React", icon: "R", level: 92, desc: "Component-driven" },
      { name: "Next.js", icon: "N", level: 85, desc: "Full-stack React" },
      { name: "TypeScript", icon: "TS", level: 93, desc: "Type-safe code" },
      { name: "JavaScript", icon: "JS", level: 95, desc: "Core scripting" },
      { name: "HTML5", icon: "H", level: 97, desc: "Semantic markup" },
      { name: "CSS3", icon: "C", level: 92, desc: "Modern styling" },
    ],
  },
  {
    name: "Backend",
    color: "#E0234E",
    techs: [
      { name: "NestJS", icon: "N", level: 88, desc: "Node.js framework" },
      { name: "Node.js", icon: "N", level: 90, desc: "Server runtime" },
      { name: "Spring Boot", icon: "S", level: 85, desc: "Java framework" },
      { name: "Java", icon: "J", level: 83, desc: "OOP & enterprise" },
      { name: ".NET", icon: ".N", level: 80, desc: "Microsoft stack" },
      { name: "Python", icon: "P", level: 88, desc: "Data & scripting" },
      { name: "FastAPI", icon: "F", level: 85, desc: "Modern Python API" },
      { name: "Express.js", icon: "E", level: 88, desc: "Minimal Node.js" },
    ],
  },
  {
    name: "Databases",
    color: "#336791",
    techs: [
      { name: "PostgreSQL", icon: "PG", level: 90, desc: "Relational DB" },
      { name: "MySQL", icon: "MY", level: 85, desc: "Relational DB" },
      { name: "MongoDB", icon: "MO", level: 82, desc: "NoSQL document" },
      { name: "AWS RDS", icon: "AWS", level: 84, desc: "Managed database" },
    ],
  },
  {
    name: "Cloud & DevOps",
    color: "#FF9900",
    techs: [
      { name: "AWS", icon: "AWS", level: 90, desc: "Cloud platform" },
      { name: "Docker", icon: "D", level: 88, desc: "Containerization" },
      { name: "GitHub Actions", icon: "GH", level: 85, desc: "CI/CD pipelines" },
      { name: "CI/CD", icon: "CI", level: 83, desc: "Automation" },
    ],
  },
  {
    name: "Tools",
    color: "#F59E0B",
    techs: [
      { name: "AWS", icon: "AWS", level: 90, desc: "Deployment workflows" },
      { name: "Git", icon: "G", level: 95, desc: "Version control" },
      { name: "GitHub", icon: "GH", level: 93, desc: "Code hosting" },
      { name: "Postman", icon: "PM", level: 90, desc: "API testing" },
      { name: "Jira", icon: "J", level: 88, desc: "Project mgmt" },
    ],
  },
];

function TechCard({
  tech,
  catColor,
  index,
}: {
  tech: { name: string; icon: string; level: number; desc: string };
  catColor: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(17,24,39,0.9)" : "rgba(17,24,39,0.5)",
        border: `1px solid ${hovered ? `${catColor}40` : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14,
        padding: "18px 20px",
        transition: "all 0.25s",
        boxShadow: hovered ? `0 0 24px ${catColor}15` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: catColor,
            minWidth: 32,
            fontFamily: "var(--font-mono)",
          }}
        >
          {tech.icon}
        </span>
        <div>
          <div style={{ color: "#F9FAFB", fontSize: 14, fontWeight: 600 }}>{tech.name}</div>
          <div style={{ color: "#6B7280", fontSize: 11, fontFamily: "var(--font-mono)" }}>{tech.desc}</div>
        </div>
      </div>

      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${tech.level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.04 + 0.3, ease: "easeOut" }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${catColor}, ${catColor}99)`,
            borderRadius: 2,
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
        <span style={{ color: "#4B5563", fontSize: 11, fontFamily: "var(--font-mono)" }}>{tech.level}%</span>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  const active = categories.find((category) => category.name === activeCategory)!;
  const copy = {
    es: {
      section: "02 / stack",
      title: "Tecnologías",
      subtitle:
        "Una selección de tecnologías que uso para construir software de producción, con AWS siempre presente en despliegue, arquitectura y operación.",
    },
    en: {
      section: "02 / stack",
      title: "Technology Stack",
      subtitle:
        "A curated set of technologies I use to build production-grade software, with AWS consistently present across deployment, architecture and operations.",
    },
  }[language];

  return (
    <section id="stack" style={{ padding: "120px 0", background: "#0A0A0A", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 100,
              padding: "5px 14px",
            }}
          >
            <span style={{ fontSize: 12, color: "#60A5FA", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
              {copy.section}
            </span>
          </div>
          <h2 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", marginBottom: 16 }}>
            {copy.title}
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
            {copy.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap", justifyContent: "center" }}
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              style={{
                background: activeCategory === category.name ? `${category.color}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  activeCategory === category.name ? `${category.color}40` : "rgba(255,255,255,0.08)"
                }`,
                color: activeCategory === category.name ? category.color : "#9CA3AF",
                borderRadius: 8,
                padding: "8px 18px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {active.techs.map((tech, index) => (
            <TechCard key={`${activeCategory}-${tech.name}`} tech={tech} catColor={active.color} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
