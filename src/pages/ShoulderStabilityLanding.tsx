import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { sportLegalPath } from "@/lib/sportLegalPaths";
import { useLocale } from "@/hooks/useLocale";
import "./ShoulderStabilityLanding.css";

const FORMSPREE_URL =
  import.meta.env.VITE_FORMSPREE_ESTABILIDAD_URL ?? "https://formspree.io/f/xzdykwwb";

const PAIN_IMAGE =
  "https://images.unsplash.com/photo-1595435934249-5df4ed123550?auto=format&fit=crop&w=800&q=80";

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ShoulderStabilityLanding = () => {
  const { t } = useTranslation();
  const { localePath } = useLocale();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [chipsShake, setChipsShake] = useState(false);

  const sportLabels = t("shoulder.hero.sports", { returnObjects: true }) as string[];
  const sportIds = ["tenis", "padel", "badminton", "pickleball"];
  const SPORTS = sportIds.map((id, i) => ({ id, label: sportLabels[i] }));
  const painCards = t("shoulder.pain.cards", { returnObjects: true }) as string[];
  const valueItems = t("shoulder.value.items", { returnObjects: true }) as { number: string; title: string; subtitle: string }[];
  const legalLinks = t("footer.legal.links", { returnObjects: true }) as string[];

  useEffect(() => {
    const prev = document.title;
    document.title = t("shoulder.meta.title");
    return () => {
      document.title = prev;
    };
  }, [t]);

  useEffect(() => {
    const root = document.querySelector(".shoulder-landing");
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".ssl-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ssl-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [success]);

  const scrollToForm = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("ssl-nombre")?.focus(), 700);
  }, []);

  const handleSubmit = async () => {
    if (!selectedSport) {
      setChipsShake(true);
      setTimeout(() => setChipsShake(false), 400);
      return;
    }
    if (!nombre.trim() || !apellido.trim() || !emailRx.test(email.trim())) {
      if (!nombre.trim()) shakeField("ssl-nombre");
      if (!apellido.trim()) shakeField("ssl-apellido");
      if (!emailRx.test(email.trim())) shakeField("ssl-email");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          telefono: telefono.trim(),
          deporte: selectedSport,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        alert(t("shoulder.form.errors.submitError"));
      }
    } catch {
      alert(t("shoulder.form.errors.noConnection"));
    } finally {
      setSubmitting(false);
    }
  };

  const shakeField = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (!el) return;
    el.style.borderColor = "#ff4444";
    el.classList.add("ssl-shake");
    setTimeout(() => {
      el.style.borderColor = "";
      el.classList.remove("ssl-shake");
    }, 500);
  };

  return (
    <div className="shoulder-landing">
      <header className="ssl-header">
        <a href="#top" className="ssl-text-logo" aria-label={t("shoulder.header.logo")}>
          {t("shoulder.header.logo")}
        </a>
        <a href="#formulario" className="ssl-header-cta" onClick={scrollToForm}>
          {t("shoulder.header.cta")}
        </a>
      </header>

      <section className="ssl-hero" id="top">
        <div className="ssl-hero-bg" aria-hidden />
        <div className="ssl-hero-glow" aria-hidden />
        <div className="ssl-hero-vignette" aria-hidden />

        <div className="ssl-badge">
          <span className="ssl-badge-dot" />
          {t("shoulder.badge")}
        </div>

        <h1 className="ssl-hero-title">
          {t("shoulder.hero.title")}
        </h1>

        <p className="ssl-hero-sub">
          <Trans
            i18nKey="shoulder.hero.subtitle"
            values={{ count: 10, months: 1 }}
            components={[<strong />, <strong />]}
          />
        </p>

        <div className="ssl-cta-group">
          <a href="#formulario" className="ssl-btn-main" onClick={scrollToForm}>
            {t("shoulder.hero.cta")}
          </a>
          <p className="ssl-cta-note">
            <Trans
              i18nKey="shoulder.hero.note"
              values={{ seconds: 30 }}
              components={[<span />]}
            />
          </p>
        </div>

        <div className="ssl-sport-tags">
          {sportLabels.map((s: string) => (
            <span key={s} className="ssl-sport-tag">
              {s}
            </span>
          ))}
        </div>

        <div className="ssl-scroll-hint">
          <div className="ssl-scroll-line" />
          scroll
        </div>
      </section>

      <section className="ssl-pain ssl-reveal">
        <div className="ssl-pain-img-wrap">
          <img className="ssl-pain-img" src={PAIN_IMAGE} alt="" />
        </div>

        <p className="ssl-eyebrow">{t("shoulder.pain.eyebrow")}</p>
        <div className="ssl-pain-cards">
          {painCards.map((card, i) => (
            <div key={i} className="ssl-pain-card">
              <span className="ssl-pain-icon" aria-hidden>{card.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u)?.[1] || ""}</span>
              <span>{card.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, "")}</span>
            </div>
          ))}
        </div>
        <p className="ssl-pain-tagline">
          {t("shoulder.pain.tagline")}
        </p>
      </section>

      <section className="ssl-value ssl-reveal">
        <div className="ssl-value-header">
          <p className="ssl-eyebrow">{t("shoulder.value.eyebrow")}</p>
          <h2 className="ssl-section-title">
            {t("shoulder.value.title")}
          </h2>
        </div>
        <div className="ssl-value-items">
          {valueItems.map((item) => (
            <div key={item.number} className="ssl-value-card">
              <div className="ssl-value-num">{item.number}</div>
              <div className="ssl-value-body">
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ssl-bonus-wrap ssl-reveal">
        <div className="ssl-bonus">
          <div className="ssl-bonus-tag">{t("shoulder.bonus.tag")}</div>
          <p className="ssl-bonus-title">
            <Trans
              i18nKey="shoulder.bonus.title"
              components={{ accent: <span className="ssl-accent" /> }}
            />
          </p>
          <p className="ssl-bonus-sub" style={{ whiteSpace: "pre-line" }}>
            {t("shoulder.bonus.subtitle")}
          </p>
        </div>
      </div>

      <section className="ssl-form-section ssl-reveal" id="formulario">
        <div className="ssl-form-header">
          <p className="ssl-eyebrow">{t("shoulder.form.eyebrow")}</p>
          <h2 className="ssl-form-title">
            {t("shoulder.form.title")}
          </h2>
          <p className="ssl-form-desc">{t("shoulder.form.description")}</p>
        </div>

        {!success ? (
          <div className="ssl-form-card" id="formCard">
            <p className="ssl-field-label">
              {t("shoulder.form.sportLabel")} <span className="ssl-req">*</span>
            </p>
            <div className={`ssl-chips ${chipsShake ? "ssl-shake" : ""}`} id="chipsGroup">
              {SPORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`ssl-chip ${selectedSport === s.id ? "ssl-active" : ""}`}
                  onClick={() => setSelectedSport(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="ssl-divider" />
            <p className="ssl-info-block-title">{t("shoulder.form.personalInfo")}</p>

            <div className="ssl-field-row">
              <div className="ssl-field">
                <label htmlFor="ssl-nombre">
                  {t("shoulder.form.fields.name.label")} <span className="ssl-req">*</span>
                </label>
                <input
                  id="ssl-nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={t("shoulder.form.fields.name.placeholder")}
                  autoComplete="given-name"
                />
              </div>
              <div className="ssl-field">
                <label htmlFor="ssl-apellido">
                  {t("shoulder.form.fields.lastname.label")} <span className="ssl-req">*</span>
                </label>
                <input
                  id="ssl-apellido"
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder={t("shoulder.form.fields.lastname.placeholder")}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="ssl-field">
              <label htmlFor="ssl-email">
                {t("shoulder.form.fields.email.label")} <span className="ssl-req">*</span>
              </label>
              <input
                id="ssl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("shoulder.form.fields.email.placeholder")}
                autoComplete="email"
              />
            </div>

            <div className="ssl-field">
              <label htmlFor="ssl-telefono">{t("shoulder.form.fields.phone.label")}</label>
              <input
                id="ssl-telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder={t("shoulder.form.fields.phone.placeholder")}
                autoComplete="tel"
              />
              <p className="ssl-field-hint">{t("shoulder.form.fields.phone.hint")}</p>
            </div>

            <button className="ssl-btn-submit" type="button" disabled={submitting} onClick={handleSubmit}>
              {submitting ? t("shoulder.form.submitting") : t("shoulder.form.submit")}
            </button>

            <p className="ssl-form-privacy">{t("shoulder.form.privacy")}</p>
          </div>
        ) : (
          <div className="ssl-form-card ssl-success-state" id="successState">
            <div className="ssl-success-icon">✓</div>
            <h3 className="ssl-success-title">{t("shoulder.form.success.title")}</h3>
            <p className="ssl-success-sub">
              {t("shoulder.form.success.message")}
            </p>
            <div className="ssl-success-bonus-box">
              {t("shoulder.form.success.bonus")}
            </div>
            <p style={{ fontSize: 12, color: "#484848" }}>{t("shoulder.form.success.spamNote")}</p>
          </div>
        )}
      </section>

      <footer className="ssl-footer">
        <span className="ssl-footer-logo ssl-text-logo" aria-hidden>
          {t("shoulder.header.logo")}
        </span>
        <div className="ssl-footer-links">
          <Link to={localePath(sportLegalPath("estabilidad-hombro", "privacy"))}>{legalLinks[0]}</Link>
          <Link to={localePath(sportLegalPath("estabilidad-hombro", "terms"))}>{legalLinks[2]}</Link>
        </div>
        <p>{t("shoulder.footer")}</p>
      </footer>
    </div>
  );
};

export default ShoulderStabilityLanding;
