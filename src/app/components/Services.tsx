import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Cloud,
  Cpu,
  Database,
  Globe,
  LayoutDashboard,
  Package,
  Settings,
  Workflow,
  Zap,
} from "lucide-react";
import { useLanguage } from "../i18n";

const services = {
  es: [
    {
      icon: Globe,
      title: "Plataformas SaaS",
      description: "Productos SaaS full-stack desde la idea hasta el lanzamiento, con usuarios, pagos y arquitectura escalable.",
      color: "#3B82F6",
      tags: ["Multi-tenant", "Suscripciones", "Analitica"],
    },
    {
      icon: Package,
      title: "Sistemas ERP",
      description: "Soluciones ERP a medida para inventario, finanzas, RRHH y flujos operativos.",
      color: "#8B5CF6",
      tags: ["Inventario", "Finanzas", "Modulos HR"],
    },
    {
      icon: Workflow,
      title: "Integraciones empresariales",
      description: "Integracion entre terceros, APIs, ERPs y servicios cloud usando middleware moderno.",
      color: "#06B6D4",
      tags: ["REST APIs", "Webhooks", "ETL"],
    },
    {
      icon: Database,
      title: "APIs y backends",
      description: "APIs REST y GraphQL escalables, documentadas y con autenticacion, validacion y reglas de negocio.",
      color: "#10B981",
      tags: ["OpenAPI", "JWT", "Rate Limiting"],
    },
    {
      icon: Cloud,
      title: "Aplicaciones cloud",
      description: "Aplicaciones desplegadas en AWS con escalado, monitoreo, CI/CD e infraestructura como codigo.",
      color: "#F59E0B",
      tags: ["AWS", "Docker", "Terraform"],
    },
    {
      icon: Cpu,
      title: "Plataformas de IA",
      description: "Aplicaciones con modelos, pipelines de datos, automatizacion inteligente y dashboards.",
      color: "#EF4444",
      tags: ["Machine Learning", "Python", "FastAPI"],
    },
    {
      icon: LayoutDashboard,
      title: "Dashboards administrativos",
      description: "Paneles internos con tablas, filtros, graficas y control por roles.",
      color: "#EC4899",
      tags: ["React", "Charts", "RBAC"],
    },
    {
      icon: Settings,
      title: "Automatizacion de negocio",
      description: "Workflows que eliminan procesos manuales, reducen errores y mejoran eficiencia operativa.",
      color: "#A78BFA",
      tags: ["Workflows", "Cron Jobs", "Bots"],
    },
    {
      icon: Zap,
      title: "Software a medida",
      description: "Soluciones construidas desde cero segun los requerimientos reales del negocio.",
      color: "#34D399",
      tags: ["Discovery", "Arquitectura", "Desarrollo"],
    },
  ],
  en: [
    {
      icon: Globe,
      title: "SaaS Platforms",
      description: "Full-stack SaaS products from idea to launch, with users, billing and scalable architecture.",
      color: "#3B82F6",
      tags: ["Multi-tenant", "Subscriptions", "Analytics"],
    },
    {
      icon: Package,
      title: "ERP Systems",
      description: "Custom ERP solutions covering inventory, finance, HR and operational workflows.",
      color: "#8B5CF6",
      tags: ["Inventory", "Finance", "HR Modules"],
    },
    {
      icon: Workflow,
      title: "Enterprise Integrations",
      description: "Integration across third parties, APIs, ERPs and cloud services using modern middleware.",
      color: "#06B6D4",
      tags: ["REST APIs", "Webhooks", "ETL"],
    },
    {
      icon: Database,
      title: "APIs and Backends",
      description: "Scalable REST and GraphQL APIs with authentication, validation and business logic.",
      color: "#10B981",
      tags: ["OpenAPI", "JWT", "Rate Limiting"],
    },
    {
      icon: Cloud,
      title: "Cloud Applications",
      description: "Applications deployed on AWS with scaling, monitoring, CI/CD and infrastructure as code.",
      color: "#F59E0B",
      tags: ["AWS", "Docker", "Terraform"],
    },
    {
      icon: Cpu,
      title: "AI Platforms",
      description: "Applications with models, data pipelines, intelligent automation and dashboards.",
      color: "#EF4444",
      tags: ["Machine Learning", "Python", "FastAPI"],
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboards",
      description: "Internal dashboards with tables, filters, charts and role-based access.",
      color: "#EC4899",
      tags: ["React", "Charts", "RBAC"],
    },
    {
      icon: Settings,
      title: "Business Automation",
      description: "Workflows that remove manual processes, reduce errors and improve operational efficiency.",
      color: "#A78BFA",
      tags: ["Workflows", "Cron Jobs", "Bots"],
    },
    {
      icon: Zap,
      title: "Custom Software",
      description: "Solutions built from scratch around real business requirements.",
      color: "#34D399",
      tags: ["Discovery", "Architecture", "Development"],
    },
  ],
};

function ServiceCard({ service, index }: { service: (typeof services)["es"][0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(17,24,39,0.9)" : "rgba(17,24,39,0.5)",
        border: `1px solid ${hovered ? `${service.color}35` : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16,
        padding: "28px 28px 24px",
        transition: "all 0.3s",
        backdropFilter: "blur(12px)",
        boxShadow: hovered ? `0 0 40px ${service.color}12` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {hovered ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 120,
            height: 120,
            background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
      ) : null}

      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${service.color}15`,
          border: `1px solid ${service.color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <Icon size={22} color={service.color} />
      </div>

      <h4 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
        {service.title}
      </h4>
      <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>{service.description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: `${service.color}10`,
              border: `1px solid ${service.color}20`,
              color: service.color,
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 100,
              fontFamily: "var(--font-mono)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  const copy = {
    es: {
      section: "04 / servicios",
      title: "Lo que construyo",
      subtitle: "Desde productos SaaS hasta integraciones empresariales: desarrollo completo a lo largo de todo el stack.",
    },
    en: {
      section: "04 / services",
      title: "What I Build",
      subtitle: "From SaaS products to enterprise integrations: complete development across the full stack.",
    },
  }[language];

  const currentServices = services[language];

  return (
    <section id="services" style={{ padding: "120px 0", background: "#050505", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.05) 0%, transparent 100%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 100, padding: "5px 14px" }}>
            <span style={{ fontSize: 12, color: "#A78BFA", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{copy.section}</span>
          </div>
          <h2 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", marginBottom: 16 }}>{copy.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{copy.subtitle}</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {currentServices.map((service, index) => (
            <ServiceCard key={`${service.title}-${index}`} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
