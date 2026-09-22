import { FormEvent, useEffect, useState } from "react";

type SportLandingAccessGateProps = {
  landingClass: string;
  heroSrc: string;
  logoSrc: string;
  title: string;
  documentTitle: string;
  onSubmit: (username: string, password: string) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
};

const SportLandingAccessGate = ({
  landingClass,
  heroSrc,
  logoSrc,
  title,
  documentTitle,
  onSubmit,
  submitting,
  error,
}: SportLandingAccessGateProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = documentTitle;
    return () => {
      document.title = "Bivo Training";
    };
  }, [documentTitle]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void onSubmit(username, password);
  };

  return (
    <div className={`${landingClass} sport-landing-gate`}>
      <div className="hero-bg">
        <img src={heroSrc} alt="" />
        <div
          className="hero-overlay"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.96) 100%)",
          }}
        />
      </div>

      <div className="sport-landing-gate-card">
        <img src={logoSrc} alt="Bivo" />
        <p className="pre-headline">Acceso restringido</p>
        <h1 className="headline">{title}</h1>
        <p className="sport-landing-gate-copy">Introduce las credenciales de administrador para continuar.</p>

        <form onSubmit={handleSubmit} autoComplete="on">
          <label htmlFor={`${landingClass}-user`}>Usuario</label>
          <input
            id={`${landingClass}-user`}
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            required
          />

          <label htmlFor={`${landingClass}-password`}>Contraseña</label>
          <input
            id={`${landingClass}-password`}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error ? <p className="sport-landing-gate-error">{error}</p> : null}

          <button type="submit" className="cta-btn" disabled={submitting}>
            {submitting ? "Comprobando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SportLandingAccessGate;
