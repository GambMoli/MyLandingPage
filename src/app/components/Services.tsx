import { Cloud, Cpu, Database, Globe, LayoutDashboard, Package, Settings, Workflow, type LucideIcon } from "lucide-react";
import { services } from "../../content/profile";
import { useLanguage } from "../i18n";

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  package: Package,
  workflow: Workflow,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
  dashboard: LayoutDashboard,
  settings: Settings,
};

export function Services() {
  const { language } = useLanguage();

  return (
    <section className="section" id="services">
      <div className="wrap">
        <header className="section__head">
          <h2 className="section__title">{language === "es" ? "Qué puedo construir para ti" : "What I can build for you"}</h2>
          <p className="section__intro">
            {language === "es"
              ? "Desde un producto nuevo hasta la evolución de la plataforma que ya tienes."
              : "From a brand-new product to evolving the platform you already have."}
          </p>
        </header>

        <div className="grid">
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Globe;
            return (
              <div className="cell" key={service.title.en}>
                <div className="cell__icon">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="cell__title">{service.title[language]}</h3>
                <p className="cell__desc">{service.description[language]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
