import { User } from "lucide-react";
import "./Header.css";
import { Link } from "react-router-dom";

// TODO: trocar pelo logo real quando tiver o arquivo
// import logo from "../assets/logo-sol.svg";
const logo = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="Morais Energia" className="header__logo" />

        <nav className="header__nav">
          <a href="#Hero">Sobre</a>
          <a href="#projetos">Projetos</a>
        </nav>

        <Link to="/login" className="header__user" aria-label="Área do cliente">
          <User size={18} />
        </Link>
      </div>

      <a href="#orcamento" className="header__cta">
        Faça um orçamento
      </a>
    </header>
  );
}