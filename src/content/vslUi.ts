export type LandingLang = "es" | "en";

export function landingLang(lang: string): LandingLang {
  return lang === "en" ? "en" : "es";
}

export type VslStep = { title: string; text: string };
export type VslFaq = { q: string; a: string };

export type VslUi = {
  heroTitleBefore: string;
  heroTitleAccent: string;
  heroTitleAfter: string;
  playersBefore: string;
  playersAfter: string;
  ctaTrial: string;
  microGuarantee: string;
  agitationPre: string;
  agitationClose: string;
  rootPre: string;
  rootTitleBefore: string;
  rootTitleAccent: string;
  rootTransition: string;
  solutionPre: string;
  solutionBefore: string;
  solutionAfter: string;
  valuePoints: string[];
  credential: string;
  prev: string;
  next: string;
  screenAlt: string;
  benefitsPre: string;
  benefitsTitle: string;
  microCancel: string;
  testimonialsPre: string;
  testimonialsSub: string;
  credibilityPre: string;
  credibilityTitle: string;
  award1Alt: string;
  award1Name: string;
  award1Org: string;
  award1Date: string;
  award2Alt: string;
  award2Name: string;
  award2Org: string;
  award2Date: string;
  partnersLabel: string;
  expertTitle: string;
  expertQuote: string;
  stepsPre: string;
  steps: VslStep[];
  urgency: string;
  pricingBridge1: string;
  pricingBridge2: string;
  pricingPre: string;
  pricingTitle: string;
  pricingSub: string;
  anchorOldLabel: string;
  anchorOldPrice: string;
  anchorNewPrice: string;
  planMonthly: string;
  monthlyPrice: string;
  perMonth: string;
  noCommitment: string;
  ctaFree: string;
  popular: string;
  planQuarterly: string;
  quarterlyPrice: string;
  quarterlySmall: string;
  save22: string;
  bestValue: string;
  planAnnual: string;
  annualPrice: string;
  annualSmall: string;
  save50: string;
  included: string[];
  guaranteeTitle: string;
  guaranteeBody: string;
  faqPre: string;
  faqTitle: string;
  faq: VslFaq[];
  faqFinalTitle: string;
  faqFinalSub: string;
  microNoCommitment: string;
  privacy: string;
  terms: string;
  footerCopy: string;
  playVideo: string;
  playOverlay: string;
  gatePre: string;
  gateCopy: string;
  gateUser: string;
  gatePassword: string;
  gateChecking: string;
  gateEnter: string;
};

