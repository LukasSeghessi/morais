import "./FloatingButtons.css";

const WHATSAPP_NUMBER = "5516997440950";
const WHATSAPP_MESSAGE =
  "Olá! Gostaria de saber mais sobre energia solar.";



const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const instagramUrl = `https://www.instagram.com/moraisenergia/`;

export default function FloatingButtons() {
  return (
    <div className="floating-buttons">

      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram da Morais Energia"
        className="floating-buttons__button floating-buttons__button--instagram"
      >
        <svg
  viewBox="0 0 24 24"
  width="27"
  height="27"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <rect x="3" y="3" width="18" height="18" rx="5" />
  <circle cx="12" cy="12" r="4" />
  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
</svg>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="floating-buttons__button floating-buttons__button--whatsapp"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
        >
          <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.1 14.9 3.7 13.5 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.2-8.3 8.2zm4.5-6.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.5-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.2z" />
        </svg>
      </a>

    </div>
  );
}