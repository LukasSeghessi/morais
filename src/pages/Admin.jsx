import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Admin() {
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      alert("Não foi possível sair da conta.");
      return;
    }

    navigate("/login");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <h1>Painel Administrativo</h1>

      <p>Você está logado como administrador.</p>

      <button onClick={handleLogout}>
        Sair
      </button>
    </main>
  );
}