import { ArrowUpRight, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../../content/profile";
import { useLanguage } from "../i18n";

export function Projects() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const copy = {
    es: {
      title: "Proyectos destacados",
      intro: "Productos que construí para resolver problemas reales de operación, automatización, analítica e inteligencia artificial.",
      details: "Ver detalle",
      features: "Qué incluye",
      talk: "Hablemos de un proyecto así",
      close: "Cerrar",
      shot: "Captura de",
    },
    en: {
      title: "Featured work",
      intro: "Products I built to solve real problems in operations, automation, analytics and artificial intelligence.",
      details: "View details",
      features: "What's included",
      talk: "Let's talk about a project like this",
      close: "Close",
      shot: "Screenshot of",
    },
  }[language];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <section className="section" id="work">
      <div className="wrap">
        <header className="section__head">
          <h2 className="section__title">{copy.title}</h2>
          <p className="section__intro">{copy.intro}</p>
        </header>

        <div className="projects">
          {projects.map((project) => (
            <button type="button" className="project" key={project.id} onClick={() => setSelected(project)}>
              <div className="project__media">
                <img
                  src={project.image}
                  alt={`${copy.shot} ${project.title[language].toLowerCase()}`}
                  loading="lazy"
                  width={1600}
                  height={1000}
                />
                <span className="project__badge">{project.category[language]}</span>
              </div>
              <div>
                <div className="project__row">
                  <h3 className="project__title">{project.title[language]}</h3>
                  <span className="project__more">
                    {copy.details}
                    <ArrowUpRight size={15} />
                  </span>
                </div>
                <p className="project__desc">{project.description[language]}</p>
                <div className="tags">
                  {project.techs.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="project-modal-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          // Clic en el fondo (fuera del contenido) cierra el modal.
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        {selected ? (
          <>
            <div className="modal__media">
              <img src={selected.image} alt={`${copy.shot} ${selected.title[language].toLowerCase()}`} />
              <button type="button" className="modal__close" onClick={() => setSelected(null)} aria-label={copy.close}>
                <X size={18} />
              </button>
            </div>
            <div className="modal__body">
              <p className="modal__category">{selected.category[language]}</p>
              <h3 className="modal__title" id="project-modal-title">
                {selected.title[language]}
              </h3>
              <p className="modal__desc">{selected.description[language]}</p>
              <ul className="modal__list" aria-label={copy.features}>
                {selected.highlights[language].map((point) => (
                  <li key={point}>
                    <Check size={18} />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="modal__foot">
                <div className="tags">
                  {selected.techs.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a className="btn btn--primary" href="#contact" onClick={() => setSelected(null)}>
                  {copy.talk}
                </a>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </section>
  );
}
