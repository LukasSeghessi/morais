import { User } from "lucide-react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const logo =
  "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

export default function Header() {
  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate();

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
    supabase.auth.getUser().then(({ data: { user } }) => {
      carregarUsuario(user);
    });

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      return;
    }

    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__left">

        <img
          src={logo}
          alt="Morais Energia"
          className="header__logo"
        />

        <nav className="header__nav">
          <Link to="/#sobre">Sobre</Link>

          <Link to="/projetos">
            Projetos
          </Link>
        </nav>

        {usuario ? (
          <div className="header__user-area">

            <div className="header__user header__user--logged">
              <User size={18} />

              <span>
                {usuario.nome}
              </span>
            </div>

            <button
              type="button"
              className="header__logout"
              onClick={handleLogout}
            >
              Sair
            </button>

          </div>
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

      <a
        href="https://api.whatsapp.com/send/?phone=5516997440950&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+energia+solar.&type=phone_number&app_absent=0"
        className="header__cta"
      >
        Faça um orçamento
      </a>
    </header>
  );
}