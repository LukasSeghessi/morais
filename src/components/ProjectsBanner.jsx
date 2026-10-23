import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./ProjectsBanner.css";

const roofImg = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/placa_1.jpg";

export default function ProjectsBanner() {
  return (
    <section className="projects-banner">
      <div className="projects-banner__card" data-aos="fade-up">
        <div className="projects-banner__image-frame">
          <img src={roofImg} alt="Telhado com paineis solares instalados" />
        </div>

        <div className="projects-banner__content">
          <span className="projects-banner__line" />

          <h2 className="projects-banner__title">
            <span className="projects-banner__title--navy">Projetos</span>
            <span className="projects-banner__title--gold">
              realizados por nós
            </span>
          </h2>

          <p className="projects-banner__subtitle">
            Conheça algumas das instalações realizadas pela nossa equipe e
            veja como podemos transformar a sua energia.
          </p>

          <Link to="/projetos" className="projects-banner__cta">
            Ver projetos
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}