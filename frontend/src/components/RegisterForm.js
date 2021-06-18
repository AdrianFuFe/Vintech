import { useState, useContext } from 'react';
import { TokenContext } from './TokenContextProvider';
import CloseButton from '../components/CloseButton';
import { Link } from 'react-router-dom';
import "../css/register-form.css";

const RegisterForm = (props) => {

  const [ fname, setFname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ pwd, setPwd ] = useState('');

  const [, setToken] = useContext(TokenContext);
  const [error, setError] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3300/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname, email, pwd }),
    });
    
    const data = await res.json();

    if (res.ok) {
      setError('');
      setToken(data.accessToken);
    } else {
      setError(data);
    }

  };

  return (
    <div id='register'>
      <CloseButton />
      <h2>Registro</h2>
      <form id="register" onSubmit={register}>

        <label htmlFor="registerName"/>
        <input 
          type='text' 
          id='registerName' 
          name='name' 
          value={fname} 
          onChange={(e)=> setFname(e.target.value)} 
          placeholder='Nombre' 
        />

        <label htmlFor="registerEmail"/>
        <input 
          type="email" 
          id="registerEmail" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email'
        />

        <label htmlFor="registerPwd" />
        <input
          type="password"
          id="registerPassword"
          name="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder='Contraseña'
        />

        <p> Ya tengo cuenta, <Link to="/login"> Entrar </Link> </p>

        <label htmlFor='registerCheck'>
          <input type='checkbox' /> 
          <p id='checkTxt'>He leidoy acepto las condiciones de uso y la politica de privacidad</p>
        </label>

        <input type="submit" value="Registrarme" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
