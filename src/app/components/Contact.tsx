import { Briefcase, Calendar, Clock, Github, Globe2, Instagram, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { BOOKING_URL, CONTACT_EMAIL, socials } from "../../content/profile";
import { useLanguage } from "../i18n";
import { Avatar } from "./Avatar";

const EMPTY_FORM = { name: "", email: "", company: "", message: "" };

const SOCIAL_ICONS: Record<string, LucideIcon> = { github: Github, linkedin: Linkedin, instagram: Instagram, email: Mail };

export function Contact() {
  const { language } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const copy = {
    es: {
      title: "Hablemos de tu proyecto",
      intro: "Cuéntame qué quieres construir o qué hay que mejorar en tu plataforma actual. Te respondo personalmente.",
      role: "Ingeniero de software full-stack",
      facts: ["Disponible para proyectos nuevos", "Trabajo en remoto", "Más de 4 años en producción"],
      booking: "Agendar llamada de 30 min",
      formTitle: "Envíame un mensaje",
      name: "Nombre",
      email: "Email",
      company: "Empresa",
      optional: "(opcional)",
      message: "Qué necesitas",
      messagePlaceholder: "Objetivo, plazos y cualquier detalle técnico que ya tengas claro",
      send: "Enviar mensaje",
      sending: "Enviando…",
      sent: "Mensaje enviado. Te respondo a tu correo.",
      error: `No se pudo enviar. Vuelve a intentarlo o escríbeme a ${CONTACT_EMAIL}.`,
    },
    en: {
      title: "Let's talk about your project",
      intro: "Tell me what you want to build or what needs fixing in your current platform. I reply personally.",
      role: "Full-stack software engineer",
      facts: ["Available for new projects", "Works remotely", "Over 4 years in production"],
      booking: "Book a 30-min call",
      formTitle: "Send me a message",
      name: "Name",
      email: "Email",
      company: "Company",
      optional: "(optional)",
      message: "What you need",
      messagePlaceholder: "Goal, timeline and any technical details you already know",
      send: "Send message",
      sending: "Sending…",
      sent: "Message sent. I'll reply to your email.",
      error: `The message couldn't be sent. Try again or email me at ${CONTACT_EMAIL}.`,
    },
  }[language];

  const factIcons = [Briefcase, Globe2, Clock];

  const update = (field: keyof typeof EMPTY_FORM) => (event: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.details || payload?.error || `HTTP ${response.status}`);
      }

      setForm(EMPTY_FORM);
      setStatus("sent");
    } catch (error) {
      console.error("Contact form failed", error);
      setStatus("error");
    }
  };

  return (
    <section className="section section--subtle" id="contact">
      <div className="wrap">
        <header className="section__head">
          <h2 className="section__title">{copy.title}</h2>
          <p className="section__intro">{copy.intro}</p>
        </header>

        <div className="contact">
          <aside className="card host">
            <div className="host__top">
              <Avatar size={64} />
              <div>
                <p className="host__name">Gabriel Molina</p>
                <p className="host__role">{copy.role}</p>
              </div>
            </div>
            <ul className="host__facts">
              {copy.facts.map((fact, index) => {
                const Icon = factIcons[index];
                return (
                  <li key={fact}>
                    <Icon size={18} strokeWidth={1.75} />
                    {fact}
                  </li>
                );
              })}
            </ul>
            <a className="btn btn--primary" href={BOOKING_URL} target="_blank" rel="noreferrer">
              <Calendar size={16} />
              {copy.booking}
            </a>
            <div className="host__links">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.id] ?? Globe2;
                return (
                  <a
                    key={social.id}
                    className="link-row"
                    href={social.href}
                    {...(social.id === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                    {social.label}
                    <span>{social.handle}</span>
                  </a>
                );
              })}
            </div>
          </aside>

          <div className="card">
            <h3 className="form__title">{copy.formTitle}</h3>
            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="contact-name">{copy.name}</label>
                <input id="contact-name" required autoComplete="name" value={form.name} onChange={update("name")} />
              </div>
              <div className="field">
                <label htmlFor="contact-email">{copy.email}</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
              <div className="field field--wide">
                <label htmlFor="contact-company">
                  {copy.company} <small>{copy.optional}</small>
                </label>
                <input
                  id="contact-company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={update("company")}
                />
              </div>
              <div className="field field--wide">
                <label htmlFor="contact-message">{copy.message}</label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  placeholder={copy.messagePlaceholder}
                  value={form.message}
                  onChange={update("message")}
                />
              </div>
              <div className="form__foot">
                <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                  {status === "sending" ? copy.sending : copy.send}
                </button>
                <p
                  className="form__status"
                  role="status"
                  data-kind={status === "error" ? "error" : status === "sent" ? "ok" : undefined}
                >
                  {status === "sent" ? copy.sent : status === "error" ? copy.error : null}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
