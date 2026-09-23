import SportLandingAccessGate from "@/components/sport-landing/SportLandingAccessGate";
import SportVslLanding, { type SportVslConfig } from "@/components/sport-landing/SportVslLanding";
import { useSportLandingGate } from "@/hooks/useSportLandingGate";
import { PICKLEBALL_APP_SCREEN_CAROUSEL } from "@/lib/pickleballAppScreenCarousel";
import { pickleballAsset } from "@/lib/pickleballLandingAssets";
import "./PickleballLanding.css";

const PICKLEBALL_CONFIG: SportVslConfig = {
  className: "pickleball-landing",
  slug: "pickleball",
  pageTitle: "Bivo Training — Preparación física para pickleball",
  asset: pickleballAsset,
  carouselImages: PICKLEBALL_APP_SCREEN_CAROUSEL,
  hero: {
    image: "img/pickleball.jpg",
    alt: "Jugador de pickleball en acción",
    preHeadline: "PARA JUGADORES DE PICKLEBALL QUE QUIEREN RENDIR MÁS Y LESIONARSE MENOS",
    sub: "Descubre el método de preparación física que usan los profesionales del pickleball, ahora adaptado a tu nivel y a tu vida.",
  },
  agitation: {
    image: "img/vsl/pickleball-player-court.jpg",
    imagePosition: "center 70%",
    headline: "Si juegas al pickleball con pasión, pero algo siempre te frena...",
    painPoints: [
      "Acabas los partidos exhausto cuando tus rivales todavía tienen gasolina de sobra.",
      "Tienes miedo de lesionarte: llevas meses con molestias en el hombro, el codo o la rodilla que nunca terminan de irse, y cada partido es una ruleta.",
      "Sabes que si te lesionas de verdad, semanas o meses fuera de la pista. Y eso no te lo puedes permitir.",
      "Buscas rutinas en YouTube pero ninguna está pensada para las exigencias físicas reales del pickleball.",
      "Entrenas sin estructura y al final no sabes si lo que haces sirve para algo o si incluso te está haciendo daño.",
      "No tienes tiempo ni presupuesto para un preparador físico privado (40–120€/sesión).",
    ],
  },
  rootCause: {
    image: "img/vsl/gym-squat.png",
    blocks: [
      {
        title: "El 10-10 ya no es tuyo.",
        text: "Llegas a 9-9 justito. Al final del partido, ya no eres el mismo jugador. Los smashes pesan, los dinks en la kitchen se quedan cortos y los desplazamientos laterales se atrasan. No es falta de ganas — es que tu cuerpo no ha entrenado para aguantar lo que el pickleball real exige. Y mientras tú te apagas, tus rivales siguen enchufados.",
      },
      {
        title: "Esa molestia que \"no es nada\"… lleva meses ahí.",
        text: "El hombro, el codo, la rodilla. Entrenas igual, juegas igual, y esperas que se vaya sola. A veces mejora. A veces empeora justo antes de un partido importante. Y en el fondo sabes que si no haces algo diferente, es cuestión de tiempo que se convierta en una lesión de verdad — semanas o meses fuera de la pista.",
      },
      {
        title: "Nadie te ha dado un plan hecho para esto.",
        text: "El gimnasio genérico no entrena para el pickleball. YouTube no sabe quién eres ni qué zonas tienes castigadas. Y un preparador privado a 40–120€ la sesión no es una opción realista. El resultado: sigues jugando sin estructura, acumulando fatiga, y rezando para que el cuerpo aguante.",
      },
    ],
  },
  solution: {
    accent: "pros del pickleball",
    desc: "Bivo es la primera app con inteligencia artificial diseñada específicamente para jugadores de pickleball. Crea tu plan de entrenamiento personalizado desde cero basándose en tu nivel real, tus lesiones, tu disponibilidad horaria y tus objetivos. Y lo recalcula automáticamente cuando tu vida cambia.",
  },
  benefits: {
    bgImage: "img/vsl/gym-hipthrust.png",
    items: [
      {
        image: "img/vsl/pickleball-player-court.jpg",
        imagePosition: "center 70%",
        title: "Aguanta más que tus rivales",
        text: "Entrena la resistencia explosiva del pickleball. Llega igual de fuerte al 10-10 que al primer punto. Sin piernas de plomo. Sin perder el smash en el momento decisivo.",
      },
      {
        image: "img/vsl/onboarding-dolor.png",
        imagePosition: "center 18%",
        title: "Entrena sin miedo a lesionarte",
        text: "Planes diseñados desde el primer día para proteger tus hombros, codos y rodillas. El trabajo preventivo de Bivo reduce el riesgo de lesión antes de que aparezca. Más partidos, menos tiempo parado.",
      },
      {
        image: "img/vsl/entrenamiento-kettlebell.png",
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
    ],
  },
  testimonialsHeadline: "Lo que dicen los jugadores de pickleball que ya entrenan con Bivo.",
  reviews: [
    {
      platform: "App Store",
      quote:
        '"Llevaba un año con molestias en el hombro por los smashes. Desde que entreno con Bivo no he vuelto a tener problemas. Y además llego mejor al final de los partidos."',
      author: "Carlos R. · Jugador de pickleball",
      icon: "apple",
    },
    {
      platform: "Google Play",
      quote:
        '"En 6 semanas noté un cambio brutal en los desplazamientos. Antes me moría en el 10-10, ahora soy el que más aguanta del club."',
      author: "Javier M. · Jugador de pickleball",
      icon: "google",
    },
    {
      platform: "App Store",
      quote:
        '"Por fin un entrenamiento que se adapta a mis torneos. Nunca llego cansada a los partidos importantes. Es como tener un preparador personal."',
      author: "Laura G. · Jugadora de pickleball",
      icon: "apple",
    },
    {
      platform: "Google Play",
      quote:
        '"Lo que más me sorprende es que el plan cambia según cómo me encuentro cada semana. Nunca había tenido eso con ninguna app de entrenamiento."',
      author: "Marta S. · Jugadora de pickleball",
      icon: "google",
    },
    {
      platform: "App Store",
      quote:
        '"Llevo tres meses y me he olvidado de las molestias de codo que tenía crónicas. El plan de prevención funciona de verdad."',
      author: "Alejandro T. · Jugador de pickleball",
      icon: "apple",
    },
    {
      platform: "Google Play",
      quote:
        '"Antes no podía jugar dos partidos seguidos. Ahora termino el segundo igual de fresco que empecé el primero. No me lo puedo creer."',
      author: "Rocío F. · Jugadora de pickleball",
      icon: "google",
    },
  ],
  panoramicImage: "img/vsl/pickleball-panoramic.jpg",
  partners: [
    { file: "img/sabadell-pickleball.png", alt: "Sabadell Pickleball Club Academy" },
    { file: "img/mqc.png", alt: "Movement Quality Center" },
    { file: "img/logosalle.png", alt: "C.T. La Salle" },
    { file: "img/emprenbit.png", alt: "EmprenBIT" },
  ],
  howItWorksHeadline: "Empezar es tan fácil como un saque.",
  otherSportsFaq: {
    q: "¿Funciona también para pádel, tenis o bádminton?",
    a: "Sí. Aunque esta página está orientada al pickleball, Bivo cubre también pádel, tenis y bádminton con planes específicos para cada deporte. Cuando haces el test inicial, indicas tu deporte y el plan se crea en base a sus exigencias concretas.",
  },
};

const PickleballLandingPage = () => {
  const { unlocked, login, submitting, error } = useSportLandingGate("pickleball");

  if (!unlocked) {
    return (
      <SportLandingAccessGate
        landingClass="pickleball-landing"
        heroSrc={pickleballAsset("img/pickleball.jpg")}
        logoSrc={pickleballAsset("assets/logo-green.png")}
        title="Landing de pickleball"
        documentTitle="Bivo Training — Acceso pickleball"
        onSubmit={login}
        submitting={submitting}
        error={error}
      />
    );
  }

  return <SportVslLanding config={PICKLEBALL_CONFIG} />;
};

export default PickleballLandingPage;
