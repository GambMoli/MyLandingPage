import { BOOKING_URL, socials } from "../../content/profile";
import { useLanguage } from "../i18n";

export function Footer() {
  const { language } = useLanguage();

  const copy = {
    es: {
      blurb: "Ingeniero de software full-stack. ERPs, integraciones y plataformas web en AWS.",
      sections: "Secciones",
      links: [
        { label: "Proyectos", href: "#work" },
        { label: "Servicios", href: "#services" },
        { label: "Experiencia", href: "#experience" },
        { label: "Contacto", href: "#contact" },
      ],
      elsewhere: "Encuéntrame",
      booking: "Agendar llamada",
      bot: "El asistente de esta página es un clasificador TF-IDF que corre en tu navegador.",
    },
    en: {
      blurb: "Full-stack software engineer. ERPs, integrations and web platforms on AWS.",
      sections: "Sections",
      links: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Experience", href: "#experience" },
        { label: "Contact", href: "#contact" },
      ],
      elsewhere: "Find me",
      booking: "Book a call",
      bot: "This page's assistant is a TF-IDF classifier running in your browser.",
    },
  }[language];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="brand" href="#top">
              <span className="brand__mark" aria-hidden="true">
                GM
              </span>
              Gabriel Molina
            </a>
            <p className="footer__blurb">{copy.blurb}</p>
          </div>
          <div className="footer__col">
            <h4>{copy.sections}</h4>
            <ul>
              {copy.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>{copy.elsewhere}</h4>
            <ul>
              {socials.map((social) => (
                <li key={social.id}>
                  <a href={social.href} {...(social.id === "email" ? {} : { target: "_blank", rel: "noreferrer" })}>
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {copy.booking}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Gabriel Molina</span>
          <span>{copy.bot}</span>
        </div>
      </div>
    </footer>
  );
}
