import { useState } from 'react';
import { useHistory } from 'react-router';
import "../css/register-form.css";


const EditUserForm = (props) => {

    const { user } = props;
  
    const [ username, setUsername ] = useState('');
    const [ fname, setFname ] = useState('');
    const [ lname, setLname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ last_ubication, setLast_ubication] = useState('');

    const [error, setError] = useState('');
  
    const history = useHistory();
  
    const editUser = async (e) => {
      e.preventDefault();

      const res = await fetch('http://localhost:3300/user/:id', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fname, lname, email, pwd, bio, last_ubication}),
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
      <div id='editUserWrapper'>
        <h2>Mis datos de perfil</h2>
        <form id="editUserForm" onSubmit={editUser}>
  
          <label htmlFor="editUsername"/>
          <input 
            type='text' 
            id='editUsername' 
            name='editUsername' 
            value={username} 
            onChange={(e)=> setUsername(e.target.value)} 
            placeholder={ user.username ? (user.username) : ('Alias')} 
          />

          <label htmlFor="editFname"/>
          <input 
            type='text' 
            id='editFname' 
            name='editFname' 
            value={fname} 
            onChange={(e)=> setFname(e.target.value)} 
            placeholder={ user.fname ? (user.fname) : ('Nombre' )} 
          />

          <label htmlFor="editLname"/>
          <input 
            type='text' 
            id='editLname' 
            name='editLname' 
            value={fname} 
            onChange={(e)=> setLname(e.target.value)} 
            placeholder={ user.lname ? (user.lname) : ('Apellidos')} 
          />
  
          <label htmlFor="editEmail"/>
          <input 
            type="email" 
            id="editEmail" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder={ user.email ? (user.email) : ('Email')}
          />
  
          <label htmlFor="registerPwd" />
          <input
            type="password"
            id="registerPassword"
            name="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder={ user.pwd ? (user.pwd) : ('Contraseña')}
          />

          <label htmlFor="editFname"/>
          <input 
            type='textarea' 
            id='editBio' 
            name='editBio' 
            value={bio} 
            onChange={(e)=> setBio(e.target.value)} 
            placeholder={ user.bio ? (user.bio) : ('Biografía')}
          />

          <label htmlFor="editUbication"/>
          <input 
            type='text' 
            id='editUbication' 
            name='editUbication' 
            value={last_ubication} 
            onChange={(e)=> setLast_ubication(e.target.value)} 
            placeholder={ user.last_ubication ? (user.last_ubication) : ('Ubicación')}
          />
  
          <input type="submit" value="Actualizar mis datos"/>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
}

export default EditUserForm;