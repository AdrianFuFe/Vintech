import { useState, useContext } from 'react';
import { TokenContext } from './TokenContextProvider';
import { useHistory } from 'react-router';

const ChangePwdForm = (props) =>{

  const {user} = props;
  const id = user.id;
  
  const [token] = useContext(TokenContext);
  const history = useHistory();

  const [ oldPwd, setOldPwd ] = useState('');
  const [ newPwd, setNewPwd ] = useState('');
  const [ newPwdConfirm, setNewPwdConfirm ] = useState('');

  const [error, setError] = useState('');

  const changePwd = async (e) => {
    e.preventDefault();

    const info = { oldPwd, newPwd, newPwdConfirm}
    
    const res = await fetch(`http://localhost:3300/user/${id}/changePwd`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token}`,
      },
      body: JSON.stringify(info),
    });
    
    const data = await res.json();

    if (res.ok) {
      setError('');
      history.push(`/user/${user.id}`);
    } else {
      setError(data.error);
    }
  };

  return (
    <div id='changePwdWrapper'>
      <h2>Cambiar mi Contraseña</h2>
        <form id="changePwdForm" onSubmit={changePwd}>
  
          <label htmlFor="oldPwd"/>
          <input 
            type='password' 
            id='oldPwd' 
            name='oldPwd' 
            value={oldPwd} 
            onChange={(e)=> setOldPwd(e.target.value)}
            placeholder='contraseña antigua'
          />

          <label htmlFor="newPwd"/>
          <input 
            type='password' 
            id='newPwd' 
            name='newPwd' 
            value={newPwd} 
            onChange={(e)=> setNewPwd(e.target.value)}
            placeholder='nueva contraseña' 
          />

          <label htmlFor="confirmPwd"/>
          <input 
            type='password' 
            id='confirmPwd' 
            name='confirmPwd' 
            value={newPwdConfirm} 
            onChange={(e)=> setNewPwdConfirm(e.target.value)}
            placeholder='confirma la nueva contraseña'
          />

          <input type="submit" value="Cambiar contraseña"/>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
}
export default ChangePwdForm;