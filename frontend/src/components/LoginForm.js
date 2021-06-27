import { useState, useContext } from "react";
import { TokenContext } from "./TokenContextProvider";
import CloseButton from "./CloseButton";
import { Link } from "react-router-dom";
import "../css/register-login-forms.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [, setToken] = useContext(TokenContext);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3300/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pwd }),
    });
    const data = await res.json();
    if (res.ok) {
      setError("");
      setToken(data.authToken);
    } else {
      setError(data.error);
    }
  };
  return (
    <div className="r-l-forms">
      <CloseButton id="closeBtn" />
      <h2> ¡Bienvenido! </h2>
      <form id="login" onSubmit={login}>
        <label htmlFor="loginEmail" />
        <input
          type="email"
          id="loginEmail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <label htmlFor="loginPassword" />
        <input
          type="password"
          id="loginPassword"
          name="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Contraseña"
          required
        />

        <p>
          Todavía no tengo cuenta, <Link to="/register">Crear cuenta</Link>
        </p>

        <input type="submit" value="Enviar" />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
