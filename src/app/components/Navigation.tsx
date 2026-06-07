import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useLanguage } from "../i18n";

const SOCIAL_LINKS = {
  github: "https://github.com/GambMoli",
  linkedin: "https://www.linkedin.com/in/gabriel-molina-ab1165281",
  email: "mailto:g.molinabor@gmail.com",
};

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const copy = {
    es: {
      links: [
        { label: "Sobre mi", href: "#about" },
        { label: "Stack", href: "#stack" },
        { label: "Proyectos", href: "#projects" },
        { label: "Servicios", href: "#services" },
        { label: "Contacto", href: "#contact" },
      ],
      cta: "Contactame",
    },
    en: {
      links: [
        { label: "About", href: "#about" },
        { label: "Stack", href: "#stack" },
        { label: "Projects", href: "#projects" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
      cta: "Contact me",
    },
  }[language];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        backgroundColor:
          scrolled || menuOpen ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom:
          scrolled || menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#F9FAFB" }}>
                Gabriel<span style={{ color: "#3B82F6" }}>.</span>
              </span>
            </div>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
            {copy.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "#9CA3AF",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "6px 14px",
                  borderRadius: 8,
                  transition: "all 0.2s",
                  fontFamily: "var(--font-body)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden-mobile">
            <div style={{ display: "flex", gap: 6 }}>
              {(["es", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: language === lang ? "rgba(59,130,246,0.18)" : "transparent",
                    color: language === lang ? "#F9FAFB" : "#6B7280",
                    borderRadius: 8,
                    padding: "6px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {[
              { icon: Github, href: SOCIAL_LINKS.github },
              { icon: Linkedin, href: SOCIAL_LINKS.linkedin },
              { icon: Mail, href: SOCIAL_LINKS.email },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#6B7280",
                  textDecoration: "none",
                  padding: 8,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon size={18} />
              </a>
            ))}

            <a
              href="#contact"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                color: "#fff",
                textDecoration: "none",
                padding: "8px 20px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
              }}
            >
              {copy.cta}
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "#F9FAFB", cursor: "pointer", display: "none" }}
            className="show-mobile"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              padding: "1rem 0 1.2rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              background: "rgba(10,10,10,0.96)",
              maxHeight: "calc(100vh - 68px)",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {(["es", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: language === lang ? "rgba(59,130,246,0.18)" : "transparent",
                    color: language === lang ? "#F9FAFB" : "#6B7280",
                    borderRadius: 8,
                    padding: "6px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {copy.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "#9CA3AF",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 12,
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                textAlign: "center",
              }}
            >
              {copy.cta}
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
