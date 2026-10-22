import "./Services.css";

// TODO: trocar pelas imagens reais quando tiver os arquivos
// import projetoImg from "../assets/servico-projeto.jpg";
// import economiaImg from "../assets/servico-economia.jpg";
// import instalacaoImg from "../assets/servico-instalacao.jpg";
const projetoImg = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/projeto.jpg";
const economiaImg = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/economia.jpg";
const instalacaoImg = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/instalacaoes_2.jpg";

const SERVICES = [
  {
    id: "projeto",
    image: projetoImg,
    alt: "Casa com painéis solares no telhado ao entardecer",
    label: "Projeto personalizado",
  },
  {
    id: "economia",
    image: economiaImg,
    alt: "Close de painel solar com folha e reflexo do sol",
    label: "Economia",
  },
  {
    id: "instalacao",
    image: instalacaoImg,
    alt: "Equipe instalando painéis solares",
    label: "Instalação especializada",
  },
];

export default function Services() {
  return (

    
    <section id="orcamento" className="services" data-aos="zoom-in-up">
      
      <div className="about__headline">
        <p className="about__headline-bold">Energia que</p>
        <p className="about__headline-script">gera economia</p>
      </div>
      <p className="services__intro">
        Desenvolvemos projetos personalizados de energia solar e projetos
        elétricos, cuidando de cada etapa para entregar segurança, eficiência
        e qualidade.
      </p>

      <div className="services__grid">
        {SERVICES.map((service) => (
          <div key={service.id} className="services__card">
            <div className="services__image-frame">
              <img src={service.image} alt={service.alt} />
            </div>
            <p className="services__label">{service.label}</p>
          </div>
        ))}
      </div>

      <a href="https://api.whatsapp.com/send/?phone=5516997440950&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+energia+solar.&type=phone_number&app_absent=0" className="services__cta" target="_blank">
        Faça um orçamento
      </a>
    </section>
  );
}