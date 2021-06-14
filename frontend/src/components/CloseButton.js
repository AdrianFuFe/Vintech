import { Link } from 'react-router-dom';

const CloseButton = (props) => {

  return (
        <Link to="/">
          <img src={'../images/icons/png/cancel-btn.png'} alt='icono de cerrar'></img>
        </Link>
  )
}

export default CloseButton;