import { useCallback, useEffect, useState } from "react";
import "./ShoulderStabilityLanding.css";

const FORMSPREE_URL =
  import.meta.env.VITE_FORMSPREE_ESTABILIDAD_URL ?? "https://formspree.io/f/xzdykwwb";

const PAIN_IMAGE =
  "https://images.unsplash.com/photo-1595435934249-5df4ed123550?auto=format&fit=crop&w=800&q=80";

const SPORTS: { id: string; label: string }[] = [
  { id: "padel", label: "🏓 Pádel" },
  { id: "tenis", label: "🎾 Tenis" },
  { id: "pickleball", label: "🥒 Pickleball" },
  { id: "badminton", label: "🏸 Bádminton" },
  { id: "squash", label: "🎱 Squash" },
  { id: "tenis-playa", label: "🏖️ Tenis Playa" },
  { id: "ping-pong", label: "🏓 Ping Pong" },
];

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ShoulderStabilityLanding = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [chipsShake, setChipsShake] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = "BIVO — Estabilidad de Hombro para Deportistas de Raqueta";
    return () => {
      document.title = prev;
    };
  }, []);

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
        alert("Hubo un problema al enviar. Por favor inténtalo de nuevo.");
      }
    } catch {
      alert("Sin conexión. Comprueba tu internet e inténtalo de nuevo.");
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
        <a href="#top" className="ssl-text-logo" aria-label="BIVO inicio">
          BIVO
        </a>
        <a href="#formulario" className="ssl-header-cta" onClick={scrollToForm}>
          Recibir gratis →
        </a>
      </header>

      <section className="ssl-hero" id="top">
        <div className="ssl-hero-bg" aria-hidden />
        <div className="ssl-hero-glow" aria-hidden />
        <div className="ssl-hero-vignette" aria-hidden />

        <div className="ssl-badge">
          <span className="ssl-badge-dot" />
          Acceso anticipado · Gratis
        </div>

        <h1 className="ssl-hero-title">
          Mejora tu <span className="ssl-accent">hombro</span>
          <br />
          y tu rendimiento
          <br />
          en pista desde hoy
        </h1>

        <p className="ssl-hero-sub">
          Recibe <strong>10 ejercicios de estabilidad</strong> adaptados a tu deporte + acceso anticipado a
          BIVO con <strong>1 mes gratis</strong>
        </p>

        <div className="ssl-cta-group">
          <a href="#formulario" className="ssl-btn-main" onClick={scrollToForm}>
            Recibir ejercicios gratis <span className="ssl-btn-arrow">→</span>
          </a>
          <p className="ssl-cta-note">
            Contéstalo en menos de <span>30 segundos</span>
          </p>
        </div>

        <div className="ssl-sport-tags">
          {["🎾 Tenis", "🏓 Pádel", "🏸 Bádminton", "🥒 Pickleball", "🎱 Squash"].map((t) => (
            <span key={t} className="ssl-sport-tag">
              {t}
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

        <p className="ssl-eyebrow">¿Te suena familiar?</p>
        <div className="ssl-pain-cards">
          <div className="ssl-pain-card">
            <span className="ssl-pain-icon" aria-hidden>
              ⚡
            </span>
            <span>Dolor o molestias en el hombro al jugar</span>
          </div>
          <div className="ssl-pain-card">
            <span className="ssl-pain-icon" aria-hidden>
              🎯
            </span>
            <span>Falta de estabilidad y potencia en tus golpes</span>
          </div>
          <div className="ssl-pain-card">
            <span className="ssl-pain-icon" aria-hidden>
              📉
            </span>
            <span>Sensación de estancamiento aunque entrenas</span>
          </div>
        </div>
        <p className="ssl-pain-tagline">
          No necesitas entrenar más,
          <br />
          necesitas entrenar <em>mejor</em>
        </p>
      </section>

      <section className="ssl-value ssl-reveal">
        <div className="ssl-value-header">
          <p className="ssl-eyebrow">Lo que recibirás</p>
          <h2 className="ssl-section-title">
            10 ejercicios de estabilidad
            <br />
            de hombro <span className="ssl-accent">específicos</span>
            <br />
            para deportes de raqueta
            <br />
            que van a reducir tu
            <br />
            <span className="ssl-accent">riesgo lesional</span>
          </h2>
        </div>
        <div className="ssl-value-items">
          {[
            {
              n: "1",
              t: "10 ejercicios seleccionados por expertos",
              s: "Diseñados por especialistas en deporte de raqueta",
            },
            {
              n: "2",
              t: "Adaptados a tu deporte específico",
              s: "Tenis, pádel, pickleball, bádminton y más",
            },
            {
              n: "3",
              t: "Indicaciones claras para aplicarlos",
              s: "Series, repeticiones y cuándo hacerlos",
            },
            {
              n: "4",
              t: "Mejora inmediata en pista",
              s: "Notarás la diferencia en tu siguiente sesión",
            },
          ].map((item) => (
            <div key={item.n} className="ssl-value-card">
              <div className="ssl-value-num">{item.n}</div>
              <div className="ssl-value-body">
                <strong>{item.t}</strong>
                <span>{item.s}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ssl-bonus-wrap ssl-reveal">
        <div className="ssl-bonus">
          <div className="ssl-bonus-tag">Bonus exclusivo</div>
          <p className="ssl-bonus-title">
            Acceso anticipado a BIVO
            <br />+ 1 mes <span className="ssl-accent">gratis</span>
          </p>
          <p className="ssl-bonus-sub">
            Solo disponible para usuarios registrados
            <br />
            antes del lanzamiento oficial
          </p>
        </div>
      </div>

      <section className="ssl-form-section ssl-reveal" id="formulario">
        <div className="ssl-form-header">
          <p className="ssl-eyebrow">Acceso inmediato</p>
          <h2 className="ssl-form-title">
            Recibe tus ejercicios
            <br />
            <span className="ssl-accent">personalizados</span>
          </h2>
          <p className="ssl-form-desc">Menos de 30 segundos. Completamente gratis.</p>
        </div>

        {!success ? (
          <div className="ssl-form-card" id="formCard">
            <p className="ssl-field-label">
              Tu deporte <span className="ssl-req">*</span>
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
            <p className="ssl-info-block-title">Información personal</p>

            <div className="ssl-field-row">
              <div className="ssl-field">
                <label htmlFor="ssl-nombre">
                  Nombre <span className="ssl-req">*</span>
                </label>
                <input
                  id="ssl-nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                />
              </div>
              <div className="ssl-field">
                <label htmlFor="ssl-apellido">
                  Apellido <span className="ssl-req">*</span>
                </label>
                <input
                  id="ssl-apellido"
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Tu apellido"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="ssl-field">
              <label htmlFor="ssl-email">
                Email <span className="ssl-req">*</span>
              </label>
              <input
                id="ssl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </div>

            <div className="ssl-field">
              <label htmlFor="ssl-telefono">Teléfono</label>
              <input
                id="ssl-telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+34 600 000 000"
                autoComplete="tel"
              />
              <p className="ssl-field-hint">Te enviaremos consejos útiles y recordatorios (opcional)</p>
            </div>

            <button className="ssl-btn-submit" type="button" disabled={submitting} onClick={handleSubmit}>
              {submitting ? "Enviando…" : "Recibir mis ejercicios personalizados →"}
            </button>

            <p className="ssl-form-privacy">🔒 Tus datos están seguros. Sin spam, nunca.</p>
          </div>
        ) : (
          <div className="ssl-form-card ssl-success-state" id="successState">
            <div className="ssl-success-icon">✓</div>
            <h3 className="ssl-success-title">¡Listo! Revisa tu email</h3>
            <p className="ssl-success-sub">
              Te acabamos de enviar tus 10 ejercicios de estabilidad personalizados.
            </p>
            <div className="ssl-success-bonus-box">
              <strong>🎁 Bonus activado</strong>
              Ya tienes acceso anticipado con <strong>1 mes gratis</strong> cuando lancemos BIVO. Te
              avisaremos.
            </div>
            <p style={{ fontSize: 12, color: "#484848" }}>¿No lo ves? Revisa la carpeta de spam.</p>
          </div>
        )}
      </section>

      <footer className="ssl-footer">
        <span className="ssl-footer-logo ssl-text-logo" aria-hidden>
          BIVO
        </span>
        <p>© 2025 BIVO · La preparación física inteligente para deportistas de raqueta</p>
      </footer>
    </div>
  );
};

export default ShoulderStabilityLanding;
