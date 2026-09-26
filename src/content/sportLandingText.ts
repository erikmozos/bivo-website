import type { SportVslConfig } from "@/components/sport-landing/SportVslLanding";
import { landingLang, type LandingLang } from "@/content/vslUi";

export type SportReview = {
  platform: string;
  quote: string;
  author: string;
  icon: "apple" | "google";
};

export type SportBenefitText = { title: string; text: string };

export type SportLandingText = {
  pageTitle: string;
  gateTitle: string;
  gateDocumentTitle: string;
  heroAlt: string;
  heroPre: string;
  heroSub: string;
  agitationHeadline: string;
  painPoints: string[];
  rootBlocks: { title: string; text: string }[];
  solutionAccent: string;
  solutionDesc: string;
  benefits: SportBenefitText[];
  testimonialsHeadline: string;
  reviews: SportReview[];
  partnerAlts: string[];
  howHeadline: string;
  otherSportsFaq: { q: string; a: string };
  expertTitle?: string;
  videoLabels?: string[];
};

const sharedPain = {
  es: [
    "Acabas los partidos exhausto cuando tus rivales todavía tienen gasolina de sobra.",
    "Sabes que si te lesionas de verdad, semanas o meses fuera de la pista. Y eso no te lo puedes permitir.",
    "Entrenas sin estructura y al final no sabes si lo que haces sirve para algo o si incluso te está haciendo daño.",
    "No tienes tiempo ni presupuesto para un preparador físico privado (40–120€/sesión).",
  ],
  en: [
    "You finish matches exhausted while your opponents still have plenty left in the tank.",
    "You know that a real injury means weeks or months off court. And you can't afford that.",
    "You train without a structure, and in the end you don't know if what you're doing helps or is even hurting you.",
    "You don't have the time or the budget for a private physical trainer (€40–€120 per session).",
  ],
};

const sharedNag = {
  es: {
    title: "Esa molestia que \"no es nada\"… lleva meses ahí.",
    text: "Entrenas igual, juegas igual, y esperas que se vaya sola. A veces mejora. A veces empeora justo antes de un partido importante. Y en el fondo sabes que si no haces algo diferente, es cuestión de tiempo que se convierta en una lesión de verdad — semanas o meses fuera de la pista.",
  },
  en: {
    title: "That niggle that \"isn't anything\"… has been there for months.",
    text: "You train the same, you play the same, and you hope it goes away on its own. Sometimes it improves. Sometimes it gets worse right before an important match. Deep down you know that if you don't do something different, it's only a matter of time before it becomes a real injury — weeks or months off court.",
  },
};

const sharedNoPlan = {
  es: "Y un preparador privado a 40–120€ la sesión no es una opción realista. El resultado: sigues jugando sin estructura, acumulando fatiga, y rezando para que el cuerpo aguante.",
  en: "And a private trainer at €40–€120 a session isn't a realistic option. The result: you keep playing without a structure, stacking fatigue, and hoping your body holds up.",
};

const benefitProgress = {
  es: {
    title: "Por fin ves cómo mejoras",
    text: "Estadísticas claras de tu progreso semana a semana. Sabes exactamente qué has mejorado, cuánto te falta y por qué cada sesión tiene sentido.",
  },
  en: {
    title: "You finally see yourself improving",
    text: "Clear week-by-week progress stats. You know exactly what you've improved, how far you still have to go, and why every session matters.",
  },
};

const benefitLogistics = {
  es: {
    title: "Sin excusas logísticas",
    text: "En casa, en el club, en el hotel o en el jardín. Sin equipamiento especial. Cuando tú puedas. Bivo se adapta a tu vida, no al revés.",
  },
  en: {
    title: "No logistical excuses",
    text: "At home, at the club, in a hotel, or in the garden. No special equipment. Whenever you can. Bivo adapts to your life, not the other way around.",
  },
};

function review(
  lang: LandingLang,
  quoteEs: string,
  quoteEn: string,
  authorEs: string,
  authorEn: string,
  icon: "apple" | "google",
): SportReview {
  return {
    platform: icon === "apple" ? "App Store" : "Google Play",
    quote: lang === "en" ? quoteEn : quoteEs,
    author: lang === "en" ? authorEn : authorEs,
    icon,
  };
}