const es: VslUi = {
  heroTitleBefore: "¿Tu",
  heroTitleAccent: "cuerpo",
  heroTitleAfter: "no aguanta los partidos que tu cabeza quiere jugar?",
  playersBefore: "Más de",
  playersAfter: "jugadores ya entrenan con Bivo",
  ctaTrial: "Empieza tu prueba gratuita de 7 días →",
  microGuarantee: "✓ Garantía 7 días · ✓ Cancela cuando quieras",
  agitationPre: "¿TE SIENTES IDENTIFICADO?",
  agitationClose: "Si has dicho sí a alguna de estas... esto es exactamente para ti.",
  rootPre: "EL VERDADERO PROBLEMA",
  rootTitleBefore: "Tu cabeza quiere más partidos. Tu cuerpo te dice que",
  rootTitleAccent: "no puede",
  rootTransition: "El problema no es tu esfuerzo. Es que nadie te había dado el plan correcto. Hasta ahora.",
  solutionPre: "LA SOLUCIÓN",
  solutionBefore: "Bivo: la preparación física de los",
  solutionAfter: ", en tu bolsillo.",
  valuePoints: [
    "Diseñado por preparadores físicos de jugadores ATP",
    "Adaptado a ti, no a una plantilla genérica",
    "Previene lesiones antes de que ocurran",
  ],
  credential: "Premio Nacional a la Mejor Startup — Cámara de Comercio de España, 2024",
  prev: "Anterior",
  next: "Siguiente",
  screenAlt: "Bivo App — pantalla {n}",
  benefitsPre: "LO QUE CAMBIA",
  benefitsTitle: "Cuando entrenas con Bivo, se nota en pista.",
  microCancel: "✓ Cancela cuando quieras · ✓ 7 días completamente gratis",
  testimonialsPre: "RESULTADOS REALES",
  testimonialsSub: "Opiniones reales. Sin filtros.",
  credibilityPre: "NO LO DECIMOS NOSOTROS",
  credibilityTitle: "Bivo está reconocido y avalado por quienes saben de deporte y tecnología.",
  award1Alt: "Equipo Bivo recogiendo el Premio Nacional",
  award1Name: "Premio Nacional a la Mejor Startup",
  award1Org: "Programa Impulsa, Crea y Crece 2024 — Cámara de Comercio de España",
  award1Date: "2 de abril de 2025",
  award2Alt: "Presentación de Bivo",
  award2Name: "Mejor Idea de Negocio",
  award2Org: "Cámara de Comercio de Menorca",
  award2Date: "14 de enero de 2025",
  partnersLabel: "Desarrollado con y para:",
  expertTitle: "Preparador de jugadores amateurs y profesionales de raqueta",
  expertQuote:
    "La metodología detrás de Bivo es la misma que aplico con deportistas de élite. Adaptada a tu nivel, a tus lesiones y a tu vida.",
  stepsPre: "EN 5 PASOS",
  steps: [
    {
      title: "Bivo te valora y te conoce",
      text: "Test inicial para entender tu nivel, deporte, objetivos, lesiones previas y disponibilidad.",
    },
    {
      title: "Entrenamiento personalizado",
      text: "Plan específico para tu deporte de raqueta basado en tus datos, sin plantillas genéricas.",
    },
    {
      title: "Registra tu mejora",
      text: "Estadísticas claras de adherencia, velocidad y escudo de lesiones. Visualiza tu progreso.",
    },
    {
      title: "Gestiona tu calendario",
      text: "Organiza tus sesiones, partidos y descansos en un mismo lugar. Sin solapamientos.",
    },
    {
      title: "Se adapta a ti",
      text: "¿Cambias de objetivo, te lesionas o tienes menos tiempo? Bivo recalcula tu plan automáticamente.",
    },
  ],
  urgency: "Precio de lanzamiento — Termina en:",
  pricingBridge1: "Ya sabes lo que pasa si no haces nada. Llevas tiempo aguantándolo.",
  pricingBridge2: "La pregunta no es si quieres mejorar — es cuánto más vas a esperar.",
  pricingPre: "SIN RIESGO. SIN COMPROMISO.",
  pricingTitle: "Empieza hoy. Los primeros 7 días son completamente gratis.",
  pricingSub: "Cancela cuando quieras con un clic.",
  anchorOldLabel: "Preparador físico privado",
  anchorOldPrice: "40€ – 120€ por sesión",
  anchorNewPrice: "Desde 7,50€/mes",
  planMonthly: "MENSUAL",
  monthlyPrice: "14,99€",
  perMonth: "/mes",
  noCommitment: "Sin compromiso",
  ctaFree: "Empieza 7 días gratis →",
  popular: "⭐ MÁS POPULAR — PRECIO LANZAMIENTO",
  planQuarterly: "TRIMESTRAL",
  quarterlyPrice: "11,66€",
  quarterlySmall: "34,99€ cada 3 meses",
  save22: "Ahorras un 22%",
  bestValue: "💎 MEJOR VALOR",
  planAnnual: "ANUAL",
  annualPrice: "7,50€",
  annualSmall: "89,99€ al año",
  save50: "Ahorras un 50% · Ahorras 89,89€/año",
  included: [
    "Entrenamiento personalizado con IA",
    "Adaptación automática a tu nivel y lesiones",
    "Estadísticas y seguimiento de progreso",
    "Calendario y planificación de partidos",
    "Acceso completo a todas las funciones",
    "Actualizaciones incluidas",
    "Soporte en español",
  ],
  guaranteeTitle: "Garantía de satisfacción 7 días",
  guaranteeBody:
    "Si en siete días no ves el valor, cancela sin costes con sólo dos clics desde dentro de la app. Sin complicaciones.",
  faqPre: "RESOLVEMOS TUS DUDAS",
  faqTitle: "Preguntas frecuentes",
  faq: [
    {
      q: "¿Necesito ir al gimnasio o tener equipamiento especial?",
      a: "No. Bivo está diseñado para que puedas entrenar donde quieras, ya sea en el gimnasio, en casa con tu propio material, en un club, de viaje o incluso en el jardín. Desde la aplicación podrás sincronizar el material que tienes en cada momento para reajustar el plan de manera inmediata.",
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
  ],
  faqFinalTitle: "¿Todavía tienes dudas?",
  faqFinalSub: "Pruébalo 7 días sin coste y decide tú mismo.",
  microNoCommitment: "✓ Sin compromiso · ✓ Cancela cuando quieras",
  privacy: "Política de Privacidad",
  terms: "Términos de Uso",
  footerCopy: "© 2025 Bivo Training. Todos los derechos reservados.",
  playVideo: "Reproducir vídeo",
  playOverlay: "Mira esto antes de tu próximo partido",
  gatePre: "Acceso restringido",
  gateCopy: "Introduce las credenciales de administrador para continuar.",
  gateUser: "Usuario",
  gatePassword: "Contraseña",
  gateChecking: "Comprobando...",
  gateEnter: "Entrar",
};

const en: VslUi = {
  heroTitleBefore: "Does your",
  heroTitleAccent: "body",
  heroTitleAfter: "give out on the matches your head still wants to play?",
  playersBefore: "More than",
  playersAfter: "players already train with Bivo",
  ctaTrial: "Start your 7-day free trial →",
  microGuarantee: "✓ 7-day guarantee · ✓ Cancel anytime",
  agitationPre: "SOUND FAMILIAR?",
  agitationClose: "If you said yes to any of these... this is exactly for you.",
  rootPre: "THE REAL PROBLEM",
  rootTitleBefore: "Your head wants more matches. Your body is telling you it",
  rootTitleAccent: "can't",
  rootTransition: "The problem isn't your effort. It's that nobody had given you the right plan. Until now.",
  solutionPre: "THE SOLUTION",
  solutionBefore: "Bivo: the physical preparation of the",
  solutionAfter: ", in your pocket.",
  valuePoints: [
    "Designed by physical trainers of ATP players",
    "Built around you, not a generic template",
    "Prevents injuries before they happen",
  ],
  credential: "National Award for Best Startup — Chamber of Commerce of Spain, 2024",
  prev: "Previous",
  next: "Next",
  screenAlt: "Bivo App — screen {n}",
  benefitsPre: "WHAT CHANGES",
  benefitsTitle: "When you train with Bivo, you feel it on court.",
  microCancel: "✓ Cancel anytime · ✓ 7 days completely free",
  testimonialsPre: "REAL RESULTS",
  testimonialsSub: "Real reviews. Unfiltered.",
  credibilityPre: "DON'T TAKE OUR WORD FOR IT",
  credibilityTitle: "Bivo is recognized and backed by people who know sport and technology.",
  award1Alt: "Bivo team receiving the National Award",
  award1Name: "National Award for Best Startup",
  award1Org: "Impulsa, Crea y Crece 2024 — Chamber of Commerce of Spain",
  award1Date: "2 April 2025",
  award2Alt: "Bivo presentation",
  award2Name: "Best Business Idea",
  award2Org: "Chamber of Commerce of Menorca",
  award2Date: "14 January 2025",
  partnersLabel: "Developed with and for:",
  expertTitle: "Coach for amateur and professional racket-sport players",
  expertQuote:
    "The method behind Bivo is the same one I use with elite athletes. Adapted to your level, your injuries, and your life.",
  stepsPre: "IN 5 STEPS",
  steps: [
    {
      title: "Bivo assesses you and gets to know you",
      text: "An initial test to understand your level, sport, goals, previous injuries, and availability.",
    },
    {
      title: "Personalized training",
      text: "A plan specific to your racket sport, based on your data, with no generic templates.",
    },
    {
      title: "Track your improvement",
      text: "Clear stats for adherence, speed, and injury shield. See your progress.",
    },
    {
      title: "Manage your calendar",
      text: "Organize sessions, matches, and rest days in one place. No overlaps.",
    },
    {
      title: "It adapts to you",
      text: "Change your goal, get injured, or have less time? Bivo recalculates your plan automatically.",
    },
  ],
  urgency: "Launch price — Ends in:",
  pricingBridge1: "You already know what happens if you do nothing. You've been putting up with it.",
  pricingBridge2: "The question isn't whether you want to improve — it's how much longer you'll wait.",
  pricingPre: "NO RISK. NO COMMITMENT.",
  pricingTitle: "Start today. The first 7 days are completely free.",
  pricingSub: "Cancel anytime with one click.",
  anchorOldLabel: "Private physical trainer",
  anchorOldPrice: "€40 – €120 per session",
  anchorNewPrice: "From €7.50/month",
  planMonthly: "MONTHLY",
  monthlyPrice: "€14.99",
  perMonth: "/month",
  noCommitment: "No commitment",
  ctaFree: "Start 7 days free →",
  popular: "⭐ MOST POPULAR — LAUNCH PRICE",
  planQuarterly: "QUARTERLY",
  quarterlyPrice: "€11.66",
  quarterlySmall: "€34.99 every 3 months",
  save22: "You save 22%",
  bestValue: "💎 BEST VALUE",
  planAnnual: "ANNUAL",
  annualPrice: "€7.50",
  annualSmall: "€89.99 per year",
  save50: "You save 50% · You save €89.89/year",
  included: [
    "AI personalized training",
    "Automatic adaptation to your level and injuries",
    "Stats and progress tracking",
    "Match calendar and planning",
    "Full access to every feature",
    "Updates included",
    "Support in Spanish",
  ],
  guaranteeTitle: "7-day satisfaction guarantee",
  guaranteeBody:
    "If you don't see the value within seven days, cancel at no cost with just two taps inside the app. No hassle.",
  faqPre: "YOUR QUESTIONS, ANSWERED",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "Do I need a gym or special equipment?",
      a: "No. Bivo is designed so you can train wherever you want: at the gym, at home with your own gear, at a club, while traveling, or even in the garden. From the app you can sync the equipment you have at any moment and the plan adjusts immediately.",
    },
    {
      q: "Is it suitable if I have a chronic injury or a recurring niggle?",
      a: "Yes. One of Bivo's pillars is injury prevention and respecting existing issues. In the initial test you mark your injuries and sensitive areas, and the plan accounts for them from day one. If something flares up during training, you can report it and the plan adjusts automatically. You don't have to choose between playing and taking care of yourself: Bivo handles it.",
    },
    {
      q: "Does it work if I can only train 2 or 3 days a week?",
      a: "Perfectly. In the initial test you set your real availability and Bivo builds the plan around that. There is no minimum number of days. You can also adjust it as you go: if one week you have more time, change it in the app and the plan syncs instantly. If another week you have less time, reduce the days and Bivo rebalances so you keep progressing with what you have.",
    },
    {
      q: "What if I have a tournament one weekend and can't train?",
      a: "Bivo handles it automatically. Add your match and tournament calendar in the app, and the plan recalculates so you arrive in the best possible shape for each event. No overlaps. No overtraining.",
    },
    {
      q: "Can I cancel whenever I want?",
      a: "Yes, at any time and with a single tap in the app. No calls, no forms, no penalties. You cancel and that's it.",
    },
    {
      q: "Is it for any level, even a complete beginner?",
      a: "Absolutely. Bivo is designed for players of every level, from people who just started to professionals who already use it. The app runs an initial test so it knows exactly where you are and starts the plan there. If you later want to raise or lower the difficulty, you can do it in the app and it adjusts instantly.",
    },
  ],
  faqFinalTitle: "Still have questions?",
  faqFinalSub: "Try it free for 7 days and decide for yourself.",
  microNoCommitment: "✓ No commitment · ✓ Cancel anytime",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  footerCopy: "© 2025 Bivo Training. All rights reserved.",
  playVideo: "Play video",
  playOverlay: "Watch this before your next match",
  gatePre: "Restricted access",
  gateCopy: "Enter the admin credentials to continue.",
  gateUser: "Username",
  gatePassword: "Password",
  gateChecking: "Checking...",
  gateEnter: "Enter",
};

export function vslUi(lang: string): VslUi {
  return landingLang(lang) === "en" ? en : es;
}
