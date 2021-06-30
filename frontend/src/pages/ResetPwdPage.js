import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import CloseButton from "../components/CloseButton";
import "../css/register-login-forms.css";

const ResetPwdPage = (props) => {
  const { code } = useParams();
  const [error, setError] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const reset = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3300/reset-password/${code}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pwd, confirmPwd }),
    });
    const data = await res.json();
    if (res.ok) {
      setError(
        `Tu contraseña se ha actualizado correctamente, vuelve al login para iniciar sesión`
      );
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="r-l-forms">
      <CloseButton id="closeBtn" />
      <h2> Recupera tu contraseña </h2>
      <form id="login" onSubmit={reset}>
        <label htmlFor="pwd" />
        <input
          type="password"
          id="loginPassword"
          name="pwd"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <label htmlFor="confirmPwd" />
        <input
          type="password"
          id="loginPassword"
          name="confirmPwd"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          placeholder="Confirmar contraseña"
          required
        />
        <input type="submit" value="Enviar" />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
export default ResetPwdPage;