function padel(lang: LandingLang): SportLandingText {
  const L = lang === "en";
  return {
    pageTitle: L
      ? "Bivo Training — Physical preparation for padel"
      : "Bivo Training — Preparación física para pádel",
    gateTitle: L ? "Padel landing" : "Landing de pádel",
    gateDocumentTitle: L ? "Bivo Training — Padel access" : "Bivo Training — Acceso pádel",
    heroAlt: L ? "Padel player in action" : "Jugador de pádel en acción",
    heroPre: L
      ? "FOR PADEL PLAYERS WHO WANT TO PERFORM MORE AND GET INJURED LESS"
      : "PARA JUGADORES DE PÁDEL QUE QUIEREN RENDIR MÁS Y LESIONARSE MENOS",
    heroSub: L
      ? "Discover the physical preparation method used by padel professionals, now adapted to your level and your life."
      : "Descubre el método de preparación física que usan los profesionales del pádel, ahora adaptado a tu nivel y a tu vida.",
    agitationHeadline: L
      ? "If you play padel with passion, but something always holds you back..."
      : "Si juegas al pádel con pasión, pero algo siempre te frena...",
    painPoints: [
      sharedPain[lang][0],
      L
        ? "You're afraid of getting injured: you've had shoulder, knee, or back niggles for months that never fully go away, and every match is a gamble."
        : "Tienes miedo de lesionarte: llevas meses con molestias en el hombro, la rodilla o la espalda que nunca terminan de irse, y cada partido es una ruleta.",
      sharedPain[lang][1],
      L
        ? "You look for routines on YouTube, but none of them are built for the real physical demands of padel."
        : "Buscas rutinas en YouTube pero ninguna está pensada para las exigencias físicas reales del pádel.",
      sharedPain[lang][2],
      sharedPain[lang][3],
    ],
    rootBlocks: [
      {
        title: L ? "The third set is no longer yours." : "El tercer set ya no es tuyo.",
        text: L
          ? "You reach the second set just about. By the third, you're not the same player. Your legs are heavy, your head goes cloudy, and the errors pile up. It isn't a lack of will — your body hasn't trained to withstand what real padel demands. And while you fade, your opponents stay switched on."
          : "Llegas al segundo set justo. Al tercero, ya no eres el mismo jugador. Las piernas pesan, la cabeza se nubla y los errores se acumulan. No es falta de ganas — es que tu cuerpo no ha entrenado para aguantar lo que el pádel real exige. Y mientras tú te apagas, tus rivales siguen enchufados.",
      },
      {
        title: L ? "That niggle that \"isn't anything\"… has been there for months." : sharedNag.es.title,
        text: L
          ? "The shoulder, the knee, the back. " + sharedNag.en.text
          : "El hombro, la rodilla, la espalda. " + sharedNag.es.text,
      },
      {
        title: L ? "Nobody has given you a plan built for this." : "Nadie te ha dado un plan hecho para esto.",
        text: L
          ? "A generic gym doesn't train you for padel. YouTube doesn't know who you are or which areas are already worn down. " + sharedNoPlan.en
          : "El gimnasio genérico no entrena para el pádel. YouTube no sabe quién eres ni qué zonas tienes castigadas. " + sharedNoPlan.es,
      },
    ],
    solutionAccent: L ? "padel pros" : "pros del pádel",
    solutionDesc: L
      ? "Bivo is the first artificial-intelligence app designed specifically for padel players. It builds your personalized training plan from scratch based on your real level, your injuries, your schedule, and your goals. And it recalculates automatically when your life changes."
      : "Bivo es la primera app con inteligencia artificial diseñada específicamente para jugadores de pádel. Crea tu plan de entrenamiento personalizado desde cero basándose en tu nivel real, tus lesiones, tu disponibilidad horaria y tus objetivos. Y lo recalcula automáticamente cuando tu vida cambia.",
    benefits: [
      {
        title: L ? "Outlast your opponents" : "Aguanta más que tus rivales",
        text: L
          ? "Train the specific endurance padel demands. Arrive at the third set as strong as you started the first. No cramps. No running out of air at the decisive moment."
          : "Entrena la resistencia específica del pádel. Llega igual de fuerte al tercer set que al primero. Sin calambres. Sin quedarte sin pulmones en el momento decisivo.",
      },
      {
        title: L ? "Train without fearing injury" : "Entrena sin miedo a lesionarte",
        text: L
          ? "Plans designed from day one to protect your shoulders, knees, and back. Bivo's preventive work lowers injury risk before it shows up. More matches, less time sidelined."
          : "Planes diseñados desde el primer día para proteger tus hombros, rodillas y espalda. El trabajo preventivo de Bivo reduce el riesgo de lesión antes de que aparezca. Más partidos, menos tiempo parado.",
      },
      benefitProgress[lang],
      benefitLogistics[lang],
    ],
    testimonialsHeadline: L
      ? "What padel players who already train with Bivo are saying."
      : "Lo que dicen los jugadores de pádel que ya entrenan con Bivo.",
    reviews: [
      review(lang, '"Llevaba un año con molestias en el hombro. Desde que entreno con Bivo no he vuelto a tener problemas. Y además juego mejor."', '"I\'d had shoulder pain for a year. Since I started training with Bivo, the problems haven\'t come back. And I play better."', "Carlos R. · Jugador de pádel", "Carlos R. · Padel player", "apple"),
      review(lang, '"En 6 semanas noté un cambio brutal en la resistencia. Antes me moría en el tercer set, ahora soy el que más aguanta del equipo."', '"In 6 weeks I noticed a huge change in endurance. I used to die in the third set. Now I\'m the one who lasts longest on the team."', "Javier M. · Jugador de pádel", "Javier M. · Padel player", "google"),
      review(lang, '"Por fin un entrenamiento que se adapta a mis torneos. Nunca llego cansada a los partidos importantes. Es como tener un preparador personal."', '"Finally a training plan that adapts to my tournaments. I never arrive tired for the important matches. It\'s like having a personal trainer."', "Laura G. · Jugadora de pádel", "Laura G. · Padel player", "apple"),
      review(lang, '"Lo que más me sorprende es que el plan cambia según cómo me encuentro cada semana. Nunca había tenido eso con ninguna app de entrenamiento."', '"What surprises me most is that the plan changes based on how I feel each week. I\'d never had that with any training app."', "Marta S. · Jugadora de pádel", "Marta S. · Padel player", "google"),
      review(lang, '"Llevo tres meses y me he olvidado de las molestias de rodilla que tenía crónicas. El plan de prevención funciona de verdad."', '"After three months I\'ve forgotten the chronic knee pain I used to have. The prevention plan actually works."', "Alejandro T. · Jugador de pádel", "Alejandro T. · Padel player", "apple"),
      review(lang, '"Antes no podía jugar dos partidos seguidos. Ahora termino el segundo igual de fresco que empecé el primero. No me lo puedo creer."', '"I used to be unable to play two matches in a row. Now I finish the second as fresh as I started the first. I can\'t believe it."', "Rocío F. · Jugadora de pádel", "Rocío F. · Padel player", "google"),
    ],
    partnerAlts: ["Federación Balear de Pádel", "Movement Quality Center", "Pdpadel", "EmprenBIT"],
    howHeadline: L ? "Starting is as easy as playing a quick point." : "Empezar es tan fácil como jugar un punto rápido.",
    otherSportsFaq: {
      q: L ? "Does it also work for tennis, pickleball, or badminton?" : "¿Funciona también para tenis, pickleball o bádminton?",
      a: L
        ? "Yes. This page is focused on padel, and Bivo also covers tennis, pickleball, and badminton with plans specific to each sport. In the initial test you choose your sport and the plan is built around its actual demands."
        : "Sí. Aunque esta página está orientada al pádel, Bivo cubre también tenis, pickleball y bádminton con planes específicos para cada deporte. Cuando haces el test inicial, indicas tu deporte y el plan se crea en base a sus exigencias concretas.",
    },
    expertTitle: L ? "Physical trainer of ATP players" : "Preparador físico de jugadores ATP",
    videoLabels: L ? ["Nura · Padel", "Pedro · Padel", "Paloma · Padel", "Mila · Padel"] : ["Nura · Pádel", "Pedro · Pádel", "Paloma · Pádel", "Mila · Pádel"],
  };
}

