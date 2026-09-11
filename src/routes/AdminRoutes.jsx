import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AdminRoute({ children }) {
  const [carregando, setCarregando] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function verificarAdmin() {
      try {
        // Verifica se existe um usuário autenticado
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setIsAdmin(false);
          return;
        }

        // Busca o usuário na nossa tabela
        const { data: usuario, error: usuarioError } = await supabase
          .from("usuarios")
          .select("tipo")
          .eq("auth_user_id", user.id)
          .single();

        if (usuarioError) {
          console.error("Erro ao verificar administrador:", usuarioError);
          setIsAdmin(false);
          return;
        }

        // Verifica se o tipo é admin
        if (usuario?.tipo === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
        setIsAdmin(false);
      } finally {
        setCarregando(false);
      }
    }

    verificarAdmin();
  }, []);

  // Enquanto verifica o usuário
  if (carregando) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Verificando acesso...</p>
      </main>
    );
  }

  // Se não for admin, volta para a página inicial
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Se for admin, permite acessar a página
  return children;
}