import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { TokenContext } from '../components/TokenContextProvider';
import LoginForm from '../components/LoginForm';


const LoginPage = (props) => {
  const [token] = useContext(TokenContext);
  return (
    <>
      {!token ? (
          <LoginForm />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default LoginPage;