function tenis(lang: LandingLang): SportLandingText {
  const L = lang === "en";
  return {
    pageTitle: L ? "Bivo Training — Physical preparation for tennis" : "Bivo Training — Preparación física para tenis",
    gateTitle: L ? "Tennis landing" : "Landing de tenis",
    gateDocumentTitle: L ? "Bivo Training — Tennis access" : "Bivo Training — Acceso tenis",
    heroAlt: L ? "Tennis player in action" : "Jugador de tenis en acción",
    heroPre: L
      ? "FOR TENNIS PLAYERS WHO WANT TO PERFORM MORE AND GET INJURED LESS"
      : "PARA JUGADORES DE TENIS QUE QUIEREN RENDIR MÁS Y LESIONARSE MENOS",
    heroSub: L
      ? "Discover the physical preparation method used by tennis professionals, now adapted to your level and your life."
      : "Descubre el método de preparación física que usan los profesionales del tenis, ahora adaptado a tu nivel y a tu vida.",
    agitationHeadline: L
      ? "If you play tennis with passion, but something always holds you back..."
      : "Si juegas al tenis con pasión, pero algo siempre te frena...",
    painPoints: [
      sharedPain[lang][0],
      L
        ? "You're afraid of getting injured: you've had shoulder, elbow, or knee niggles for months that never fully go away, and every match is a gamble."
        : "Tienes miedo de lesionarte: llevas meses con molestias en el hombro, el codo o la rodilla que nunca terminan de irse, y cada partido es una ruleta.",
      sharedPain[lang][1],
      L
        ? "You look for routines on YouTube, but none of them are built for the real physical demands of tennis."
        : "Buscas rutinas en YouTube pero ninguna está pensada para las exigencias físicas reales del tenis.",
      sharedPain[lang][2],
      sharedPain[lang][3],
    ],
    rootBlocks: [
      {
        title: L ? "The tie-break is no longer yours." : "El tie-break ya no es tuyo.",
        text: L
          ? "You reach 5-5 just about. By the end of the set, you're not the same player. The serve loses pace, the return falls short, and the runs to the baseline come late. It isn't a lack of will — your body hasn't trained to withstand what real tennis demands. And while you fade, your opponents stay switched on."
          : "Llegas a 5-5 justito. Al final del set, ya no eres el mismo jugador. El saque pierde potencia, el resto se queda corto y las carreras a la línea de fondo se atrasan. No es falta de ganas — es que tu cuerpo no ha entrenado para aguantar lo que el tenis real exige. Y mientras tú te apagas, tus rivales siguen enchufados.",
      },
      {
        title: L ? sharedNag.en.title : sharedNag.es.title,
        text: L ? "The shoulder, the elbow, the knee. " + sharedNag.en.text : "El hombro, el codo, la rodilla. " + sharedNag.es.text,
      },
      {
        title: L ? "Nobody has given you a plan built for this." : "Nadie te ha dado un plan hecho para esto.",
        text: L
          ? "A generic gym doesn't train you for tennis. YouTube doesn't know who you are or which areas are already worn down. " + sharedNoPlan.en
          : "El gimnasio genérico no entrena para el tenis. YouTube no sabe quién eres ni qué zonas tienes castigadas. " + sharedNoPlan.es,
      },
    ],
    solutionAccent: L ? "tennis pros" : "pros del tenis",
    solutionDesc: L
      ? "Bivo is the first artificial-intelligence app designed specifically for tennis players. It builds your personalized training plan from scratch based on your real level, your injuries, your schedule, and your goals. And it recalculates automatically when your life changes."
      : "Bivo es la primera app con inteligencia artificial diseñada específicamente para jugadores de tenis. Crea tu plan de entrenamiento personalizado desde cero basándose en tu nivel real, tus lesiones, tu disponibilidad horaria y tus objetivos. Y lo recalcula automáticamente cuando tu vida cambia.",
    benefits: [
      {
        title: L ? "Outlast your opponents" : "Aguanta más que tus rivales",
        text: L
          ? "Train the explosive endurance tennis demands. Arrive at the fifth set as strong as you started the first. No heavy legs. No losing your serve at the decisive moment."
          : "Entrena la resistencia explosiva del tenis. Llega igual de fuerte al quinto set que al primero. Sin piernas de plomo. Sin perder el saque en el momento decisivo.",
      },
      {
        title: L ? "Train without fearing injury" : "Entrena sin miedo a lesionarte",
        text: L
          ? "Plans designed from day one to protect your shoulders, elbows, and knees. Bivo's preventive work lowers injury risk before it shows up. More matches, less time sidelined."
          : "Planes diseñados desde el primer día para proteger tus hombros, codos y rodillas. El trabajo preventivo de Bivo reduce el riesgo de lesión antes de que aparezca. Más partidos, menos tiempo parado.",
      },
      benefitProgress[lang],
      benefitLogistics[lang],
    ],
    testimonialsHeadline: L
      ? "What tennis players who already train with Bivo are saying."
      : "Lo que dicen los jugadores de tenis que ya entrenan con Bivo.",
    reviews: [
      review(lang, '"Llevaba un año con molestias en el codo por el resto. Desde que entreno con Bivo no he vuelto a tener problemas. Y además llego mejor al final de los sets."', '"I\'d had elbow pain from returning for a year. Since I started training with Bivo, the problems haven\'t come back. And I finish sets in better shape."', "Carlos R. · Jugador de tenis", "Carlos R. · Tennis player", "apple"),
      review(lang, '"En 6 semanas noté un cambio brutal en los desplazamientos. Antes me moría en el tercer set, ahora soy el que más aguanta del club."', '"In 6 weeks I noticed a huge change in my movement. I used to die in the third set. Now I\'m the one who lasts longest at the club."', "Javier M. · Jugador de tenis", "Javier M. · Tennis player", "google"),
      review(lang, '"Por fin un entrenamiento que se adapta a mis torneos. Nunca llego cansada a los partidos importantes. Es como tener un preparador personal."', '"Finally a training plan that adapts to my tournaments. I never arrive tired for the important matches. It\'s like having a personal trainer."', "Laura G. · Jugadora de tenis", "Laura G. · Tennis player", "apple"),
      review(lang, '"Lo que más me sorprende es que el plan cambia según cómo me encuentro cada semana. Nunca había tenido eso con ninguna app de entrenamiento."', '"What surprises me most is that the plan changes based on how I feel each week. I\'d never had that with any training app."', "Marta S. · Jugadora de tenis", "Marta S. · Tennis player", "google"),
      review(lang, '"Llevo tres meses y me he olvidado de las molestias de hombro que tenía crónicas. El plan de prevención funciona de verdad."', '"After three months I\'ve forgotten the chronic shoulder pain I used to have. The prevention plan actually works."', "Alejandro T. · Jugador de tenis", "Alejandro T. · Tennis player", "apple"),
      review(lang, '"Antes no podía jugar dos partidos seguidos. Ahora termino el segundo igual de fresco que empecé el primero. No me lo puedo creer."', '"I used to be unable to play two matches in a row. Now I finish the second as fresh as I started the first. I can\'t believe it."', "Rocío F. · Jugadora de tenis", "Rocío F. · Tennis player", "google"),
    ],
    partnerAlts: ["Movement Quality Center", "C.T. La Salle", "EmprenBIT"],
    howHeadline: L ? "Starting is as easy as a serve." : "Empezar es tan fácil como un saque.",
    otherSportsFaq: {
      q: L ? "Does it also work for padel, pickleball, or badminton?" : "¿Funciona también para pádel, pickleball o bádminton?",
      a: L
        ? "Yes. This page is focused on tennis, and Bivo also covers padel, pickleball, and badminton with plans specific to each sport. In the initial test you choose your sport and the plan is built around its actual demands."
        : "Sí. Aunque esta página está orientada al tenis, Bivo cubre también pádel, pickleball y bádminton con planes específicos para cada deporte. Cuando haces el test inicial, indicas tu deporte y el plan se crea en base a sus exigencias concretas.",
    },
  };
}

