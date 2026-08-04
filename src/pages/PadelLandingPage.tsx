import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { usePadelLanding } from "@/hooks/usePadelLanding";
import { BIVO_ATHLETES_COUNT } from "@/lib/bivoStats";
import { padelAsset } from "@/lib/padelLandingAssets";
import { sportLegalPath } from "@/lib/sportLegalPaths";
import "./PadelLanding.css";

const PAIN_POINTS = [
  "Acabas los partidos exhausto cuando tus rivales todavía tienen gasolina de sobra.",
  "Tienes miedo de lesionarte: llevas meses con molestias en el hombro, la rodilla o la espalda que nunca terminan de irse, y cada partido es una ruleta.",
  "Sabes que si te lesionas de verdad, semanas o meses fuera de la pista. Y eso no te lo puedes permitir.",
  "Buscas rutinas en YouTube pero ninguna está pensada para las exigencias físicas reales del pádel.",
  "Entrenas sin estructura y al final no sabes si lo que haces sirve para algo o si incluso te está haciendo daño.",
  "No tienes tiempo ni presupuesto para un preparador físico privado (40–120€/sesión).",
];

const VALUE_POINTS = [
  "Diseñado por preparadores físicos de jugadores ATP",
  "Adaptado a ti, no a una plantilla genérica",
  "Previene lesiones antes de que ocurran",
];

const BENEFITS = [
  {
    image: "img/vsl/padel-player-court.png",
    imagePosition: "center center",
    title: "Aguanta más que tus rivales",
    text: "Entrena la resistencia específica del pádel. Llega igual de fuerte al tercer set que al primero. Sin calambres. Sin quedarte sin pulmones en el momento decisivo.",
  },
  {
    image: "img/vsl/ejercicio-rotacion-externa-hombro-banda-elastica-mujer-padel.png.jpg",
    imagePosition: "center 18%",
    title: "Entrena sin miedo a lesionarte",
    text: "Planes diseñados desde el primer día para proteger tus hombros, rodillas y espalda. El trabajo preventivo de Bivo reduce el riesgo de lesión antes de que aparezca. Más partidos, menos tiempo parado.",
  },
  {
    image: "img/vsl/entrenamiento-kettlebell-padel.png.png",
    imagePosition: "center 20%",
    title: "Por fin ves cómo mejoras",
    text: "Estadísticas claras de tu progreso semana a semana. Sabes exactamente qué has mejorado, cuánto te falta y por qué cada sesión tiene sentido.",
  },
  {
    image: "img/bivo-train-at-home.jpg",
    imagePosition: "center 18%",
    title: "Sin excusas logísticas",
    text: "En casa, en el club, en el hotel o en el jardín. Sin equipamiento especial. Cuando tú puedas. Bivo se adapta a tu vida, no al revés.",
  },
];

const VIDEO_TESTIMONIALS = [
  { src: "uploads/testimonial-nura.mp4", label: "Nura · Pádel" },
  { src: "uploads/testimonial-pedro.mp4", label: "Pedro · Pádel" },
  { src: "uploads/testimonial-paloma.mp4", label: "Paloma · Pádel" },
  { src: "uploads/testimonial-mila.mp4", label: "Mila · Pádel" },
];

const APPSTORE_REVIEWS = [
  {
    platform: "App Store",
    quote:
      '"Llevaba un año con molestias en el hombro. Desde que entreno con Bivo no he vuelto a tener problemas. Y además juego mejor."',
    author: "Carlos R. · Jugador de pádel",
    icon: "apple",
  },
  {
    platform: "Google Play",
    quote:
      '"En 6 semanas noté un cambio brutal en la resistencia. Antes me moría en el tercer set, ahora soy el que más aguanta del equipo."',
    author: "Javier M. · Jugador de pádel",
    icon: "google",
  },
  {
    platform: "App Store",
    quote:
      '"Por fin un entrenamiento que se adapta a mis torneos. Nunca llego cansada a los partidos importantes. Es como tener un preparador personal."',
    author: "Laura G. · Jugadora de pádel",
    icon: "apple",
  },
  {
    platform: "Google Play",
    quote:
      '"Lo que más me sorprende es que el plan cambia según cómo me encuentro cada semana. Nunca había tenido eso con ninguna app de entrenamiento."',
    author: "Marta S. · Jugadora de pádel",
    icon: "google",
  },
  {
    platform: "App Store",
    quote:
      '"Llevo tres meses y me he olvidado de las molestias de rodilla que tenía crónicas. El plan de prevención funciona de verdad."',
    author: "Alejandro T. · Jugador de pádel",
    icon: "apple",
  },
  {
    platform: "Google Play",
    quote:
      '"Antes no podía jugar dos partidos seguidos. Ahora termino el segundo igual de fresco que empecé el primero. No me lo puedo creer."',
    author: "Rocío F. · Jugadora de pádel",
    icon: "google",
  },
];

