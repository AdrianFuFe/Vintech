import { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TokenContext } from './TokenContextProvider';


const GoFavsButton = (props) => {

  const [ token ] = useContext(TokenContext);


  return (
    <>
      {token ? (
        <Link to="/user/:id/favs">
          <img src={'../images/icons/png/favs-line-orange.png'} alt='icono de favoritos'></img>
        </Link>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  )
}

export default GoFavsButton;