function pickleball(lang: LandingLang): SportLandingText {
  const L = lang === "en";
  return {
    pageTitle: L
      ? "Bivo Training — Physical preparation for pickleball"
      : "Bivo Training — Preparación física para pickleball",
    gateTitle: L ? "Pickleball landing" : "Landing de pickleball",
    gateDocumentTitle: L ? "Bivo Training — Pickleball access" : "Bivo Training — Acceso pickleball",
    heroAlt: L ? "Pickleball player in action" : "Jugador de pickleball en acción",
    heroPre: L
      ? "FOR PICKLEBALL PLAYERS WHO WANT TO PERFORM MORE AND GET INJURED LESS"
      : "PARA JUGADORES DE PICKLEBALL QUE QUIEREN RENDIR MÁS Y LESIONARSE MENOS",
    heroSub: L
      ? "Discover the physical preparation method used by pickleball professionals, now adapted to your level and your life."
      : "Descubre el método de preparación física que usan los profesionales del pickleball, ahora adaptado a tu nivel y a tu vida.",
    agitationHeadline: L
      ? "If you play pickleball with passion, but something always holds you back..."
      : "Si juegas al pickleball con pasión, pero algo siempre te frena...",
    painPoints: [
      sharedPain[lang][0],
      L
        ? "You're afraid of getting injured: you've had shoulder, elbow, or knee niggles for months that never fully go away, and every match is a gamble."
        : "Tienes miedo de lesionarte: llevas meses con molestias en el hombro, el codo o la rodilla que nunca terminan de irse, y cada partido es una ruleta.",
      sharedPain[lang][1],
      L
        ? "You look for routines on YouTube, but none of them are built for the real physical demands of pickleball."
        : "Buscas rutinas en YouTube pero ninguna está pensada para las exigencias físicas reales del pickleball.",
      sharedPain[lang][2],
      sharedPain[lang][3],
    ],
    rootBlocks: [
      {
        title: L ? "10-10 is no longer yours." : "El 10-10 ya no es tuyo.",
        text: L
          ? "You reach 9-9 just about. By the end of the match, you're not the same player. Smashes feel heavy, dinks at the kitchen fall short, and lateral moves come late. It isn't a lack of will — your body hasn't trained to withstand what real pickleball demands. And while you fade, your opponents stay switched on."
          : "Llegas a 9-9 justito. Al final del partido, ya no eres el mismo jugador. Los smashes pesan, los dinks en la kitchen se quedan cortos y los desplazamientos laterales se atrasan. No es falta de ganas — es que tu cuerpo no ha entrenado para aguantar lo que el pickleball real exige. Y mientras tú te apagas, tus rivales siguen enchufados.",
      },
      {
        title: L ? sharedNag.en.title : sharedNag.es.title,
        text: L ? "The shoulder, the elbow, the knee. " + sharedNag.en.text : "El hombro, el codo, la rodilla. " + sharedNag.es.text,
      },
      {
        title: L ? "Nobody has given you a plan built for this." : "Nadie te ha dado un plan hecho para esto.",
        text: L
          ? "A generic gym doesn't train you for pickleball. YouTube doesn't know who you are or which areas are already worn down. " + sharedNoPlan.en
          : "El gimnasio genérico no entrena para el pickleball. YouTube no sabe quién eres ni qué zonas tienes castigadas. " + sharedNoPlan.es,
      },
    ],
    solutionAccent: L ? "pickleball pros" : "pros del pickleball",
    solutionDesc: L
      ? "Bivo is the first artificial-intelligence app designed specifically for pickleball players. It builds your personalized training plan from scratch based on your real level, your injuries, your schedule, and your goals. And it recalculates automatically when your life changes."
      : "Bivo es la primera app con inteligencia artificial diseñada específicamente para jugadores de pickleball. Crea tu plan de entrenamiento personalizado desde cero basándose en tu nivel real, tus lesiones, tu disponibilidad horaria y tus objetivos. Y lo recalcula automáticamente cuando tu vida cambia.",
    benefits: [
      {
        title: L ? "Outlast your opponents" : "Aguanta más que tus rivales",
        text: L
          ? "Train the explosive endurance pickleball demands. Arrive at 10-10 as strong as you started the first point. No heavy legs. No losing the smash at the decisive moment."
          : "Entrena la resistencia explosiva del pickleball. Llega igual de fuerte al 10-10 que al primer punto. Sin piernas de plomo. Sin perder el smash en el momento decisivo.",
      },
      {
        title: L ? "Train without fearing injury" : "Entrena sin miedo a lesionarte",
        text: L
          ? "Plans designed from day one to protect your shoulders, elbows, and knees. Bivo's preventive work lowers injury risk before it shows up. More matches, less time sidelined."
          : "Planes diseñados desde el primer día para proteger tus hombros, codos y rodillas. El trabajo preventivo de Bivo reduce el riesgo de lesión antes de que aparezca. Más partidos, menos tiempo parado.",
      },
      benefitProgress[lang],
      benefitLogistics[lang],
    ],
    testimonialsHeadline: L
      ? "What pickleball players who already train with Bivo are saying."
      : "Lo que dicen los jugadores de pickleball que ya entrenan con Bivo.",
    reviews: [
      review(lang, '"Llevaba un año con molestias en el hombro por los smashes. Desde que entreno con Bivo no he vuelto a tener problemas. Y además llego mejor al final de los partidos."', '"I\'d had shoulder pain from smashes for a year. Since I started training with Bivo, the problems haven\'t come back. And I finish matches in better shape."', "Carlos R. · Jugador de pickleball", "Carlos R. · Pickleball player", "apple"),
      review(lang, '"En 6 semanas noté un cambio brutal en los desplazamientos. Antes me moría en el 10-10, ahora soy el que más aguanta del club."', '"In 6 weeks I noticed a huge change in my movement. I used to die at 10-10. Now I\'m the one who lasts longest at the club."', "Javier M. · Jugador de pickleball", "Javier M. · Pickleball player", "google"),
      review(lang, '"Por fin un entrenamiento que se adapta a mis torneos. Nunca llego cansada a los partidos importantes. Es como tener un preparador personal."', '"Finally a training plan that adapts to my tournaments. I never arrive tired for the important matches. It\'s like having a personal trainer."', "Laura G. · Jugadora de pickleball", "Laura G. · Pickleball player", "apple"),
      review(lang, '"Lo que más me sorprende es que el plan cambia según cómo me encuentro cada semana. Nunca había tenido eso con ninguna app de entrenamiento."', '"What surprises me most is that the plan changes based on how I feel each week. I\'d never had that with any training app."', "Marta S. · Jugadora de pickleball", "Marta S. · Pickleball player", "google"),
      review(lang, '"Llevo tres meses y me he olvidado de las molestias de codo que tenía crónicas. El plan de prevención funciona de verdad."', '"After three months I\'ve forgotten the chronic elbow pain I used to have. The prevention plan actually works."', "Alejandro T. · Jugador de pickleball", "Alejandro T. · Pickleball player", "apple"),
      review(lang, '"Antes no podía jugar dos partidos seguidos. Ahora termino el segundo igual de fresco que empecé el primero. No me lo puedo creer."', '"I used to be unable to play two matches in a row. Now I finish the second as fresh as I started the first. I can\'t believe it."', "Rocío F. · Jugadora de pickleball", "Rocío F. · Pickleball player", "google"),
    ],
    partnerAlts: ["Sabadell Pickleball Club Academy", "Movement Quality Center", "C.T. La Salle", "EmprenBIT"],
    howHeadline: L ? "Starting is as easy as a serve." : "Empezar es tan fácil como un saque.",
    otherSportsFaq: {
      q: L ? "Does it also work for padel, tennis, or badminton?" : "¿Funciona también para pádel, tenis o bádminton?",
      a: L
        ? "Yes. This page is focused on pickleball, and Bivo also covers padel, tennis, and badminton with plans specific to each sport. In the initial test you choose your sport and the plan is built around its actual demands."
        : "Sí. Aunque esta página está orientada al pickleball, Bivo cubre también pádel, tenis y bádminton con planes específicos para cada deporte. Cuando haces el test inicial, indicas tu deporte y el plan se crea en base a sus exigencias concretas.",
    },
  };
}

