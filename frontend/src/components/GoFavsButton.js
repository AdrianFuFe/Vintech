import { Link } from 'react-router-dom';

const GoFavsButton = (props) => {

  return (
    <Link to="/user/:id/favs">
        <img src={'../images/icons/png/favs-line-orange.png'} alt='icono de favoritos'></img>
    </Link>
  )
}

export default GoFavsButton;