const STEPS = [
  {
    image: "img/vsl/onboarding-movilidad.jpg",
    imagePosition: "center 14%",
    title: "Bivo te valora y te conoce",
    text: "Test inicial para entender tu nivel, deporte, objetivos, lesiones previas y disponibilidad.",
  },
  {
    image: "img/flow/02-entrenamiento.jpg",
    imagePosition: "center 12%",
    title: "Entrenamiento personalizado",
    text: "Plan específico para tu deporte de raqueta basado en tus datos, sin plantillas genéricas.",
  },
  {
    image: "assets/app-screens/stats.png",
    imagePosition: "center top",
    title: "Registra tu mejora",
    text: "Estadísticas claras de adherencia, velocidad y escudo de lesiones. Visualiza tu progreso.",
  },
  {
    image: "assets/app-screens/agenda.png",
    imagePosition: "center top",
    title: "Gestiona tu calendario",
    text: "Organiza tus sesiones, partidos y descansos en un mismo lugar. Sin solapamientos.",
  },
  {
    image: "img/vsl/onboarding-dolor.png",
    imagePosition: "center 10%",
    title: "Se adapta a ti",
    text: "¿Cambias de objetivo, te lesionas o tienes menos tiempo? Bivo recalcula tu plan automáticamente.",
  },
];

const INCLUDED = [
  "Entrenamiento personalizado con IA",
  "Adaptación automática a tu nivel y lesiones",
  "Estadísticas y seguimiento de progreso",
  "Calendario y planificación de partidos",
  "Acceso completo a todas las funciones",
  "Actualizaciones incluidas",
  "Soporte en español",
];

const FAQ_ITEMS = [
  {
    q: "¿Necesito ir al gimnasio o tener equipamiento especial?",
    a: "No. Bivo está diseñado para que puedas entrar donde quieras, ya sea en el gimnasio, en casa con tu propio material, en un club, de viaje o incluso en el jardín. Desde la aplicación podrás sincronizar el material que tienes en cada momento para reajustar el plan de manera inmediata.",
  },
  {
    q: "¿Es apta si tengo una lesión crónica o una molestia habitual?",
    a: "Sí. Uno de los pilares de Bivo es el trabajo preventivo y el respeto a las lesiones. En el test inicial indicas tus lesiones y zonas sensibles, y el plan las tiene en cuenta desde el primer día. Si durante el entrenamiento aparece alguna molestia, puedes reportarlo y el plan se ajusta de forma automática. No tienes que elegir entre jugar y cuidarte: Bivo lo gestiona.",
  },
  {
    q: "¿Funciona si solo puedo entrenar 2 o 3 días a la semana?",
    a: "Perfectamente. En el test inicial indicas tu disponibilidad real y Bivo crea el plan en base a eso. No hay un mínimo de días. Y lo mejor es que puedes ir ajustándolo sobre la marcha: si una semana tienes más disponibilidad y quieres entrenar más días, lo cambias desde dentro de la app y el plan se sincroniza al instante. Si otra semana tienes menos tiempo, reduces los días y Bivo lo reajusta para que sigas progresando con lo que tienes.",
  },
  {
    q: "¿Qué pasa si tengo torneo un fin de semana y no puedo entrenar?",
    a: "Bivo lo gestiona automáticamente. Introduces tu calendario de partidos y torneos en la app, y el plan se recalcula para que llegues en el mejor estado posible a cada competición. Sin solapamientos. Sin sobreentrenamiento.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, en cualquier momento y con un solo clic desde la app. Sin llamadas, sin formularios, sin penalizaciones. Cancelas y listo.",
  },
  {
    q: "¿Es para cualquier nivel, aunque sea principiante total?",
    a: "Absolutamente. Bivo está diseñado para jugadores de todos los niveles, quienes acaban de empezar hasta jugadores profesionales que ya lo están usando también. Lo bueno que tiene es que, desde dentro de la aplicación, te hace un test inicial para saber exactamente dónde estás y empezar el plan ahí. Si tú luego quieres subir o bajar la dificultad desde dentro de la aplicación también podrás hacerlo y te lo ajusta al instante.",
  },
  {
    q: "¿Funciona también para tenis, pickleball o bádminton?",
    a: "Sí. Aunque esta página está orientada al pádel, Bivo cubre también tenis, pickleball y bádminton con planes específicos para cada deporte. Cuando haces el test inicial, indicas tu deporte y el plan se crea en base a sus exigencias concretas.",
  },
];

const PlayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z"
      fill="#39FF14"
    />
  </svg>
);

const SmallPlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z"
      fill="#39FF14"
    />
  </svg>
);

const AppleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GooglePlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76c.3.17.65.19.97.07l12.83-7.4-2.79-2.79-11.01 10.12zM20.7 10.06L17.96 8.5 14.84 11.5l3.13 3.12 2.76-1.59c.79-.46.79-1.52-.03-1.97zM.96.3C.68.5.5.8.5 1.18v21.64c0 .38.18.68.46.89l.12.08 12.1-12.1v-.28L.96.3zm15.57 13.91l-3.31-3.3-12.22 12.22.11.09c.3.22.7.27 1.05.1l14.37-8.3-.0-.01z" />
  </svg>
);

const PadelLandingPage = () => {
  const { localePath } = useLocale();
  const signupPath = localePath("/registro");
  const {
    rootRef,
    vslVideoRef,
    vslOverlayVisible,
    ctaUnlocked,
    carouselIndex,
    carouselPrev,
    carouselNext,
    carouselImages,
    openFaq,
    toggleFaq,
    countdown,
    playVsl,
    handleTestimonialClick,
  } = usePadelLanding();

  const primeTestimonialFrame = (video: HTMLVideoElement) => {
    if (video.duration === 0 || video.currentTime > 0.05) return;

    try {
      video.currentTime = Math.min(0.1, video.duration || 0.1);
    } catch {
      // Algunos navegadores pueden bloquear el seek inicial hasta tener más datos.
    }
  };

  return (
    <div className="padel-landing" ref={rootRef}>
      <section id="hero">
        <div className="hero-bg">
          <img src={padelAsset("img/padel.jpg")} alt="Jugador de pádel en acción" />
          <div
            className="hero-overlay"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.90) 50%, rgba(0,0,0,0.97) 100%)",
            }}
          />
        </div>

        <div className="hero-logo">
          <img src={padelAsset("assets/logo-green.png")} alt="Bivo" />
        </div>

        <div className="hero-content">
          <p className="pre-headline">PARA JUGADORES DE PÁDEL QUE QUIEREN RENDIR MÁS Y LESIONARSE MENOS</p>
          <h1 className="headline">
            ¿Tu <span className="accent">cuerpo</span> no aguanta los partidos que tu cabeza quiere jugar?
          </h1>
          <p className="hero-sub">
            Descubre el método de preparación física que usan los profesionales del pádel, ahora adaptado a tu nivel y a
            tu vida.
          </p>

          <div className="hero-social-proof fade-up">
            <div className="hsp-avatars">
              <span className="hsp-av" style={{ background: "#1a3a1a" }}>
                N
              </span>
              <span className="hsp-av" style={{ background: "#1a2a3a" }}>
                P
              </span>
              <span className="hsp-av" style={{ background: "#2a1a3a" }}>
                M
              </span>
              <span className="hsp-av" style={{ background: "#3a2a1a" }}>
                S
              </span>
            </div>
            <span className="hsp-text">
              Más de <strong>{BIVO_ATHLETES_COUNT} jugadores</strong> ya entrenan con Bivo
            </span>
          </div>

          <div className={`vsl-player${vslOverlayVisible ? " is-poster" : ""}`}>
            <video
              ref={vslVideoRef}
              src={padelAsset("uploads/vslpadel.mp4")}
              poster={padelAsset("img/vsl-poster.jpg")}
              preload="auto"
              playsInline
              onClick={playVsl}
            />
            {vslOverlayVisible && (
              <img
                className="vsl-poster"
                src={padelAsset("img/vsl-poster.jpg")}
                alt=""
                aria-hidden
              />
            )}
            <div
              className={`play-overlay${vslOverlayVisible ? "" : " hidden"}`}
              onClick={playVsl}
              onKeyDown={(e) => e.key === "Enter" && playVsl()}
              role="button"
              tabIndex={0}
              aria-label="Reproducir vídeo"
            >
              <div className="play-circle">
                <PlayIcon />
              </div>
              <span className="play-overlay-text">Mira esto antes de tu próximo partido</span>
            </div>
          </div>

          <div className={`hero-cta-area${ctaUnlocked ? "" : " cta-locked"}`}>
            <a href="#pricing" className="cta-btn">
              Empieza tu prueba gratuita de 7 días →
            </a>
            <p className="micro-trust">✓ Garantía 7 días · ✓ Cancela cuando quieras</p>
          </div>
        </div>
      </section>

      <div className="section-image-break">
        <img
          src={padelAsset("img/monitor-padel-crop.jpg")}
          alt="Pádel en pista"
          style={{ objectPosition: "center 24%" }}
        />
        <div className="img-overlay" />
      </div>

      <section id="agitation" className="section-pad has-bg-image">
        <div className="section-bg">
          <img src={padelAsset("img/vsl/padel-injury-pain.png")} alt="" style={{ objectPosition: "center top" }} />
          <div
            className="section-bg-overlay"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 52% 32%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.70) 60%, rgba(0,0,0,0.88) 100%), linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.82) 100%)",
            }}
          />
        </div>
        <div className="agitation-inner">
          <p className="pre-headline centered fade-up">¿TE SIENTES IDENTIFICADO?</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            Si juegas al pádel con pasión, pero algo siempre te frena...
          </h2>
          <div className="pain-list">
            {PAIN_POINTS.map((text) => (
              <div key={text} className="pain-item fade-up">
                <span className="pain-icon">✗</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <p className="agitation-close fade-up">Si has dicho sí a alguna de estas... esto es exactamente para ti.</p>
          <span className="arrow-down fade-up">↓</span>
        </div>
      </section>

      <section id="root-cause" className="section-pad has-bg-image">
        <div className="section-bg">
          <img src={padelAsset("img/vsl/gym-squat.png")} alt="" />
          <div className="section-bg-overlay" />
        </div>
        <div className="root-inner">
          <p className="pre-headline centered fade-up">EL VERDADERO PROBLEMA</p>
          <h2 className="headline fade-up">
            Tu cabeza quiere más partidos. Tu cuerpo te dice que <span className="accent">no puede</span>.
          </h2>
          <div className="root-block fade-up">
            <h3>El tercer set ya no es tuyo.</h3>
            <p>
              Llegas al segundo set justo. Al tercero, ya no eres el mismo jugador. Las piernas pesan, la cabeza se nubla
              y los errores se acumulan. No es falta de ganas — es que tu cuerpo no ha entrenado para aguantar lo que el
              pádel real exige. Y mientras tú te apagas, tus rivales siguen enchufados.
            </p>
          </div>
          <div className="root-block fade-up">
            <h3>Esa molestia que &quot;no es nada&quot;… lleva meses ahí.</h3>
            <p>
              El hombro, la rodilla, la espalda. Entrenas igual, juegas igual, y esperas que se vaya sola. A veces
              mejora. A veces empeora justo antes de un partido importante. Y en el fondo sabes que si no haces algo
              diferente, es cuestión de tiempo que se convierta en una lesión de verdad — semanas o meses fuera de la
              pista.
            </p>
          </div>
          <div className="root-block fade-up">
            <h3>Nadie te ha dado un plan hecho para esto.</h3>
            <p>
              El gimnasio genérico no entrena para el pádel. YouTube no sabe quién eres ni qué zonas tienes castigadas.
              Y un preparador privado a 40–120€ la sesión no es una opción realista. El resultado: sigues jugando sin
              estructura, acumulando fatiga, y rezando para que el cuerpo aguante.
            </p>
          </div>
          <p className="root-transition fade-up">
            El problema no es tu esfuerzo. Es que nadie te había dado el plan correcto. Hasta ahora.
          </p>
        </div>
      </section>

      <section id="solution" className="section-pad">
        <div className="solution-grid">
          <div className="solution-text">
            <p className="pre-headline fade-up">LA SOLUCIÓN</p>
            <h2 className="headline fade-up">
              Bivo: la preparación física de los <span className="accent">pros del pádel</span>, en tu bolsillo.
            </h2>
            <p className="solution-desc fade-up">
              Bivo es la primera app con inteligencia artificial diseñada específicamente para jugadores de pádel. Crea
              tu plan de entrenamiento personalizado desde cero basándose en tu nivel real, tus lesiones, tu
              disponibilidad horaria y tus objetivos. Y lo recalcula automáticamente cuando tu vida cambia.
            </p>
            <div className="value-points fade-up">
              {VALUE_POINTS.map((point) => (
                <div key={point} className="value-point">
                  <span className="check">✓</span> {point}
                </div>
              ))}
            </div>
            <div className="credential-box fade-up">
              <span className="trophy">🏆</span>
              <span>Premio Nacional a la Mejor Startup — Cámara de Comercio de España, 2024</span>
            </div>
          </div>

          <div className="phone-mockup fade-up">
            <div className="phone-mockup-wrap">
              <button type="button" className="carousel-arrow prev" onClick={carouselPrev} aria-label="Anterior">
                ‹
              </button>
              <div className="phone-frame">
                <div className="phone-screen-wrap">
                  {carouselImages.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`Bivo App — pantalla ${index + 1}`}
                      className={index === carouselIndex ? "active" : ""}
                    />
                  ))}
                </div>
              </div>
              <button type="button" className="carousel-arrow next" onClick={carouselNext} aria-label="Siguiente">
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section-pad has-bg-image">
        <div className="section-bg">
          <img src={padelAsset("img/vsl/gym-hipthrust.png")} alt="" />
          <div className="section-bg-overlay" />
        </div>
        <div className="benefits-header">
          <p className="pre-headline centered fade-up">LO QUE CAMBIA</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            Cuando entrenas con Bivo, se nota en pista.
          </h2>
        </div>
        <div className="benefits-grid">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="benefit-card has-photo fade-up">
              <div className="benefit-photo">
                <img
                  src={padelAsset(benefit.image)}
                  alt={benefit.title}
                  style={{ objectPosition: benefit.imagePosition }}
                />
              </div>
              <div className="benefit-body">
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="benefits-cta fade-up">
          <a href="#pricing" className="cta-btn">
            Empieza tu prueba gratuita de 7 días →
          </a>
          <p className="micro-trust">✓ Cancela cuando quieras · ✓ 7 días completamente gratis</p>
        </div>
      </section>

      <section id="testimonials" className="section-pad">
        <div className="testimonials-header">
          <p className="pre-headline centered fade-up">RESULTADOS REALES</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            Lo que dicen los jugadores de pádel que ya entrenan con Bivo.
          </h2>
          <p className="sub fade-up">Opiniones reales. Sin filtros.</p>
        </div>

        <div className="video-testimonials fade-up">
          {VIDEO_TESTIMONIALS.map((item) => (
            <div
              key={item.src}
              className="video-card"
              onClick={(e) => {
                const card = e.currentTarget;
                const video = card.querySelector("video");
                const btn = card.querySelector(".video-play-btn");
                if (video && btn) handleTestimonialClick(video, btn as HTMLElement);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                const card = e.currentTarget;
                const video = card.querySelector("video");
                const btn = card.querySelector(".video-play-btn");
                if (video && btn) handleTestimonialClick(video, btn as HTMLElement);
              }}
              role="button"
              tabIndex={0}
            >
              <video
                preload="auto"
                playsInline
                onLoadedMetadata={(e) => primeTestimonialFrame(e.currentTarget)}
                onEnded={(e) => {
                  const card = e.currentTarget.closest(".video-card");
                  card?.querySelector(".video-play-btn")?.classList.remove("hidden");
                }}
              >
                <source src={padelAsset(item.src)} type="video/mp4" />
              </video>
              <div className="video-play-btn">
                <div className="video-play-circle">
                  <SmallPlayIcon />
                </div>
                <span style={{ color: "#fff", fontSize: "13px", marginTop: "8px", fontWeight: 600 }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="appstore-reviews fade-up">
          <div className="appstore-reviews-header">
            <div className="appstore-badge">
              <AppleIcon /> App Store · 5 ★
            </div>
            <div className="appstore-badge">
              <GooglePlayIcon /> Google Play · 5 ★
            </div>
          </div>
          <div className="appstore-grid">
            {APPSTORE_REVIEWS.map((review) => (
              <div key={review.author} className="appstore-card">
                <div className="appstore-card-top">
                  <div className="appstore-stars">★★★★★</div>
                  <div className="appstore-platform">
                    {review.icon === "apple" ? <AppleIcon size={13} /> : <GooglePlayIcon size={13} />}
                    {review.platform}
                  </div>
                </div>
                <p className="appstore-quote">{review.quote}</p>
                <div className="appstore-author">{review.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="credibility" className="section-pad has-bg-image">
        <div className="section-bg">
          <img src={padelAsset("img/vsl/padel-panoramic.png")} alt="" style={{ objectPosition: "center 30%" }} />
          <div className="section-bg-overlay" />
        </div>
        <div className="credibility-header">
          <p className="pre-headline centered fade-up">NO LO DECIMOS NOSOTROS</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            Bivo está reconocido y avalado por quienes saben de deporte y tecnología.
          </h2>
        </div>
        <div className="awards-grid">
          <div className="award-card fade-up">
            <div className="award-card-bg">
              <img src={padelAsset("img/awards/dia-d-group.jpg")} alt="Equipo Bivo recogiendo el Premio Nacional" />
            </div>
            <div className="award-card-content">
              <div className="award-icon">🏆</div>
              <div className="award-name">Premio Nacional a la Mejor Startup</div>
              <div className="award-org">Programa Impulsa, Crea y Crece 2024 — Cámara de Comercio de España</div>
              <div className="award-date">2 de abril de 2025</div>
            </div>
          </div>
          <div className="award-card fade-up">
            <div className="award-card-bg">
              <img src={padelAsset("img/awards/dia-d-presentacion.jpg")} alt="Presentación de Bivo" />
            </div>
            <div className="award-card-content">
              <div className="award-icon">🥇</div>
              <div className="award-name">Mejor Idea de Negocio</div>
              <div className="award-org">Cámara de Comercio de Menorca</div>
              <div className="award-date">14 de enero de 2025</div>
            </div>
          </div>
        </div>
        <div className="partners-block fade-up">
          <p className="partners-label">Desarrollado con y para:</p>
          <div className="partners-logos">
            <img src={padelAsset("img/fpib.png")} alt="Federación Balear de Pádel" />
            <img src={padelAsset("img/mqc.png")} alt="Movement Quality Center" />
            <img src={padelAsset("img/pdpadel.jpg")} alt="Pdpadel" />
            <img src={padelAsset("img/emprenbit.png")} alt="EmprenBIT" />
          </div>
        </div>
        <div className="expert-card fade-up">
          <div className="expert-photo">
            <img src={padelAsset("img/team/Toni.png")} alt="Toni Bota" />
          </div>
          <div>
            <div className="expert-name">Toni Bota</div>
            <div className="expert-title">Preparador físico de jugadores ATP</div>
            <p className="expert-quote">
              &quot;La metodología detrás de Bivo es la misma que aplico con deportistas de élite. Adaptada a tu nivel, a
              tus lesiones y a tu vida.&quot;
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-pad">
        <div className="how-header">
          <p className="pre-headline centered fade-up">EN 5 PASOS</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            Empezar es tan fácil como jugar un punto rápido.
          </h2>
        </div>
        <div className="steps-grid">
          {STEPS.map((step, index) => (
            <div key={step.title} className="step-card fade-up">
              <div className="step-card-number">{index + 1}</div>
              <div className="step-card-img">
                <img src={padelAsset(step.image)} alt={step.title} style={{ objectPosition: step.imagePosition }} />
              </div>
              <div className="step-card-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="urgency-banner">
        <span className="urgency-icon">⏰</span>
        <span className="urgency-text">
          Precio de lanzamiento — Termina en: <strong>{countdown}</strong>
        </span>
      </div>

      <section id="pricing" className="section-pad">
        <div className="pricing-header">
          <p className="emotional-bridge fade-up">
            Ya sabes lo que pasa si no haces nada. Llevas tiempo aguantándolo.
            <br />
            La pregunta no es si quieres mejorar — es cuánto más vas a esperar.
          </p>
          <p className="pre-headline centered fade-up">SIN RIESGO. SIN COMPROMISO.</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            Empieza hoy. Los primeros 7 días son completamente gratis.
          </h2>
          <p className="sub fade-up" style={{ textAlign: "center", color: "rgba(255,255,255,0.72)", fontSize: "18px", marginTop: "12px" }}>
            Cancela cuando quieras con un clic.
          </p>
        </div>

        <div className="price-anchor fade-up">
          <div className="anchor-old">
            <div className="label">Preparador físico privado</div>
            <div className="price">40€ – 120€ por sesión</div>
          </div>
          <div className="anchor-vs">VS</div>
          <div className="anchor-new">
            <div className="label">Bivo</div>
            <div className="price">Desde 7,50€/mes</div>
          </div>
        </div>

        <div className="pricing-grid">
          <div className="price-card fade-up">
            <div className="price-label">MENSUAL</div>
            <div className="price-amount">
              14,99€ <span>/mes</span>
            </div>
            <div className="price-sub">Sin compromiso</div>
            <Link to={signupPath} className="cta-btn">
              Empieza 7 días gratis →
            </Link>
          </div>
          <div className="price-card featured fade-up">
            <div className="price-badge">⭐ MÁS POPULAR — PRECIO LANZAMIENTO</div>
            <div className="price-label">TRIMESTRAL</div>
            <div className="price-amount">
              11,66€ <span>/mes</span>
            </div>
            <div className="price-amount-small">34,99€ cada 3 meses</div>
            <div className="price-save">Ahorras un 22%</div>
            <Link to={signupPath} className="cta-btn">
              Empieza 7 días gratis →
            </Link>
          </div>
          <div className="price-card fade-up">
            <div className="price-badge" style={{ background: "#1a1a1a", color: "var(--green)", border: "1px solid var(--green)" }}>
              💎 MEJOR VALOR
            </div>
            <div className="price-label">ANUAL</div>
            <div className="price-amount">
              7,50€ <span>/mes</span>
            </div>
            <div className="price-amount-small">89,99€ al año</div>
            <div className="price-save">Ahorras un 50% · Ahorras 89,89€/año</div>
            <Link to={signupPath} className="cta-btn">
              Empieza 7 días gratis →
            </Link>
          </div>
        </div>

        <div className="included-list fade-up">
          {INCLUDED.map((item) => (
            <div key={item} className="included-item">
              <span className="check">✓</span> {item}
            </div>
          ))}
        </div>

        <div className="guarantee-box fade-up">
          <span className="guarantee-icon">🛡️</span>
          <div>
            <strong>Garantía de satisfacción 7 días</strong>
            <p>
              Si en siete días no ves el valor, cancela sin costes con sólo dos clics desde dentro de la app. Sin
              complicaciones.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="section-pad">
        <div className="faq-header">
          <p className="pre-headline centered fade-up">RESOLVEMOS TUS DUDAS</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            Preguntas frecuentes
          </h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <div key={item.q} className={`faq-item${openFaq === index ? " open" : ""}`}>
              <button type="button" className="faq-question" onClick={() => toggleFaq(index)}>
                <span className="faq-question-text">{item.q}</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="final-cta-box fade-up">
          <h3 className="headline">¿Todavía tienes dudas?</h3>
          <p className="sub">Pruébalo 7 días sin coste y decide tú mismo.</p>
          <Link to={signupPath} className="cta-btn">
            Empieza tu prueba gratuita de 7 días →
          </Link>
          <p className="micro-trust">✓ Sin compromiso · ✓ Cancela cuando quieras</p>
        </div>
      </section>

      <footer>
        <img src={padelAsset("assets/logo-green.png")} alt="Bivo" />
        <div className="footer-links">
          <Link to={localePath(sportLegalPath("padel", "privacy"))}>Política de Privacidad</Link>
          <Link to={localePath(sportLegalPath("padel", "terms"))}>Términos de Uso</Link>
        </div>
        <p className="footer-copy">© 2025 Bivo Training. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PadelLandingPage;
