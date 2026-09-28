import { experience, stats } from "../../content/profile";
import { useLanguage } from "../i18n";

export function Experience() {
  const { language } = useLanguage();

  return (
    <section className="section section--subtle" id="experience">
      <div className="wrap">
        <header className="section__head">
          <h2 className="section__title">{language === "es" ? "Experiencia" : "Experience"}</h2>
          <p className="section__intro">
            {language === "es"
              ? "Consultoría, producto y proyectos propios con clientes, casi siempre de punta a punta."
              : "Consulting, product work and my own client projects, almost always end to end."}
          </p>
        </header>

        <div className="stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label.en}>
              <div className="stat__value">{stat.value}</div>
              <div className="stat__label">{stat.label[language]}</div>
            </div>
          ))}
        </div>

        <div className="timeline">
          {experience.map((role) => (
            <article className="role" key={`${role.company.en}-${role.period.en}`}>
              <div className="role__logo" aria-hidden="true">
                {role.company[language].charAt(0)}
              </div>
              <div>
                <h3 className="role__title">{role.role[language]}</h3>
                <p className="role__company">{role.company[language]}</p>
                <p className="role__desc">{role.description[language]}</p>
                <div className="tags">
                  {role.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="role__period">{role.period[language]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
