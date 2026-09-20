import { FormEvent, useEffect, useState } from "react";
import { badmintonAsset } from "@/lib/badmintonLandingAssets";

type BadmintonAccessGateProps = {
  onSubmit: (username: string, password: string) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
};

const BadmintonAccessGate = ({ onSubmit, submitting, error }: BadmintonAccessGateProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Bivo Training — Acceso bádminton";
    return () => {
      document.title = "Bivo Training";
    };
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void onSubmit(username, password);
  };

  return (
    <div className="badminton-landing badminton-gate">
      <div className="hero-bg">
        <img src={badmintonAsset("img/badminton.jpg")} alt="" />
        <div
          className="hero-overlay"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.96) 100%)",
          }}
        />
      </div>

      <div className="badminton-gate-card">
        <img src={badmintonAsset("assets/logo-green.png")} alt="Bivo" />
        <p className="pre-headline">Acceso restringido</p>
        <h1 className="headline">Landing de bádminton</h1>
        <p className="badminton-gate-copy">Introduce las credenciales de administrador para continuar.</p>

        <form onSubmit={handleSubmit} autoComplete="on">
          <label htmlFor="badminton-user">Usuario</label>
          <input
            id="badminton-user"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            required
          />

          <label htmlFor="badminton-password">Contraseña</label>
          <input
            id="badminton-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error ? <p className="badminton-gate-error">{error}</p> : null}

          <button type="submit" className="cta-btn" disabled={submitting}>
            {submitting ? "Comprobando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BadmintonAccessGate;
