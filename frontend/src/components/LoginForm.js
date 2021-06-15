import { useState, useContext } from 'react';
import { TokenContext } from './TokenContextProvider';
import CloseButton from './CloseButton';
import { Link } from 'react-router-dom';
import '../css/login-form.css'

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setToken] = useContext(TokenContext);
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
    <div id='login'>
      <CloseButton id='closeBtn'/>
      <h2> ¡Bienvenido! </h2>
      <form id="login" onSubmit={login}>
        <label htmlFor="loginEmail" />
        <input 
          type="email" 
          id="loginEmail" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email'
          />

        <label htmlFor="loginPassword"/>
        <input
          type="password"
          id="loginPassword"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Contraseña'
          />

        <p>Todavía no tengo cuenta, <Link to="/register">Crear cuenta</Link></p>

        <input type="submit" value="Enviar" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
