import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Admin.css";

const logo ="https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

export default function Admin() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("Comum");

  // Busca os usuarios do Supabase assim que a pagina carrega.
  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    setCarregando(true);

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Erro ao buscar usuarios:", error.message);
      alert("Erro ao carregar usuários.");
    } else {
      setUsuarios(data);
    }

    setCarregando(false);
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      alert("Não foi possível sair da conta.");
      return;
    }

    navigate("/login");
  }

  async function handleCriarUsuario(e) {
    e.preventDefault();

    if (!nome || !email || !senha || !telefone) {
      alert("Preencha todos os campos.");
      return;
    }

    // Chama a Edge Function, que roda no servidor do Supabase.
    // Ela cria o login (Auth) e a linha na tabela "usuarios" de uma vez.
    const { data, error } = await supabase.functions.invoke("criar-usuario", {
      body: { nome, email, senha, telefone, tipo },
    });

    if (error) {
      console.error("Erro ao criar usuario:", error.message);
      alert("Não foi possível criar o usuário.");
      return;
    }

    if (data?.error) {
      console.error("Erro retornado pela function:", data.error);
      alert(data.error);
      return;
    }

    setUsuarios((prev) => [...prev, data.usuario]);

    setNome("");
    setEmail("");
    setSenha("");
    setTelefone("");
    setTipo("Comum");

    alert("Usuário criado com sucesso!");
  }

  async function handleEditarUsuario(id) {
    const usuario = usuarios.find((item) => item.id === id);

    if (!usuario) return;

    const novoNome = prompt("Digite o novo nome:", usuario.nome);

    if (!novoNome) return;

    const { error } = await supabase
      .from("usuarios")
      .update({ nome: novoNome })
      .eq("id", id);

    if (error) {
      console.error("Erro ao editar usuario:", error.message);
      alert("Não foi possível editar o usuário.");
      return;
    }

    setUsuarios((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, nome: novoNome } : item
      )
    );
  }

  async function handleExcluirUsuario(id) {
    const usuario = usuarios.find((item) => item.id === id);

    if (!usuario) return;

    const confirmar = window.confirm(
      `Deseja realmente excluir o usuário "${usuario.nome}"?`
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir usuario:", error.message);
      alert("Não foi possível excluir o usuário.");
      return;
    }

    setUsuarios((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="admin-page">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="sidebar-top">
          <div className="admin-logo">
  <img src={logo} alt="Morais Energia" />
</div>

          <h2>Painel Administrativo</h2>
        </div>

        <nav className="admin-menu">

          <button className="menu-item active">
            Usuários Cadastrados
          </button>

          <button
            className="menu-item"
            onClick={() => alert("Área de produtos em desenvolvimento.")}
          >
            Produtos Cadastrados
          </button>

        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>

      </aside>

      {/* CONTEÚDO */}
      <main className="admin-content">

        {/* USUÁRIOS */}
        <section className="usuarios-section">

          <h1>Usuários</h1>

          <div className="usuarios-table-area">

            {carregando ? (
              <p>Carregando usuários...</p>
            ) : (
              <table className="usuarios-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>TELEFONE</th>
                    <th>TIPO</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>

                      <td>{usuario.id}</td>

                      <td>{usuario.nome}</td>

                      <td>{usuario.telefone}</td>

                      <td>{usuario.tipo}</td>

                      <td className="acoes">

                        {/* EDITAR */}
                        <button
                          className="acao-button editar"
                          onClick={() => handleEditarUsuario(usuario.id)}
                          title="Editar"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </button>

                        {/* EXCLUIR */}
                        <button
                          className="acao-button excluir"
                          onClick={() =>
                            handleExcluirUsuario(usuario.id)
                          }
                          title="Excluir"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M19 6l-1 15H6L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                          </svg>
                        </button>

                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}

          </div>

        </section>

        {/* CADASTRO */}
        <section className="cadastro-section">

          <h2>Cadastrar Usuário</h2>

          <form
            className="cadastro-form"
            onSubmit={handleCriarUsuario}
          >

            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="user">Comum</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">
              Criar
            </button>

          </form>

        </section>

      </main>

    </div>
  );
}