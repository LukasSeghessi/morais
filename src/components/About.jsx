import "./About.css";

// TODO: trocar pelo logo real quando tiver o arquivo
// import logo from "../assets/logo-morais-energia.svg";
const logo = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/logo.png";

export default function About() {
  return (
    <section className="about__section" data-aos="zoom-in">
      <div className="about__intro">
        <img src={logo} alt="Morais Energia" className="about__logo" />

        <div className="about__divider" />

        <p className="about__text">
          Com dedicação, conhecimento e compromisso com a qualidade,
          construímos nossa trajetória oferecendo soluções em energia
          pensadas para tornar o dia a dia mais eficiente e econômico. Cada
          projeto é desenvolvido com atenção às necessidades de nossos
          clientes, buscando entregar não apenas uma solução, mas uma
          experiência de confiança e tranquilidade.
        </p>
      </div>

    </section>
  );
}