import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "../data/projects";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { id } = useParams();
  const [focusedPhoto, setFocusedPhoto] = useState(null);

  const project = PROJECTS.find((item) => item.id === id);

  useEffect(() => {
    if (!focusedPhoto) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setFocusedPhoto(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [focusedPhoto]);

  if (!project) {
    return (
      <main className="project-detail project-detail--not-found">
        <p>Projeto não encontrado.</p>
        <Link to="/projetos" className="project-detail__back-link">
          <ArrowLeft size={18} />
          Voltar para projetos
        </Link>
      </main>
    );
  }

  return (
    <main className="project-detail">
      <div className="project-detail__container">
        <Link to="/projetos" className="project-detail__back-link">
          <ArrowLeft size={18} />
          Voltar para projetos
        </Link>

        <h1 className="project-detail__title">{project.title}</h1>
        {project.location && (
          <p className="project-detail__location">{project.location}</p>
        )}

        <div className="project-detail__main-image">
          <img src={project.mainImage} alt={project.title} />
        </div>

        <h2 className="project-detail__section-title">Sobre o projeto</h2>
        <p className="project-detail__description">{project.description}</p>

        <div className="project-detail__stats">
          <div className="project-detail__stat-card">
            <p className="project-detail__stat-label">Potência</p>
            <p className="project-detail__stat-value">{project.power}</p>
          </div>
          <div className="project-detail__stat-card">
            <p className="project-detail__stat-label">Painéis</p>
            <p className="project-detail__stat-value">{project.panels}</p>
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <>
            <h2 className="project-detail__section-title">Mais fotos</h2>
            <div
              className={`project-detail__gallery project-detail__gallery--${Math.min(
                project.gallery.length,
                3,
              )}`}
            >
              {project.gallery.map((photo, index) => (
                <button
                  key={index}
                  type="button"
                  className="project-detail__gallery-item"
                  onClick={() => setFocusedPhoto(photo)}
                  aria-label={`Ampliar foto ${index + 1} de ${project.title}`}
                >
                  <img
                    src={photo}
                    alt={`${project.title} - foto ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {focusedPhoto && (
        <div
          className="project-detail__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          onClick={() => setFocusedPhoto(null)}
        >
          <button
            type="button"
            className="project-detail__lightbox-close"
            aria-label="Fechar foto ampliada"
            onClick={() => setFocusedPhoto(null)}
          >
            ×
          </button>
          <img
            src={focusedPhoto}
            alt={`${project.title} - foto ampliada`}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}