import { Code2, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../i18n";

const SOCIAL_LINKS = {
  github: "https://github.com/GambMoli",
  linkedin: "https://www.linkedin.com/in/gabriel-molina-ab1165281",
  email: "mailto:g.molinabor@gmail.com",
};

export function Footer() {
  const { language } = useLanguage();
  const copy = {
    es: {
      role: "Ingeniero de Software · Full-Stack Developer · Arquitecto de Software",
      quote: '"Convirtiendo ideas en soluciones de software escalables."',
      links: [
        { label: "Sobre mi", href: "#about" },
        { label: "Stack", href: "#stack" },
        { label: "Proyectos", href: "#projects" },
        { label: "Servicios", href: "#services" },
        { label: "Contacto", href: "#contact" },
      ],
      rights: "© 2024 Gabriel Molina. Todos los derechos reservados.",
      built: "Hecho con React · TypeScript · Tailwind CSS",
    },
    en: {
      role: "Software Engineer · Full-Stack Developer · Software Architect",
      quote: '"Turning ideas into scalable software solutions."',
      links: [
        { label: "About", href: "#about" },
        { label: "Stack", href: "#stack" },
        { label: "Projects", href: "#projects" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
      rights: "© 2024 Gabriel Molina. All rights reserved.",
      built: "Built with React · TypeScript · Tailwind CSS",
    },
  }[language];

  return (
    <footer
      style={{
        background: "#060606",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 0 40px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "center",
            marginBottom: 40,
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                G
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#F9FAFB",
                }}
              >
                Gabriel Molina
              </span>
            </div>
            <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6, maxWidth: 380 }}>
              {copy.role}
            </p>
            <p style={{ color: "#4B5563", fontSize: 13, marginTop: 8, fontStyle: "italic" }}>
              {copy.quote}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {copy.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "#6B7280",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
                { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
                { icon: Mail, href: SOCIAL_LINKS.email, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6B7280",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ color: "#374151", fontSize: 12, fontFamily: "var(--font-mono)" }}>
            {copy.rights}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#374151",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
            }}
          >
            <Code2 size={12} />
            {copy.built}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
