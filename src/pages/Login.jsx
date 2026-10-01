import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./Login.css";

const logo =
  "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo.png";

export default function Login() {
  const navigate = useNavigate();

  // Controla se estamos mostrando Login ou Cadastro
  const [modoCadastro, setModoCadastro] = useState(false);

  // Login
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Cadastro
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [carregando, setCarregando] = useState(false);

  // =========================
  // LOGIN
  // =========================

  async function handleLogin(event) {
    event.preventDefault();

    setCarregando(true);

    try {
      // Autentica pelo Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

      if (authError) {
        console.error("Erro no login:", authError);
        alert("E-mail ou senha incorretos.");
        return;
      }

      const user = authData.user;

      if (!user) {
        alert("Não foi possível identificar o usuário.");
        return;
      }

      // Busca os dados do usuário na tabela usuarios
      const { data: usuario, error: usuarioError } = await supabase
        .from("usuarios")
        .select("nome, email, telefone, tipo, auth_user_id")
        .eq("auth_user_id", user.id)
        .single();

      if (usuarioError) {
        console.error("Erro ao buscar usuário:", usuarioError);

        alert(
          "O login foi realizado, mas o cadastro do usuário não foi encontrado."
        );

        await supabase.auth.signOut();
        return;
      }

      // Verifica o tipo do usuário
      if (usuario.tipo === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Ocorreu um erro ao realizar o login.");
    } finally {
      setCarregando(false);
    }
  }

  // =========================
  // CADASTRO
  // =========================

  async function handleCadastro(event) {
    event.preventDefault();

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
      alert("As senhas não são iguais.");
      return;
    }

    // Verifica tamanho mínimo
    if (senha.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    try {
      // Cria o usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,

        // Essas informações serão usadas
        // pelo Trigger para criar o registro
        // na tabela "usuarios".
        options: {
          data: {
            nome,
            telefone,
          },
        },
      });

      if (error) {
        console.error("Erro no cadastro:", error);

        if (error.message.includes("already registered")) {
          alert("Este e-mail já está cadastrado.");
        } else {
          alert(`Erro ao criar conta: ${error.message}`);
        }

        return;
      }

      if (!data.user) {
        alert("Não foi possível criar a conta.");
        return;
      }

      alert("Conta criada com sucesso!");

      // Limpa os campos
      setNome("");
      setEmail("");
      setTelefone("");
      setSenha("");
      setConfirmarSenha("");

      // Volta para o modo login
      setModoCadastro(false);
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Ocorreu um erro ao criar a conta.");
    } finally {
      setCarregando(false);
    }
  }

  // =========================
  // VOLTAR PARA O INÍCIO
  // =========================

  function voltarInicio() {
    navigate("/");
  }

  // =========================
  // TELA
  // =========================

  return (
    <main className="login-page">
      <form
        className="login-page__card"
        onSubmit={modoCadastro ? handleCadastro : handleLogin}
      >
        <img
          src={logo}
          alt="Morais Energia"
          className="login-page__logo"
        />

        <div className="login-page__fields">
          {modoCadastro && (
            <>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                className="login-page__input"
                required
              />

              <input
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
                className="login-page__input"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="login-page__input"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            className="login-page__input"
            required
          />

          {modoCadastro && (
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(event) =>
                setConfirmarSenha(event.target.value)
              }
              className="login-page__input"
              required
            />
          )}
        </div>

        <button
          type="submit"
          className="login-page__button"
          disabled={carregando}
        >
          {carregando
            ? modoCadastro
              ? "Criando conta..."
              : "Entrando..."
            : modoCadastro
            ? "Criar conta"
            : "Login"}
        </button>

        <div className="login-page__switch">
          {modoCadastro ? (
            <section className="section__criar">
              <span>Já possui uma conta?</span>

              <button
                type="button"
                onClick={() => setModoCadastro(false)}
                className="criar"
              >
                Voltar para login
              </button>
            </section>
          ) : (
            <section className="section__criar">
              <span>Não possui uma conta?</span>

              <button
                type="button"
                onClick={() => setModoCadastro(true)}
                className="criar"
              >
                Criar conta
              </button>
            </section>
          )}
        </div>

        {/* VOLTAR PARA O INÍCIO */}
        <button
          type="button"
          className="login-page__back"
          onClick={voltarInicio}
        >
          ← Voltar ao início
        </button>
      </form>
    </main>
  );
}