function badminton(lang: LandingLang): SportLandingText {
  const L = lang === "en";
  return {
    pageTitle: L
      ? "Bivo Training — Physical preparation for badminton"
      : "Bivo Training — Preparación física para bádminton",
    gateTitle: L ? "Badminton landing" : "Landing de bádminton",
    gateDocumentTitle: L ? "Bivo Training — Badminton access" : "Bivo Training — Acceso bádminton",
    heroAlt: L ? "Badminton player in action" : "Jugador de bádminton en acción",
    heroPre: L
      ? "FOR BADMINTON PLAYERS WHO WANT TO PERFORM MORE AND GET INJURED LESS"
      : "PARA JUGADORES DE BÁDMINTON QUE QUIEREN RENDIR MÁS Y LESIONARSE MENOS",
    heroSub: L
      ? "Discover the physical preparation method used by badminton professionals, now adapted to your level and your life."
      : "Descubre el método de preparación física que usan los profesionales del bádminton, ahora adaptado a tu nivel y a tu vida.",
    agitationHeadline: L
      ? "If you play badminton with passion, but something always holds you back..."
      : "Si juegas al bádminton con pasión, pero algo siempre te frena...",
    painPoints: [
      sharedPain[lang][0],
      L
        ? "You're afraid of getting injured: you've had shoulder, ankle, or knee niggles for months that never fully go away, and every match is a gamble."
        : "Tienes miedo de lesionarte: llevas meses con molestias en el hombro, el tobillo o la rodilla que nunca terminan de irse, y cada partido es una ruleta.",
      sharedPain[lang][1],
      L
        ? "You look for routines on YouTube, but none of them are built for the real physical demands of badminton."
        : "Buscas rutinas en YouTube pero ninguna está pensada para las exigencias físicas reales del bádminton.",
      sharedPain[lang][2],
      sharedPain[lang][3],
    ],
    rootBlocks: [
      {
        title: L ? "18-18 is no longer yours." : "El 18-18 ya no es tuyo.",
        text: L
          ? "You reach 18-18 just about. By the end of the set, you're not the same player. Jumps feel heavy, the smash loses pace, and the moves into the corners come late. It isn't a lack of will — your body hasn't trained to withstand what real badminton demands. And while you fade, your opponents stay switched on."
          : "Llegas a 18-18 justo. Al final del set, ya no eres el mismo jugador. Los saltos pesan, el smash pierde potencia y los desplazamientos a los rincones se atrasan. No es falta de ganas — es que tu cuerpo no ha entrenado para aguantar lo que el bádminton real exige. Y mientras tú te apagas, tus rivales siguen enchufados.",
      },
      {
        title: L ? sharedNag.en.title : sharedNag.es.title,
        text: L ? "The shoulder, the ankle, the knee. " + sharedNag.en.text : "El hombro, el tobillo, la rodilla. " + sharedNag.es.text,
      },
      {
        title: L ? "Nobody has given you a plan built for this." : "Nadie te ha dado un plan hecho para esto.",
        text: L
          ? "A generic gym doesn't train you for badminton. YouTube doesn't know who you are or which areas are already worn down. " + sharedNoPlan.en
          : "El gimnasio genérico no entrena para el bádminton. YouTube no sabe quién eres ni qué zonas tienes castigadas. " + sharedNoPlan.es,
      },
    ],
    solutionAccent: L ? "badminton pros" : "pros del bádminton",
    solutionDesc: L
      ? "Bivo is the first artificial-intelligence app designed specifically for badminton players. It builds your personalized training plan from scratch based on your real level, your injuries, your schedule, and your goals. And it recalculates automatically when your life changes."
      : "Bivo es la primera app con inteligencia artificial diseñada específicamente para jugadores de bádminton. Crea tu plan de entrenamiento personalizado desde cero basándose en tu nivel real, tus lesiones, tu disponibilidad horaria y tus objetivos. Y lo recalcula automáticamente cuando tu vida cambia.",
    benefits: [
      {
        title: L ? "Outlast your opponents" : "Aguanta más que tus rivales",
        text: L
          ? "Train the explosive endurance badminton demands. Arrive at 20-20 as strong as you started the first point. No heavy legs. No losing the smash at the decisive moment."
          : "Entrena la resistencia explosiva del bádminton. Llega igual de fuerte al 20-20 que al primer punto. Sin piernas de plomo. Sin perder el smash en el momento decisivo.",
      },
      {
        title: L ? "Train without fearing injury" : "Entrena sin miedo a lesionarte",
        text: L
          ? "Plans designed from day one to protect your shoulders, ankles, and knees. Bivo's preventive work lowers injury risk before it shows up. More matches, less time sidelined."
          : "Planes diseñados desde el primer día para proteger tus hombros, tobillos y rodillas. El trabajo preventivo de Bivo reduce el riesgo de lesión antes de que aparezca. Más partidos, menos tiempo parado.",
      },
      benefitProgress[lang],
      benefitLogistics[lang],
    ],
    testimonialsHeadline: L
      ? "What badminton players who already train with Bivo are saying."
      : "Lo que dicen los jugadores de bádminton que ya entrenan con Bivo.",
    reviews: [
      review(lang, '"Llevaba un año con molestias en el hombro por los smashes. Desde que entreno con Bivo no he vuelto a tener problemas. Y además llego mejor al final de los sets."', '"I\'d had shoulder pain from smashes for a year. Since I started training with Bivo, the problems haven\'t come back. And I finish sets in better shape."', "Carlos R. · Jugador de bádminton", "Carlos R. · Badminton player", "apple"),
      review(lang, '"En 6 semanas noté un cambio brutal en los desplazamientos. Antes me moría en el tercer set, ahora soy el que más aguanta del club."', '"In 6 weeks I noticed a huge change in my movement. I used to die in the third set. Now I\'m the one who lasts longest at the club."', "Javier M. · Jugador de bádminton", "Javier M. · Badminton player", "google"),
      review(lang, '"Por fin un entrenamiento que se adapta a mis torneos. Nunca llego cansada a los partidos importantes. Es como tener un preparador personal."', '"Finally a training plan that adapts to my tournaments. I never arrive tired for the important matches. It\'s like having a personal trainer."', "Laura G. · Jugadora de bádminton", "Laura G. · Badminton player", "apple"),
      review(lang, '"Lo que más me sorprende es que el plan cambia según cómo me encuentro cada semana. Nunca había tenido eso con ninguna app de entrenamiento."', '"What surprises me most is that the plan changes based on how I feel each week. I\'d never had that with any training app."', "Marta S. · Jugadora de bádminton", "Marta S. · Badminton player", "google"),
      review(lang, '"Llevo tres meses y me he olvidado de las molestias de tobillo que tenía crónicas. El plan de prevención funciona de verdad."', '"After three months I\'ve forgotten the chronic ankle pain I used to have. The prevention plan actually works."', "Alejandro T. · Jugador de bádminton", "Alejandro T. · Badminton player", "apple"),
      review(lang, '"Antes no podía jugar dos partidos seguidos. Ahora termino el segundo igual de fresco que empecé el primero. No me lo puedo creer."', '"I used to be unable to play two matches in a row. Now I finish the second as fresh as I started the first. I can\'t believe it."', "Rocío F. · Jugadora de bádminton", "Rocío F. · Badminton player", "google"),
    ],
    partnerAlts: L
      ? ["Balearic Badminton Federation", "Movement Quality Center", "C.T. La Salle", "EmprenBIT"]
      : ["Federación Balear de Bádminton", "Movement Quality Center", "C.T. La Salle", "EmprenBIT"],
    howHeadline: L ? "Starting is as easy as a serve." : "Empezar es tan fácil como un saque.",
    otherSportsFaq: {
      q: L ? "Does it also work for padel, tennis, or pickleball?" : "¿Funciona también para pádel, tenis o pickleball?",
      a: L
        ? "Yes. This page is focused on badminton, and Bivo also covers padel, tennis, and pickleball with plans specific to each sport. In the initial test you choose your sport and the plan is built around its actual demands."
        : "Sí. Aunque esta página está orientada al bádminton, Bivo cubre también pádel, tenis y pickleball con planes específicos para cada deporte. Cuando haces el test inicial, indicas tu deporte y el plan se crea en base a sus exigencias concretas.",
    },
  };
}

