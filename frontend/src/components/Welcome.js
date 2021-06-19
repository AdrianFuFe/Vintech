import { Link } from "react-router-dom";
import LogoVintech from "./LogoVintech";
import '../css/welcome.css'

const Welcome = (props) => {

  return (
    <div id='welcome'>
      <LogoVintech/>
      <h2> ¡Gracias por formar parte de la comunidad de Vintech!</h2>
      <p>Antes de entrar revisa tu correo y activa tu cuenta con el link que te enviamos</p>
      <Link to='/login'>
        <button>IR AL LOGIN</button>
      </Link>
    </div>
  )
}

export default Welcome;