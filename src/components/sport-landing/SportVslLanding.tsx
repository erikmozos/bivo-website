import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { notifyFlowSessionChange } from "@/hooks/useAppFlow";
import { usePadelLanding } from "@/hooks/usePadelLanding";
import { BIVO_ATHLETES_COUNT } from "@/lib/bivoStats";
import type { PlanKey } from "@/lib/config";
import { writeFlowSession } from "@/lib/flowSession";
import { APP_SCREEN_CAROUSEL } from "@/lib/appScreenCarousel";
import {
  isRacketSportSlug,
  registroPathWithSport,
  sportLegalPath,
  type SportLandingSlug,
} from "@/lib/sportLegalPaths";
import { vslUi } from "@/content/vslUi";

const STEP_MEDIA = [
  { image: "img/vsl/onboarding-movilidad.jpg", imagePosition: "center 14%" },
  { image: "img/flow/02-entrenamiento.jpg", imagePosition: "center 12%" },
  { image: "assets/app-screens/stats.png", imagePosition: "center top" },
  { image: "assets/app-screens/agenda.png", imagePosition: "center top" },
  { image: "img/vsl/onboarding-dolor.png", imagePosition: "center 10%" },
];

export type SportVslReview = {
  platform: string;
  quote: string;
  author: string;
  icon: "apple" | "google";
};

export type SportVslBenefit = {
  image: string;
  imagePosition: string;
  title: string;
  text: string;
};

export type SportVslConfig = {
  className: string;
  slug: SportLandingSlug;
  pageTitle: string;
  asset: (path: string) => string;
  carouselImages?: readonly string[];
  hero: {
    image: string;
    alt: string;
    preHeadline: string;
    sub: string;
  };
  agitation: {
    image: string;
    imagePosition?: string;
    headline: string;
    painPoints: string[];
  };
  rootCause: {
    image: string;
    blocks: { title: string; text: string }[];
  };
  solution: {
    accent: string;
    desc: string;
  };
  benefits: {
    bgImage: string;
    items: SportVslBenefit[];
  };
  testimonialsHeadline: string;
  reviews: SportVslReview[];
  panoramicImage: string;
  partners: { file: string; alt: string }[];
  howItWorksHeadline: string;
  otherSportsFaq: { q: string; a: string };
};

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

