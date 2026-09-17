import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { ArrowLeft } from "lucide-react";
import "./Projects.css";

export default function Projects() {
  return (
    <main className="projects-page">
      <Link to="/" className="voltar">
            <ArrowLeft size={20} />
            Voltar ao Início
          </Link>
      <section className="projects-page__hero">
        <h1 className="projects-page__title">Projetos</h1>
        <p className="projects-page__subtitle">
          realizados por nós
        </p>
        <p className="projects-page__description">
          Conheça alguns dos projetos que já realizamos para nossos clientes.
        </p>
</section>

      <section className="projects-page__grid">
        {PROJECTS.map((project, index) => (
          <Link
            key={project.id}
            to={`/projetos/${project.id}`}
            className="projects-page__card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="projects-page__image-frame">
              <img src={project.mainImage} alt={project.title} />
            </div>
            <h3 className="projects-page__card-title">{project.title}</h3>
            <p className="projects-page__card-description">
              {project.description}
            </p>
          </Link>
        ))}
      </section>

      <section className="section-about">
        
      <div className="about">
        <p className="about-bold">Energia que</p>
        <p className="about-script">gera economia</p>

        <p className="desc">
        Projetos pensados para gerar
       mais eficiência e economia.
      </p>
      <a href="https://api.whatsapp.com/send/?phone=5516997440950&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+energia+solar.&type=phone_number&app_absent=0" className="services__cta" target="_blank">
        Faça um orçamento
      </a>
      </div>

      
      </section>
    </main>
  );
}