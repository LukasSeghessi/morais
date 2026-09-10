import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "../data/projects";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  // useParams le o valor que esta na URL. Se a rota e "/projetos/:id"
  // e o usuario acessa "/projetos/2", entao id vai ser a string "2".
  const { id } = useParams();

  const project = PROJECTS.find((item) => item.id === id);

  // Se ninguem encontrar esse id (ex: usuario digitou uma URL errada),
  // mostra uma mensagem simples em vez de quebrar a pagina.
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
            <div className="project-detail__gallery">
              {project.gallery.map((photo, index) => (
                <div key={index} className="project-detail__gallery-item">
                  <img
                    src={photo}
                    alt={`${project.title} - foto ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}