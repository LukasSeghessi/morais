import Header from "./Header";
import "./Hero.css";

const heroVideo = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/video_banner_2.mp4";
const churchImg = "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/igreja.jpg";

export default function Hero() {
    return (
    <section className="hero">
      <div className="hero__banner">
        <video
          className="hero__banner-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero__overlay" />
        <Header />
      </div>

      <div className="hero__content">
        <div className="hero__since" data-aos="fade-right">
          <p className="hero__since-label">DESDE</p>
          <p className="hero__since-year">2015</p>
        </div>

        <div className="hero__image-wrapper" data-aos="fade-left">
          <img
            src={churchImg}
            alt="Instalacao solar em telhado de igreja, vista aerea"
            className="hero__image"
          />
        </div>
      </div>
    </section>
  );
}