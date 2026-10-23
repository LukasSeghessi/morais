import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AdminRoute({ children }) {
  const [carregando, setCarregando] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function verificarAdmin() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setIsAdmin(false);
          return;
        }

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

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}