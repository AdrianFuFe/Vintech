import { useState } from "react";
import CloseButton from "../components/CloseButton";
import "../css/register-login-forms.css";

const RecoverPwdPage = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const recover = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3300/recoverPwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setError("Petición realizada correctamente, revisa tu correo");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="r-l-forms">
      <CloseButton id="closeBtn" />
      <h2> Recupera tu contraseña </h2>
      <p id="recover-text">
        Indica el email con el que ta has registrado y te enviaremos un enlace
        para recuperar tu contraseña
      </p>
      <form id="recover-form" onSubmit={recover}>
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
        <input id="recover-btn" type="submit" value="Enviar" />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
export default RecoverPwdPage;
