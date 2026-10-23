import "./Solutions.css";

const roofImg = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/campo.jpg";

export default function Solutions() {
  return (
    <section className="solutions" data-aos="zoom-in-down">
      <div className="solutions__image-frame">
        <img
          src={roofImg}
          alt="Telhado residencial com painéis solares instalados"
        />
      </div>

      <div className="solutions__content">
        <h2 className="solutions__title">
          Soluções inteligentes para um futuro mais econômico
        </h2>

        <p className="solutions__highlight">
          Energia solar não é apenas uma escolha sustentável. É um
          investimento.
        </p>

        <p className="solutions__label">Oferecemos:</p>

        <p className="solutions__offer">
          Experiência + tecnologia + atendimento personalizado
        </p>
      </div>
    </section>
  );
}