import { User } from "lucide-react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const logo =
  "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

export default function Header() {
  const [usuario, setUsuario] = useState(null);

  async function carregarUsuario(user) {
    if (!user) {
      setUsuario(null);
      return;
    }

    const { data, error } = await supabase
      .from("usuarios")
      .select("nome, email")
      .eq("email", user.email)
      .single();

    if (error) {
      console.error("Erro ao buscar usuário:", error);
      setUsuario(null);
      return;
    }

    console.log("USUÁRIO ENCONTRADO:", data);

    setUsuario(data);
  }

  useEffect(() => {
    // Verifica se já existe alguém logado
    supabase.auth.getUser().then(({ data: { user } }) => {
      carregarUsuario(user);
    });

    // Monitora login e logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("EVENTO AUTH:", event);

      if (session?.user) {
        await carregarUsuario(session.user);
      } else {
        setUsuario(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="header">
      <div className="header__left">

        <img
          src={logo}
          alt="Morais Energia"
          className="header__logo"
        />

        <nav className="header__nav">
          <a href="#Hero">Sobre</a>
          <Link to="/projetos">Projetos</Link>
        </nav>

        {usuario ? (
          <Link
            to="/perfil"
            className="header__user header__user--logged"
          >
            <User size={18} />

            <span>
              {usuario.nome}
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="header__user"
            aria-label="Área do cliente"
          >
            <User size={18} />
          </Link>
        )}

      </div>

      <a href="#orcamento" className="header__cta">
        Faça um orçamento
      </a>
    </header>
  );
}