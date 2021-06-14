import { useState, useContext } from 'react';
import { TokenContext } from './TokenContextProvider';

const RegisterForm = (props) => {

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [, setToken] = useContext(TokenContext);
  const [error, setError] = useState('');

  const register = async (e) => {
    e.preventDefault();
      const res = await fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
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
    <form id="register" onSubmit={register}>

      <label htmlFor="registerName"/>
      <input 
        type='text' 
        id='registerName' 
        name='name' 
        value={name} 
        onChange={(e)=> setName(e.target.value)} 
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Contraseña'
      />


      <label htmlFor='registerCheck'>
        <input type='checkbox' />
        He leidoy acepto las condiciones de uso y la politica de privacidad
      </label>

        <input type="submit" value="Enviar" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default RegisterForm;
