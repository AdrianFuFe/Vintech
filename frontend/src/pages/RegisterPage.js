import { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { TokenContext } from '../components/TokenContextProvider';
import RegisterForm from '../components/RegisterForm';
import CloseButton from '../components/CloseButton';

const RegisterPage = (props) => {
  const [token] = useContext(TokenContext);

  return (
    <>
      {!token ? (
        <div>
          <CloseButton/>
          <h2>Registro</h2>
          <RegisterForm />
          <p> Ya tengo cuenta, <Link to="/login"> Entrar </Link> </p>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
};

export default RegisterPage;