const SportVslLanding = ({ config }: { config: SportVslConfig }) => {
  const { lang, localePath } = useLocale();
  const ui = vslUi(lang);
  const steps = ui.steps.map((step, index) => ({ ...STEP_MEDIA[index], ...step }));
  const signupSport = isRacketSportSlug(config.slug) ? config.slug : null;
  const signupPath = signupSport
    ? registroPathWithSport(localePath, signupSport)
    : localePath("/registro");
  const planSignupPath = (plan: PlanKey) =>
    signupSport
      ? registroPathWithSport(localePath, signupSport, plan)
      : `${localePath("/registro")}?plan=${plan}`;
  const selectPlan = (plan: PlanKey) => {
    writeFlowSession({ selectedPlanKey: plan });
    notifyFlowSessionChange();
  };
  const {
    rootRef,
    carouselIndex,
    carouselPrev,
    carouselNext,
    carouselImages,
    openFaq,
    toggleFaq,
    countdown,
  } = usePadelLanding(config.pageTitle, config.carouselImages ?? APP_SCREEN_CAROUSEL);

  const faqItems = [...ui.faq, config.otherSportsFaq];

  return (
    <div className={config.className} ref={rootRef}>
      <section id="hero">
        <div className="hero-bg">
          <img src={config.asset(config.hero.image)} alt={config.hero.alt} />
          <div
            className="hero-overlay"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.94) 100%)",
            }}
          />
        </div>

        <div className="hero-logo">
          <img src={config.asset("assets/logo-green.png")} alt="Bivo" />
        </div>

        <div className="hero-content">
          <p className="pre-headline">{config.hero.preHeadline}</p>
          <h1 className="headline">
            {ui.heroTitleBefore} <span className="accent">{ui.heroTitleAccent}</span> {ui.heroTitleAfter}
          </h1>
          <p className="hero-sub">{config.hero.sub}</p>

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
              {ui.playersBefore} <strong>{BIVO_ATHLETES_COUNT}</strong> {ui.playersAfter}
            </span>
          </div>

          <div className="hero-cta-area">
            <a href="#pricing" className="cta-btn">
              {ui.ctaTrial}
            </a>
            <p className="micro-trust">{ui.microGuarantee}</p>
          </div>
        </div>
      </section>

      <section id="agitation" className="section-pad has-bg-image">
        <div className="section-bg">
          <img
            src={config.asset(config.agitation.image)}
            alt=""
            style={{ objectPosition: config.agitation.imagePosition ?? "center top" }}
          />
          <div
            className="section-bg-overlay"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 52% 32%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.70) 60%, rgba(0,0,0,0.88) 100%), linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.82) 100%)",
            }}
          />
        </div>
        <div className="agitation-inner">
          <p className="pre-headline centered fade-up">{ui.agitationPre}</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            {config.agitation.headline}
          </h2>
          <div className="pain-list">
            {config.agitation.painPoints.map((text) => (
              <div key={text} className="pain-item fade-up">
                <span className="pain-icon">✗</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <p className="agitation-close fade-up">{ui.agitationClose}</p>
          <span className="arrow-down fade-up">↓</span>
        </div>
      </section>

      <section id="root-cause" className="section-pad has-bg-image">
        <div className="section-bg">
          <img src={config.asset(config.rootCause.image)} alt="" />
          <div className="section-bg-overlay" />
        </div>
        <div className="root-inner">
          <p className="pre-headline centered fade-up">{ui.rootPre}</p>
          <h2 className="headline fade-up">
            {ui.rootTitleBefore} <span className="accent">{ui.rootTitleAccent}</span>.
          </h2>
          {config.rootCause.blocks.map((block) => (
            <div key={block.title} className="root-block fade-up">
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </div>
          ))}
          <p className="root-transition fade-up">
            {ui.rootTransition}
          </p>
        </div>
      </section>

      <section id="solution" className="section-pad">
        <div className="solution-grid">
          <div className="solution-text">
            <p className="pre-headline fade-up">{ui.solutionPre}</p>
            <h2 className="headline fade-up">
              {ui.solutionBefore} <span className="accent">{config.solution.accent}</span>
              {ui.solutionAfter}
            </h2>
            <p className="solution-desc fade-up">{config.solution.desc}</p>
            <div className="value-points fade-up">
              {ui.valuePoints.map((point) => (
                <div key={point} className="value-point">
                  <span className="check">✓</span> {point}
                </div>
              ))}
            </div>
            <div className="credential-box fade-up">
              <span className="trophy">🏆</span>
              <span>{ui.credential}</span>
            </div>
          </div>

          <div className="phone-mockup fade-up">
            <div className="phone-mockup-wrap">
              <button type="button" className="carousel-arrow prev" onClick={carouselPrev} aria-label={ui.prev}>
                ‹
              </button>
              <div className="phone-frame">
                <div className="phone-screen-wrap">
                  {carouselImages.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={ui.screenAlt.replace("{n}", String(index + 1))}
                      className={index === carouselIndex ? "active" : ""}
                    />
                  ))}
                </div>
              </div>
              <button type="button" className="carousel-arrow next" onClick={carouselNext} aria-label={ui.next}>
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section-pad has-bg-image">
        <div className="section-bg">
          <img src={config.asset(config.benefits.bgImage)} alt="" />
          <div className="section-bg-overlay" />
        </div>
        <div className="benefits-header">
          <p className="pre-headline centered fade-up">{ui.benefitsPre}</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            {ui.benefitsTitle}
          </h2>
        </div>
        <div className="benefits-grid">
          {config.benefits.items.map((benefit) => (
            <div key={benefit.title} className="benefit-card has-photo fade-up">
              <div className="benefit-photo">
                <img
                  src={config.asset(benefit.image)}
                  alt={benefit.title}
                  style={
                    benefit.image.includes("onboarding-dolor")
                      ? { objectFit: "contain", objectPosition: "center" }
                      : { objectPosition: benefit.imagePosition }
                  }
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
            {ui.ctaTrial}
          </a>
          <p className="micro-trust">{ui.microCancel}</p>
        </div>
      </section>

      <section id="testimonials" className="section-pad">
        <div className="testimonials-header">
          <p className="pre-headline centered fade-up">{ui.testimonialsPre}</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            {config.testimonialsHeadline}
          </h2>
          <p className="sub fade-up">{ui.testimonialsSub}</p>
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
            {config.reviews.map((review) => (
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
          <img
            src={config.asset(config.panoramicImage)}
            alt=""
            style={{ objectPosition: "center 30%" }}
          />
          <div className="section-bg-overlay" />
        </div>
        <div className="credibility-header">
          <p className="pre-headline centered fade-up">{ui.credibilityPre}</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            {ui.credibilityTitle}
          </h2>
        </div>
        <div className="awards-grid">
          <div className="award-card fade-up">
            <div className="award-card-bg">
              <img src={config.asset("img/awards/dia-d-group.jpg")} alt={ui.award1Alt} />
            </div>
            <div className="award-card-content">
              <div className="award-icon">🏆</div>
              <div className="award-name">{ui.award1Name}</div>
              <div className="award-org">{ui.award1Org}</div>
              <div className="award-date">{ui.award1Date}</div>
            </div>
          </div>
          <div className="award-card fade-up">
            <div className="award-card-bg">
              <img src={config.asset("img/awards/dia-d-presentacion.jpg")} alt={ui.award2Alt} />
            </div>
            <div className="award-card-content">
              <div className="award-icon">🥇</div>
              <div className="award-name">{ui.award2Name}</div>
              <div className="award-org">{ui.award2Org}</div>
              <div className="award-date">{ui.award2Date}</div>
            </div>
          </div>
        </div>
        <div className="partners-block fade-up">
          <p className="partners-label">{ui.partnersLabel}</p>
          <div className="partners-logos">
            {config.partners.map((partner) => (
              <img key={partner.file} src={config.asset(partner.file)} alt={partner.alt} />
            ))}
          </div>
        </div>
        <div className="expert-card fade-up">
          <div className="expert-photo">
            <img src={config.asset("img/team/Toni.png")} alt="Toni Bota" />
          </div>
          <div>
            <div className="expert-name">Toni Bota</div>
            <div className="expert-title">{ui.expertTitle}</div>
            <p className="expert-quote">&quot;{ui.expertQuote}&quot;</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-pad">
        <div className="how-header">
          <p className="pre-headline centered fade-up">{ui.stepsPre}</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            {config.howItWorksHeadline}
          </h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={step.title} className="step-card fade-up">
              <div className="step-card-number">{index + 1}</div>
              <div className="step-card-img">
                <img
                  src={config.asset(step.image)}
                  alt={step.title}
                  style={
                    step.image.includes("onboarding-dolor")
                      ? { objectFit: "contain", objectPosition: "center" }
                      : { objectPosition: step.imagePosition }
                  }
                />
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
          {ui.urgency} <strong>{countdown}</strong>
        </span>
      </div>

      <section id="pricing" className="section-pad">
        <div className="pricing-header">
          <p className="emotional-bridge fade-up">
            {ui.pricingBridge1}
            <br />
            {ui.pricingBridge2}
          </p>
          <p className="pre-headline centered fade-up">{ui.pricingPre}</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            {ui.pricingTitle}
          </h2>
          <p className="sub fade-up" style={{ textAlign: "center", color: "rgba(255,255,255,0.72)", fontSize: "18px", marginTop: "12px" }}>
            {ui.pricingSub}
          </p>
        </div>

        <div className="price-anchor fade-up">
          <div className="anchor-old">
            <div className="label">{ui.anchorOldLabel}</div>
            <div className="price">{ui.anchorOldPrice}</div>
          </div>
          <div className="anchor-vs">VS</div>
          <div className="anchor-new">
            <div className="label">Bivo</div>
            <div className="price">{ui.anchorNewPrice}</div>
          </div>
        </div>

        <div className="pricing-grid">
          <div className="price-card fade-up">
            <div className="price-label">{ui.planMonthly}</div>
            <div className="price-amount">
              {ui.monthlyPrice} <span>{ui.perMonth}</span>
            </div>
            <div className="price-sub">{ui.noCommitment}</div>
            <Link to={planSignupPath("monthly")} onClick={() => selectPlan("monthly")} className="cta-btn">
              {ui.ctaFree}
            </Link>
          </div>
          <div className="price-card featured fade-up">
            <div className="price-badge">{ui.popular}</div>
            <div className="price-label">{ui.planQuarterly}</div>
            <div className="price-amount">
              {ui.quarterlyPrice} <span>{ui.perMonth}</span>
            </div>
            <div className="price-amount-small">{ui.quarterlySmall}</div>
            <div className="price-save">{ui.save22}</div>
            <Link to={planSignupPath("quarterly")} onClick={() => selectPlan("quarterly")} className="cta-btn">
              {ui.ctaFree}
            </Link>
          </div>
          <div className="price-card fade-up">
            <div className="price-badge" style={{ background: "#1a1a1a", color: "var(--green)", border: "1px solid var(--green)" }}>
              {ui.bestValue}
            </div>
            <div className="price-label">{ui.planAnnual}</div>
            <div className="price-amount">
              {ui.annualPrice} <span>{ui.perMonth}</span>
            </div>
            <div className="price-amount-small">{ui.annualSmall}</div>
            <div className="price-save">{ui.save50}</div>
            <Link to={planSignupPath("annual")} onClick={() => selectPlan("annual")} className="cta-btn">
              {ui.ctaFree}
            </Link>
          </div>
        </div>

        <div className="included-list fade-up">
          {ui.included.map((item) => (
            <div key={item} className="included-item">
              <span className="check">✓</span> {item}
            </div>
          ))}
        </div>

        <div className="guarantee-box fade-up">
          <span className="guarantee-icon">🛡️</span>
          <div>
            <strong>{ui.guaranteeTitle}</strong>
            <p>{ui.guaranteeBody}</p>
          </div>
        </div>
      </section>

      <section id="faq" className="section-pad">
        <div className="faq-header">
          <p className="pre-headline centered fade-up">{ui.faqPre}</p>
          <h2 className="headline fade-up" style={{ textAlign: "center" }}>
            {ui.faqTitle}
          </h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
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
          <h3 className="headline">{ui.faqFinalTitle}</h3>
          <p className="sub">{ui.faqFinalSub}</p>
          <Link to={signupPath} className="cta-btn">
            {ui.ctaTrial}
          </Link>
          <p className="micro-trust">{ui.microNoCommitment}</p>
        </div>
      </section>

      <footer>
        <img src={config.asset("assets/logo-green.png")} alt="Bivo" />
        <div className="footer-links">
          <Link to={localePath(sportLegalPath(config.slug, "privacy"))}>{ui.privacy}</Link>
          <Link to={localePath(sportLegalPath(config.slug, "terms"))}>{ui.terms}</Link>
        </div>
        <p className="footer-copy">{ui.footerCopy}</p>
      </footer>
    </div>
  );
};

export default SportVslLanding;
