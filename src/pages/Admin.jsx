import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Admin.css";

const logo =
  "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

export default function Admin() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("user");
  const [criandoUsuario, setCriandoUsuario] = useState(false);

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
      setUsuarios(data || []);
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

    if (criandoUsuario) return;

    if (!nome || !email || !senha || !telefone) {
      alert("Preencha todos os campos.");
      return;
    }

    setCriandoUsuario(true);

    try {
      await criarUsuario();
    } catch (erro) {
      console.error("Erro inesperado ao criar usuário:", erro);
      alert("Ocorreu um erro inesperado ao criar o usuário.");
    } finally {
      setCriandoUsuario(false);
    }
  }

  async function criarUsuario() {
    console.log("=================================");
    console.log("CRIANDO USUÁRIO");
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Telefone:", telefone);
    console.log("TIPO ENVIADO:", tipo);
    console.log("=================================");

    const { data, error } = await supabase.functions.invoke(
      "criar-usuario",
      {
        body: {
          nome,
          email,
          senha,
          telefone,
          tipo,
        },
      }
    );

    if (error) {
      console.error(
        "ERRO COMPLETO DA EDGE FUNCTION:",
        error
      );

      let mensagem = error.message;

      try {
        if (error.context) {
          const resposta = await error.context.json();

          console.error(
            "RESPOSTA DA EDGE FUNCTION:",
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

          if (resposta?.code) {
            mensagem += `\n\nCódigo: ${resposta.code}`;
          }
        }
      } catch (erroLeitura) {
        console.error(
          "Não foi possível ler a resposta da Edge Function:",
          erroLeitura
        );
      }

      alert(`Erro ao criar usuário:\n\n${mensagem}`);
      return;
    }

    if (data?.error) {
      console.error(
        "Erro retornado pela function:",
        data.error
      );

      alert(data.error);
      return;
    }

    console.log("USUÁRIO CRIADO:", data.usuario);

    setUsuarios((prev) => [...prev, data.usuario]);

    setNome("");
    setEmail("");
    setSenha("");
    setTelefone("");
    setTipo("user");

    alert("Usuário criado com sucesso!");

    console.log(
      "Usuário criado com tipo:",
      data.usuario?.tipo
    );
  }


  async function handleExcluirUsuario(id) {
    const usuario = usuarios.find(
      (item) => item.id === id
    );

    if (!usuario) return;

    const confirmar = window.confirm(
      `Deseja realmente excluir o usuário "${usuario.nome}"?\n\n` +
        "Esta ação removerá a conta de login e o cadastro do usuário."
    );

    if (!confirmar) return;

    try {
      console.log("=================================");
      console.log("EXCLUINDO USUÁRIO");
      console.log("ID:", usuario.id);
      console.log("Nome:", usuario.nome);
      console.log("Email:", usuario.email);
      console.log(
        "Auth ID:",
        usuario.auth_user_id
      );
      console.log("=================================");

      const { data, error } =
        await supabase.functions.invoke(
          "excluir-usuario",
          {
            body: {
              id: usuario.id,
            },
          }
        );

      console.log(
        "RESPOSTA DA EXCLUSÃO:",
        {
          data,
          error,
        }
      );

      if (error) {
        console.error(
          "Erro completo ao excluir usuário:",
          error
        );

        let mensagem =
          error.message ||
          "Erro desconhecido.";

        try {
          if (error.context) {
            const resposta =
              await error.context.json();

            console.error(
              "RESPOSTA DA EDGE FUNCTION:",
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
            "Não foi possível ler a resposta:",
            erroLeitura
          );
        }

        alert(
          `Erro ao excluir usuário:\n\n${mensagem}`
        );

        return;
      }

      if (data?.error) {
        console.error(
          "Erro retornado pela function:",
          data.error
        );

        alert(data.error);
        return;
      }

      setUsuarios((prev) =>
        prev.filter(
          (item) => item.id !== usuario.id
        )
      );

      alert("Usuário excluído com sucesso!");

      console.log(
        "USUÁRIO EXCLUÍDO:",
        data?.usuario
      );
    } catch (erro) {
      console.error(
        "Erro inesperado ao excluir usuário:",
        erro
      );

      alert(
        "Ocorreu um erro inesperado ao excluir o usuário."
      );
    }
  }

  return (
    <div className="admin-page">

      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <div className="admin-logo">
            <img
              src={logo}
              alt="Morais Energia"
            />
          </div>

          <h2>Painel Administrativo</h2>
        </div>

    <nav className="admin-menu">
  <button className="menu-item active">
    Usuários Cadastrados
  </button>

  <button
    className="menu-item"
    onClick={() =>
      navigate("/admin/usuarios")
    }
  >
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

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Sair
        </button>
      </aside>


      <main className="admin-content">

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

                      <td>
                        {usuario.nome}
                      </td>

                      <td>
                        {usuario.telefone}
                      </td>

                      <td>
                        {usuario.tipo}
                      </td>

                      <td className="acoes">

                        <button
                          className="acao-button editar"
                          onClick={() =>
                            navigate(
                              "/admin/usuarios"
                            )
                          }
                          title="Editar"
                        >
                          ✎
                        </button>


                        <button
                          className="acao-button excluir"
                          onClick={() =>
                            handleExcluirUsuario(
                              usuario.id
                            )
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
              onChange={(e) =>
                setNome(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) =>
                setTelefone(e.target.value)
              }
            />

            <select
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value)
              }
            >
              <option value="user">
                Comum
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            <button type="submit" disabled={criandoUsuario}>
              {criandoUsuario ? "Criando..." : "Criar"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}