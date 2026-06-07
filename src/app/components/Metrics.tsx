import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n";

function useCountUp(target: number, duration: number, isInView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return count;
}

const metrics = {
  es: [
    { value: 4, suffix: "+", label: "Anos de experiencia profesional", sub: "Construyendo software de produccion", color: "#3B82F6", bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.15)" },
    { value: 20, suffix: "+", label: "Proyectos entregados", sub: "Desde MVP hasta nivel enterprise", color: "#8B5CF6", bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.15)" },
    { value: 10, suffix: "+", label: "Integraciones empresariales", sub: "APIs, ERPs y servicios cloud", color: "#06B6D4", bg: "rgba(6,182,212,0.06)", border: "rgba(6,182,212,0.15)" },
    { value: 15, suffix: "+", label: "Tecnologias dominadas", sub: "Frontend, backend, cloud e IA", color: "#10B981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.15)" },
    { value: 20, suffix: "+", label: "Despliegues cloud", sub: "AWS, Docker y CI/CD", color: "#F59E0B", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.15)" },
    { value: 100, suffix: "%", label: "Entrega end-to-end", sub: "Idea a arquitectura y produccion", color: "#EF4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.15)" },
  ],
  en: [
    { value: 4, suffix: "+", label: "Years of professional experience", sub: "Building production software", color: "#3B82F6", bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.15)" },
    { value: 20, suffix: "+", label: "Projects delivered", sub: "From MVP to enterprise grade", color: "#8B5CF6", bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.15)" },
    { value: 10, suffix: "+", label: "Enterprise integrations", sub: "APIs, ERPs and cloud services", color: "#06B6D4", bg: "rgba(6,182,212,0.06)", border: "rgba(6,182,212,0.15)" },
    { value: 15, suffix: "+", label: "Technologies mastered", sub: "Frontend, backend, cloud and AI", color: "#10B981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.15)" },
    { value: 5, suffix: "+", label: "Cloud deployments", sub: "AWS, Docker and CI/CD", color: "#F59E0B", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.15)" },
    { value: 100, suffix: "%", label: "End-to-end delivery", sub: "Idea to architecture to production", color: "#EF4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.15)" },
  ],
};

function MetricCard({ metric, index }: { metric: (typeof metrics)["es"][0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(metric.value, 1500, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        background: metric.bg,
        border: `1px solid ${metric.border}`,
        borderRadius: 20,
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, background: `radial-gradient(circle, ${metric.color}15 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(20px)", pointerEvents: "none" }} />

      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1, color: metric.color, marginBottom: 12, letterSpacing: "-0.03em" }}>
        {count}
        {metric.suffix}
      </div>

      <div style={{ color: "#F9FAFB", fontSize: 16, fontWeight: 600, marginBottom: 6, fontFamily: "var(--font-display)" }}>{metric.label}</div>
      <div style={{ color: "#6B7280", fontSize: 13 }}>{metric.sub}</div>
    </motion.div>
  );
}

export function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  const copy = {
    es: {
      section: "05 / experiencia",
      title: "Experiencia de un vistazo",
      subtitle: "Numeros que reflejan impacto real en proyectos, tecnologias y despliegues.",
    },
    en: {
      section: "05 / experience",
      title: "Experience at a Glance",
      subtitle: "Numbers that reflect real impact across projects, technologies and deployments.",
    },
  }[language];

  const currentMetrics = metrics[language];

  return (
    <section style={{ padding: "120px 0", background: "#0A0A0A", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "5px 14px" }}>
            <span style={{ fontSize: 12, color: "#60A5FA", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{copy.section}</span>
          </div>
          <h2 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", marginBottom: 16 }}>{copy.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{copy.subtitle}</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {currentMetrics.map((metric, index) => (
            <MetricCard key={`${metric.label}-${index}`} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
