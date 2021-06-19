import { useState } from 'react';
import CloseButton from '../components/CloseButton';
import { Link } from 'react-router-dom';
import "../css/register-form.css";
import { useHistory } from 'react-router';

const RegisterForm = (props) => {

  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ pwd, setPwd ] = useState('');

  const [error, setError] = useState('');

  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3300/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, pwd }),
    });
    
    const data = await res.json();

    if (res.ok) {
      setError('');
      history.push('/welcome');
    } else {
      setError(data.error);
    }
  };

  return (
    <div id='register'>
      <CloseButton />
      <h2>Registro</h2>
      <form id="registerForm" onSubmit={register}>

        <label htmlFor="registerName"/>
        <input 
          type='text' 
          id='registerName' 
          name='name' 
          value={username} 
          onChange={(e)=> setUsername(e.target.value)} 
          placeholder='Nombre' 
          required
        />

        <label htmlFor="registerEmail"/>
        <input 
          type="email" 
          id="registerEmail" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email'
          required
        />

        <label htmlFor="registerPwd" />
        <input
          type="password"
          id="registerPassword"
          name="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder='Contraseña'
          required
        />

        <p> Ya tengo cuenta, <Link to="/login"> Entrar </Link> </p>

        <label htmlFor='registerCheck'>
          <input type='checkbox' required/> 
          <p id='checkTxt'>He leidoy acepto las condiciones de uso y la politica de privacidad</p>
        </label>

        <input type="submit" value="Registrarme"/>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
