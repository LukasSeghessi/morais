import "./Reference.css";

// TODO: trocar pela imagem real quando tiver o arquivo
// import buildingImg from "../assets/predio-aereo.jpg";
const buildingImg = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/banco.jpg";

export default function Reference() {
  return (
    <section className="reference">
      
      
        <div className="reference__image-frame" data-aos="fade-left">
          <img
            src={buildingImg}
            alt="Vista aérea de telhado com painéis solares instalados"
            className="reference__image"
          />
        </div>
      

      <div className="reference__text" data-aos="fade-left">
        <p className="reference__label">SENDO</p>
        <p className="reference__highlight">REFERÊNCIA</p>
      </div>
    </section>
  );
}