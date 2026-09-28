import { ArrowRight, Calendar } from "lucide-react";
import { BOOKING_URL } from "../../content/profile";
import { useLanguage } from "../i18n";
import { ChatPanel } from "./ChatPanel";

export const HERO_CHAT_ID = "hero-chat";

const TECH_STRIP = ["React", "Angular", "Vue.js", "Next.js", "NestJS", "Spring Boot", ".NET", "FastAPI", "PostgreSQL", "AWS", "Docker"];

export function Hero() {
  const { language } = useLanguage();

  const copy = {
    es: {
      status: "Disponible para proyectos nuevos",
      title: "Construyo el software que mueve tu negocio.",
      subtitle:
        "Soy Gabriel Molina, ingeniero de software full-stack. Hago ERPs, integraciones y plataformas web, desde la interfaz hasta el despliegue en AWS.",
      work: "Ver proyectos",
      call: "Agendar una llamada",
      strip: "Tecnologías con las que trabajo a diario",
    },
    en: {
      status: "Available for new projects",
      title: "I build the software that runs your business.",
      subtitle:
        "I'm Gabriel Molina, a full-stack software engineer. I build ERPs, integrations and web platforms, from the interface to the deployment on AWS.",
      work: "See my work",
      call: "Book a call",
      strip: "Technologies I work with every day",
    },
  }[language];

  return (
    <>
      <section className="hero" id="top">
        <div className="wrap hero__inner">
          <span className="pill">
            <span className="dot" aria-hidden="true" />
            {copy.status}
          </span>
          <h1 className="hero__title">{copy.title}</h1>
          <p className="hero__subtitle">{copy.subtitle}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#work">
              {copy.work}
              <ArrowRight size={16} />
            </a>
            <a className="btn btn--secondary" href={BOOKING_URL} target="_blank" rel="noreferrer">
              <Calendar size={16} />
              {copy.call}
            </a>
          </div>
          <div className="hero__chat">
            <ChatPanel id={HERO_CHAT_ID} />
          </div>
        </div>
      </section>

      <div className="logos">
        <div className="wrap">
          <p className="logos__label">{copy.strip}</p>
          <ul className="logos__list">
            {TECH_STRIP.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
