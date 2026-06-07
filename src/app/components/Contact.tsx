import { motion } from "motion/react";
import { useInView } from "motion/react";
import { ArrowRight, Calendar, Github, Linkedin, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "../i18n";

const SOCIAL_LINKS = {
  github: "https://github.com/GambMoli",
  linkedin: "https://www.linkedin.com/in/gabriel-molina-ab1165281",
  email: "mailto:g.molinabor@gmail.com",
  booking: "https://cal.com/gabriel-molina-h3zrjf/30min",
};

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const { language } = useLanguage();

  const copy = {
    es: {
      section: "06 / contacto",
      title: "Construyamos algo increible",
      subtitle: "Si quieres desarrollar software escalable o un producto digital solido, hablemos.",
      ready: "Listo para trabajar juntos?",
      readyText:
        "Puedo ayudarte con un producto desde cero, una integracion empresarial o la evolucion de tu plataforma actual.",
      call: "Agendar llamada de 30 min",
      sent: "Mensaje enviado",
      sentText: "Tu mensaje ya fue enviado a mi correo.",
      error: "No pude enviar el mensaje. Intenta de nuevo en un momento.",
      name: "NOMBRE *",
      email: "EMAIL *",
      company: "EMPRESA",
      description: "DESCRIPCION DEL PROYECTO *",
      companyPlaceholder: "Tu empresa (opcional)",
      messagePlaceholder: "Cuentame sobre tu proyecto, objetivos, tiempos y requerimientos tecnicos...",
      send: "Enviar mensaje",
      sending: "Enviando...",
    },
    en: {
      section: "06 / contact",
      title: "Let's Build Something Amazing",
      subtitle: "If you want to build scalable software or a solid digital product, let's talk.",
      ready: "Ready to work together?",
      readyText:
        "I can help you with a product from scratch, an enterprise integration, or the evolution of your current platform.",
      call: "Schedule a 30-min Call",
      sent: "Message sent",
      sentText: "Your message was sent to my inbox.",
      error: "I could not send the message. Please try again in a moment.",
      name: "NAME *",
      email: "EMAIL *",
      company: "COMPANY",
      description: "PROJECT DESCRIPTION *",
      companyPlaceholder: "Your company (optional)",
      messagePlaceholder: "Tell me about your project, goals, timeline and tech requirements...",
      send: "Send message",
      sending: "Sending...",
    },
  }[language];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const details =
          payload?.details || payload?.error || "Contact request failed";
        throw new Error(details);
      }

      setSubmitted(true);
      setForm({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : copy.error;
      setError(`${copy.error} ${message}`);
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    color: "#F9FAFB",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <section id="contact" style={{ padding: "120px 0", background: "#050505", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 2rem" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "5px 14px" }}>
            <span style={{ fontSize: 12, color: "#60A5FA", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{copy.section}</span>
          </div>
          <h2 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", marginBottom: 16 }}>{copy.title}</h2>
          <p style={{ color: "#6B7280", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{copy.subtitle}</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }} className="contact-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <h4 style={{ color: "#F9FAFB", fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 16 }}>{copy.ready}</h4>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>{copy.readyText}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {[
                { icon: Mail, label: "g.molinabor@gmail.com", href: SOCIAL_LINKS.email, color: "#3B82F6" },
                { icon: Github, label: "github.com/GambMoli", href: SOCIAL_LINKS.github, color: "#9CA3AF" },
                { icon: Linkedin, label: "linkedin.com/in/gabriel-molina-ab1165281", href: SOCIAL_LINKS.linkedin, color: "#0A66C2" },
              ].map(({ icon: Icon, label, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", color: "#9CA3AF", fontSize: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color={color} />
                  </div>
                  <span>{label}</span>
                  <ArrowRight size={14} style={{ marginLeft: "auto", opacity: 0.4 }} />
                </a>
              ))}
            </div>

            <a href={SOCIAL_LINKS.booking} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderRadius: 12, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", textDecoration: "none", color: "#A78BFA", fontSize: 14, fontWeight: 600 }}>
              <Calendar size={18} />
              {copy.call}
              <ArrowRight size={14} style={{ marginLeft: "auto" }} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ background: "rgba(17,24,39,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 32px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>OK</div>
                  <h4 style={{ color: "#10B981", fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8 }}>{copy.sent}</h4>
                  <p style={{ color: "#6B7280", fontSize: 14 }}>{copy.sentText}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 600, marginBottom: 6, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>{copy.name}</label>
                      <input required type="text" placeholder="John Smith" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 600, marginBottom: 6, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>{copy.email}</label>
                      <input required type="email" placeholder="john@company.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 600, marginBottom: 6, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>{copy.company}</label>
                    <input type="text" placeholder={copy.companyPlaceholder} value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} style={inputStyle} />
                  </div>

                  <div>
                    <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 600, marginBottom: 6, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>{copy.description}</label>
                    <textarea required rows={5} placeholder={copy.messagePlaceholder} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 120 }} />
                  </div>

                  {error ? <p style={{ color: "#F87171", fontSize: 13, margin: 0 }}>{error}</p> : null}

                  <button type="submit" disabled={sending} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff", border: "none", cursor: sending ? "wait" : "pointer", padding: "14px 24px", borderRadius: 10, fontSize: 15, fontWeight: 600, opacity: sending ? 0.7 : 1 }}>
                    <Send size={16} />
                    {sending ? copy.sending : copy.send}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
