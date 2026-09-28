import { useEffect, useState } from "react";
import { useLanguage } from "../i18n";

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copy = {
    es: {
      links: [
        { label: "Proyectos", href: "#work" },
        { label: "Servicios", href: "#services" },
        { label: "Experiencia", href: "#experience" },
        { label: "Stack", href: "#stack" },
      ],
      cta: "Contactar",
      skip: "Saltar al contenido",
    },
    en: {
      links: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Experience", href: "#experience" },
        { label: "Stack", href: "#stack" },
      ],
      cta: "Contact",
      skip: "Skip to content",
    },
  }[language];

  return (
    <header className="nav" data-scrolled={scrolled}>
      <a className="skip" href="#main">
        {copy.skip}
      </a>
      <div className="wrap nav__inner">
        <a className="brand" href="#top" aria-label="Gabriel Molina">
          <span className="brand__mark" aria-hidden="true">
            GM
          </span>
          <span className="brand__name">Gabriel Molina</span>
        </a>
        <nav className="nav__links" aria-label={language === "es" ? "Secciones" : "Sections"}>
          {copy.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <div className="segmented" role="group" aria-label={language === "es" ? "Idioma" : "Language"}>
            {(["es", "en"] as const).map((lang) => (
              <button key={lang} type="button" aria-pressed={language === lang} onClick={() => setLanguage(lang)}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn btn--primary btn--sm" href="#contact">
            {copy.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
