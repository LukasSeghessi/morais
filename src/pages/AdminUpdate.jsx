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
  });

  useEffect(() => {
    async function carregarUsuarios() {
      const { data, error } = await supabase
        .from("usuarios")
        .select("id, nome, email, telefone, tipo")
        .order("id", { ascending: true });

      if (error) {
        console.error("Erro ao buscar usuarios:", error.message);
        alert("Erro ao carregar usuários.");
      } else {
        setUsuarios(data || []);
      }

      setCarregando(false);
    }

    carregarUsuarios();
  }, []);

  function selecionarUsuario(usuario) {
    setUsuarioSelecionado(usuario);
    setFormulario({
      nome: usuario.nome || "",
      email: usuario.email || "",
      telefone: usuario.telefone || "",
      tipo: usuario.tipo || "user",
    });
  }

  function atualizarCampo(event) {
    const { name, value } = event.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  }

  async function handleAtualizarUsuario(event) {
    event.preventDefault();

    if (!usuarioSelecionado || !formulario.nome || !formulario.email) {
      alert("Selecione um usuário e preencha nome e e-mail.");
      return;
    }

    setSalvando(true);

    const { data, error } = await supabase
      .from("usuarios")
      .update(formulario)
      .eq("id", usuarioSelecionado.id)
      .select("id, nome, email, telefone, tipo")
      .single();

    if (error) {
      console.error("Erro ao atualizar usuario:", error.message);
      alert("Não foi possível atualizar o usuário.");
    } else {
      setUsuarios((anteriores) =>
        anteriores.map((usuario) =>
          usuario.id === data.id ? data : usuario
        )
      );
      setUsuarioSelecionado(data);
      alert("Usuário atualizado com sucesso!");
    }

    setSalvando(false);
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
          <button className="menu-item" onClick={() => navigate("/admin")}>
            Usuários Cadastrados
          </button>
          <button className="menu-item active">Atualizar Usuários</button>
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
                    className={`admin-user-option${
                      usuarioSelecionado?.id === usuario.id ? " selected" : ""
                    }`}
                    onClick={() => selecionarUsuario(usuario)}
                  >
                    <strong>{usuario.nome}</strong>
                    <span>{usuario.email}</span>
                  </button>
                ))}
              </div>

              <form className="admin-update-form" onSubmit={handleAtualizarUsuario}>
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
                  disabled={!usuarioSelecionado}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={formulario.email}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado}
                />
                <input
                  name="telefone"
                  type="text"
                  placeholder="Telefone"
                  value={formulario.telefone}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado}
                />
                <select
                  name="tipo"
                  value={formulario.tipo}
                  onChange={atualizarCampo}
                  disabled={!usuarioSelecionado}
                >
                  <option value="user">Comum</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" disabled={!usuarioSelecionado || salvando}>
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}