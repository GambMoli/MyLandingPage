import { stack } from "../../content/profile";
import { useLanguage } from "../i18n";

export function Stack() {
  const { language } = useLanguage();

  return (
    <section className="section" id="stack">
      <div className="wrap">
        <header className="section__head">
          <h2 className="section__title">Stack</h2>
          <p className="section__intro">
            {language === "es"
              ? "Lo que uso para construir software de producción. AWS aparece en casi todos los proyectos, del despliegue a la operación."
              : "What I use to build production software. AWS shows up in almost every project, from deployment to operations."}
          </p>
        </header>

        <div className="grid grid--stack">
          {stack.map((group) => (
            <div className="cell" key={group.group.en}>
              <h3 className="cell__title">{group.group[language]}</h3>
              <div className="tags">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
