import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { TokenContext } from '../components/TokenContextProvider';
import RegisterForm from '../components/RegisterForm';



const RegisterPage = (props) => {
  const [token] = useContext(TokenContext);

  return (
    <>
      {!token ? (
          <RegisterForm />
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
};

export default RegisterPage;
