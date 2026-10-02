import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

import "./AdminSolar.css";

const logo =
  "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo_branco_2.png";

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default function AdminSolar() {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [potencia, setPotencia] = useState("");
  const [perdas, setPerdas] = useState("14");
  const [inclinacao, setInclinacao] = useState("20");
  const [orientacao, setOrientacao] = useState("0");

  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function calcularAnalise(event) {
    event.preventDefault();

    if (!latitude || !longitude || !potencia) {
      alert("Preencha latitude, longitude e potência.");
      return;
    }

    setCarregando(true);
    setResultado(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "analise-solar",
        {
          body: {
            latitude: Number(latitude),
            longitude: Number(longitude),
            potencia: Number(potencia),
            perdas: Number(perdas),
            inclinacao: Number(inclinacao),
            orientacao: Number(orientacao),
          },
        }
      );

      if (error) {
        console.error("Erro na análise solar:", error);
        alert("Não foi possível realizar a análise solar.");
        return;
      }

      if (data?.error) {
        console.error("Erro retornado pela função:", data.error);
        alert(data.error);
        return;
      }

      console.log("Resultado PVGIS:", data);

      setResultado(data.dados);
    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Ocorreu um erro ao realizar a análise.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const total =
    resultado?.outputs?.totals?.fixed;

  const mensal =
    resultado?.outputs?.monthly?.fixed || [];

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

          <button
            className="menu-item"
            onClick={() => navigate("/admin/usuarios")}
          >
            Atualizar Usuários
          </button>

          <button className="menu-item active">
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

      <main className="admin-content admin-solar-content">
        <section className="solar-section">
          <h1>Análise Solar</h1>

          <p className="solar-description">
            Simule a produção estimada de um sistema fotovoltaico
            utilizando dados solares do PVGIS.
          </p>

          <form
            className="solar-form"
            onSubmit={calcularAnalise}
          >
            <div className="solar-form-grid">
              <div className="solar-field">
                <label>Latitude</label>

                <input
                  type="number"
                  step="any"
                  placeholder="-21.17"
                  value={latitude}
                  onChange={(e) =>
                    setLatitude(e.target.value)
                  }
                />
              </div>

              <div className="solar-field">
                <label>Longitude</label>

                <input
                  type="number"
                  step="any"
                  placeholder="-47.81"
                  value={longitude}
                  onChange={(e) =>
                    setLongitude(e.target.value)
                  }
                />
              </div>

              <div className="solar-field">
                <label>Potência do sistema (kWp)</label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="8.2"
                  value={potencia}
                  onChange={(e) =>
                    setPotencia(e.target.value)
                  }
                />
              </div>

              <div className="solar-field">
                <label>Perdas (%)</label>

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={perdas}
                  onChange={(e) =>
                    setPerdas(e.target.value)
                  }
                />
              </div>

              <div className="solar-field">
                <label>Inclinação (°)</label>

                <input
                  type="number"
                  step="0.1"
                  value={inclinacao}
                  onChange={(e) =>
                    setInclinacao(e.target.value)
                  }
                />
              </div>

              <div className="solar-field">
                <label>Orientação (°)</label>

                <input
                  type="number"
                  step="0.1"
                  value={orientacao}
                  onChange={(e) =>
                    setOrientacao(e.target.value)
                  }
                />
              </div>
            </div>

            <button
              className="solar-calculate-button"
              type="submit"
              disabled={carregando}
            >
              {carregando
                ? "Calculando..."
                : "Calcular análise"}
            </button>
          </form>

          {resultado && total && (
            <div className="solar-results">
              <h2>Resultado da análise</h2>

              <div className="solar-cards">
                <div className="solar-card">
                  <span>Produção anual</span>
                  <strong>
                    {total.E_y.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    kWh
                  </strong>
                </div>

                <div className="solar-card">
                  <span>Produção mensal média</span>
                  <strong>
                    {total.E_m.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    kWh
                  </strong>
                </div>

                <div className="solar-card">
                  <span>Produção diária média</span>
                  <strong>
                    {total.E_d.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    kWh
                  </strong>
                </div>

                <div className="solar-card">
                  <span>Irradiação anual</span>
                  <strong>
                    {total["H(i)_y"].toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    kWh/m²
                  </strong>
                </div>
              </div>

              <div className="solar-monthly">
                <h3>Produção mensal estimada</h3>

                <div className="solar-chart">
                  {mensal.map((item) => {
                    const maiorProducao = Math.max(
                      ...mensal.map((mes) => mes.E_m)
                    );

                    const altura =
                      (item.E_m / maiorProducao) * 100;

                    return (
                      <div
                        className="solar-chart-column"
                        key={item.month}
                      >
                        <span className="solar-chart-value">
                          {Math.round(item.E_m)}
                        </span>

                        <div className="solar-chart-bar-area">
                          <div
                            className="solar-chart-bar"
                            style={{
                              height: `${altura}%`,
                            }}
                          />
                        </div>

                        <span className="solar-chart-month">
                          {meses[item.month - 1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}