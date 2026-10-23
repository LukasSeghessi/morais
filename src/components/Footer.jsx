import "./Footer.css";
import { Link } from "react-router-dom";

const logo = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <img src={logo} alt="Morais Energia" className="footer__logo" />
          <p className="footer__tagline">
            Soluções em energia solar e projetos elétricos, com qualidade e
            confiança desde 2015.
          </p>
        </div>

        <div className="footer__column">
          <p className="footer__column-title">Navegação</p>
          <Link to="/#sobre">Sobre</Link>
          <Link to="/projetos">
            Projetos
          </Link>
         
          <a href="https://api.whatsapp.com/send/?phone=5516997440950&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+energia+solar.&type=phone_number&app_absent=0">Faça um orçamento</a>
        </div>

        <div className="footer__column">
          <p className="footer__column-title">Contato</p>
          <a href="tel:+5516997440950">(16) 99744-0950</a>
          <a href="mailto:contato@moraisenergia.com.br">
            contato@moraisenergia.com.br
          </a>
          <p className="footer__address">Jaboticabal - SP</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {CURRENT_YEAR} Morais Energia. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}