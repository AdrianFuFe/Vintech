import { Link } from "react-router-dom";
import LogoVintech from "../components/LogoVintech";
import "../css/welcome.css";

const WelcomePage = (props) => {
  return (
    <div id="welcome">
      <LogoVintech />
      <h2> ¡Te has registrado correctamente! </h2>
      <p>
        Antes de entrar revisa tu correo y activa tu cuenta con el link que te
        enviamos
      </p>
      <Link to="/login">
        <button>IR AL LOGIN</button>
      </Link>
    </div>
  );
};

export default WelcomePage;
