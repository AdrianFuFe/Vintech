import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LogoVintech from "../components/LogoVintech";
import "../css/welcome.css";

const ActivationPage = (props) => {
  let { activationCode } = useParams();

  console.log(activationCode);

  useEffect(() => {
    const activateUser = async () => {
      await fetch(`http://localhost:3300/activation/${activationCode}`, {
        method: "GET",
      });
    };
    activateUser();
  }, [activationCode]);

  return (
    <div id="welcome">
      <LogoVintech />
      <h2> ¡Tu cuenta se ha activado correctamente! </h2>
      <p> ¡Gracias por formar parte de la comunidad de Vintech! </p>
      <Link to="/login">
        <button>IR AL LOGIN</button>
      </Link>
    </div>
  );
};

export default ActivationPage;