const bySport = { padel, tenis, pickleball, badminton };

export function sportLandingText(sport: keyof typeof bySport, lang: string): SportLandingText {
  return bySport[sport](landingLang(lang));
}

export function localizeSportConfig(
  base: SportVslConfig,
  sport: keyof typeof bySport,
  lang: string,
): SportVslConfig {
  const text = sportLandingText(sport, lang);
  return {
    ...base,
    pageTitle: text.pageTitle,
    hero: { ...base.hero, alt: text.heroAlt, preHeadline: text.heroPre, sub: text.heroSub },
    agitation: { ...base.agitation, headline: text.agitationHeadline, painPoints: text.painPoints },
    rootCause: { ...base.rootCause, blocks: text.rootBlocks },
    solution: { accent: text.solutionAccent, desc: text.solutionDesc },
    benefits: {
      ...base.benefits,
      items: base.benefits.items.map((item, index) => ({ ...item, ...text.benefits[index] })),
    },
    testimonialsHeadline: text.testimonialsHeadline,
    reviews: text.reviews,
    partners: base.partners.map((partner, index) => ({
      ...partner,
      alt: text.partnerAlts[index] ?? partner.alt,
    })),
    howItWorksHeadline: text.howHeadline,
    otherSportsFaq: text.otherSportsFaq,
  };
}
