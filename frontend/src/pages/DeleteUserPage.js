import { useParams /* , Redirect */, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import HeaderBackTitle from "../components/HeaderBackTitle";
import MenuBar from "../components/MenuBar";
import "../css/register-login-forms.css";
import "../css/edit-forms.css";

const DeleteUserPage = (props) => {
  const { id } = useParams();
  const [token, setToken] = useContext(TokenContext);
  const [error, setError] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const deleteUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3300/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ pwd, confirmPwd }),
    });
    const data = await res.json();
    if (res.ok) {
      setToken("");
      setError(
        <p>
          Cuenta eliminada corractamente{" "}
          <Link to="/register"> Volver a la página de registro</Link>
        </p>
      );
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <HeaderBackTitle />
      <div className="form-wrapper">
        <h2> Eliminar usuario </h2>
        <form id="delete-form" onSubmit={deleteUser}>
          <label htmlFor="pwd" />
          <input
            type="password"
            id="deletePwd"
            name="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <label htmlFor="confirmPwd" />
          <input
            type="password"
            id="deleteConfirmPwd"
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
      <MenuBar />
    </>
  );
};

export default DeleteUserPage;
