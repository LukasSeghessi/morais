import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

import "./Admin.css";
import "./AdminUpdate.css";

const logo =
  "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

export default function AdminUpdate() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "user",
    senha: "",
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    setCarregando(true);

    const { data, error } = await supabase
      .from("usuarios")
      .select("id, nome, email, telefone, tipo, auth_user_id")
      .order("id", { ascending: true });

    if (error) {
      console.error("Erro ao buscar usuarios:", error.message);
      alert("Erro ao carregar usuários.");
    } else {
      setUsuarios(data || []);
    }

    setCarregando(false);
  }

  function selecionarUsuario(usuario) {
    setUsuarioSelecionado(usuario);

    setFormulario({
      nome: usuario.nome || "",
      email: usuario.email || "",
      telefone: usuario.telefone || "",
      tipo: usuario.tipo || "user",
      senha: "",
    });
  }

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function handleAtualizarUsuario(event) {
    event.preventDefault();

    if (!usuarioSelecionado) {
      alert("Selecione um usuário.");
      return;
    }

    if (!formulario.nome.trim() || !formulario.email.trim()) {
      alert("Preencha nome e e-mail.");
      return;
    }

    if (formulario.tipo !== "user" && formulario.tipo !== "admin") {
      alert('O tipo deve ser "user" ou "admin".');
      return;
    }

    setSalvando(true);

    try {
      console.log("=================================");
      console.log("EDITANDO USUÁRIO");
      console.log("ID:", usuarioSelecionado.id);
      console.log("Auth ID:", usuarioSelecionado.auth_user_id);
      console.log("Nome:", formulario.nome);
      console.log("Email:", formulario.email);
      console.log("Telefone:", formulario.telefone);
      console.log("Tipo:", formulario.tipo);
      console.log(
        "Senha:",
        formulario.senha ? "ALTERAR SENHA" : "MANTER SENHA"
      );
      console.log("=================================");

      const { data, error } = await supabase.functions.invoke(
        "editar-usuario",
        {
          body: {
            id: usuarioSelecionado.id,
            nome: formulario.nome.trim(),
            email: formulario.email.trim(),
            telefone: formulario.telefone.trim(),
            tipo: formulario.tipo,
            senha: formulario.senha.trim(),
          },
        }
      );

      console.log("Resposta da Edge Function:", { data, error });

      if (error) {
        console.error("Erro completo da Edge Function:", error);

        let mensagem = error.message || "Erro desconhecido.";

        try {
          if (error.context) {
            const resposta = await error.context.json();

            console.error(
              "Resposta retornada pela Edge Function:",
              resposta
            );

            if (resposta?.error) {
              mensagem = resposta.error;
            }

            if (resposta?.details) {
              mensagem += `\n\nDetalhes: ${resposta.details}`;
            }

            if (resposta?.hint) {
              mensagem += `\n\nDica: ${resposta.hint}`;
            }
          }
        } catch (erroLeitura) {
          console.error(
            "Não foi possível ler a resposta da Edge Function:",
            erroLeitura
          );
        }

        alert(`Erro ao atualizar usuário:\n\n${mensagem}`);
        return;
      }

      if (data?.error) {
        console.error("Erro retornado pela function:", data.error);
        alert(data.error);
        return;
      }

      console.log("Usuário atualizado:", data?.usuario);
      console.log("Auth atualizado:", data?.auth);

      const usuarioAtualizado = data?.usuario;

      if (usuarioAtualizado) {
        setUsuarios((anteriores) =>
          anteriores.map((usuario) =>
            usuario.id === usuarioAtualizado.id
              ? usuarioAtualizado
              : usuario
          )
        );

        setUsuarioSelecionado(usuarioAtualizado);

        setFormulario({
          nome: usuarioAtualizado.nome || "",
          email: usuarioAtualizado.email || "",
          telefone: usuarioAtualizado.telefone || "",
          tipo: usuarioAtualizado.tipo || "user",
          senha: "",
        });
      }

      alert("Usuário atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro inesperado:", erro);
      alert("Ocorreu um erro ao atualizar o usuário.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <div className="admin-logo">
            <img src={logo} alt="Morais Energia" />
          </div>

          <h2>Painel Administrativo</h2>
        </div>

        <nav className="admin-menu">
          <button
            className="menu-item"
            onClick={() => navigate("/admin")}
          >
            Usuários Cadastrados
          </button>

          <button className="menu-item active">
            Atualizar Usuários
          </button>

           <button
    className="menu-item"
    onClick={() =>
      navigate("/admin/analise-solar")
    }
  >
    Análise Solar
  </button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="admin-content admin-update-content">
        <section className="admin-update-section">
          <h1>Atualizar Usuários</h1>

          {carregando ? (
            <p>Carregando usuários...</p>
          ) : (
            <div className="admin-update-layout">
              <div className="admin-user-list">
                {usuarios.map((usuario) => (
                  <button
                    key={usuario.id}
                    type="button"
                    className={`admin-user-option${
                      usuarioSelecionado?.id === usuario.id
                        ? " selected"
                        : ""
                    }`}
                    onClick={() => selecionarUsuario(usuario)}
                  >
                    <strong>{usuario.nome}</strong>
                    <span>{usuario.email}</span>
                  </button>
                ))}
              </div>

              <form
                className="admin-update-form"
                onSubmit={handleAtualizarUsuario}
              >
                <h2>
                  {usuarioSelecionado
                    ? `Editando: ${usuarioSelecionado.nome}`
                    : "Selecione um usuário"}
                </h2>

                <input
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado || salvando}
                />

                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={formulario.email}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado || salvando}
                />

                <input
                  name="telefone"
                  type="text"
                  placeholder="Telefone"
                  value={formulario.telefone}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado || salvando}
                />

                <select
                  name="tipo"
                  value={formulario.tipo}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado || salvando}
                >
                  <option value="user">Comum</option>
                  <option value="admin">Admin</option>
                </select>

                <input
                  name="senha"
                  type="password"
                  placeholder="Nova senha (deixe vazio para manter)"
                  value={formulario.senha}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado || salvando}
                />

                <button
                  type="submit"
                  disabled={!usuarioSelecionado || salvando}
                >
                  {salvando
                    ? "Salvando..."
                    : "Salvar alterações"}
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}