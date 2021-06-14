import { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { TokenContext } from '../components/TokenContextProvider';
import LoginForm from '../components/LoginForm';
import CloseButton from '../components/CloseButton';

const LoginPage = (props) => {
  const [token] = useContext(TokenContext);
  return (
    <>
      {!token ? (
        <div>
          <CloseButton/>
          <h2> ¡Bienvenido! </h2>
          <LoginForm />
          <p>
            Todavía no tengo cuenta
            <Link to="/register">
              Crear cuenta
            </Link>
          </p>
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};

export default LoginPage;
