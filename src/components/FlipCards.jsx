import {
  Sun,
  FileText,
  Plug,
  Cpu,
  Home,
  ClipboardCheck,
} from "lucide-react";
import "./FlipCards.css";

// Cada item tem: icone, titulo (aparece na frente) e descricao (aparece no verso).
const CARDS = [
  {
    id: "energia-solar",
    icon: Sun,
    title: "Energia Solar",
    description:
      "Projetos e soluções em energia solar para gerar sua própria energia, reduzir custos com eletricidade e aumentar a eficiência do seu imóvel ou negócio.",
  },
  {
    id: "projetos-eletricos",
    icon: FileText,
    title: "Projetos Elétricos",
    description:
      "Elaboração de projetos elétricos personalizados, planejados para atender às necessidades de cada instalação com segurança, eficiência e organização.",
  },
  {
    id: "instalacoes-eletricas",
    icon: Plug,
    title: "Instalações Elétricas",
    description:
      "Execução de instalações elétricas residenciais, comerciais e industriais, seguindo boas práticas de segurança e qualidade.",
  },
  {
    id: "automacao-industrial",
    icon: Cpu,
    title: "Automação Elétrica Industrial",
    description:
      "Soluções de automação para ambientes industriais, buscando maior controle, produtividade e eficiência nos processos elétricos.",
  },
  {
    id: "automacao-residencial",
    icon: Home,
    title: "Automação Elétrica Residencial",
    description:
      "Automação para residências, proporcionando mais praticidade, controle e eficiência no gerenciamento dos sistemas elétricos.",
  },
  {
    id: "laudos-eletricos",
    icon: ClipboardCheck,
    title: "Laudos Elétricos",
    description:
      "Inspeção e avaliação das instalações elétricas, com emissão de laudos técnicos para verificar as condições, segurança e conformidade da instalação.",
  },
];

export default function FlipCards() {
  return (
    <section className="flip-cards">
      <div className="flip-cards__grid">
        {CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="flip-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flip-card__inner">
                <div className="flip-card__face flip-card__face--front">
                  <Icon size={40} strokeWidth={1.5} className="flip-card__icon" />
                  <p className="flip-card__title">{card.title}</p>
                </div>

                <div className="flip-card__face flip-card__face--back">
                  <p className="flip-card__description">{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}