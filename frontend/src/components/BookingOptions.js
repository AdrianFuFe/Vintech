import { TokenContext } from '../components/TokenContextProvider';
import decodeToken from '../utils/decodeToken';
import { useContext, useState } from 'react';


const BookingOptions = (props) => {
  const {info}=props;
  console.log(info);
  
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  const[meetDate, setMeetDate] = useState();
  const[ubication, setUbication] = useState();
  const[error, setError] = useState();


  const actualUser = decodedToken.id;
  let state;
  let userSeller;
  let userBuyer;

  if(info){
    state = info.status;
    userSeller = info.id_user_A;
    userBuyer = info.id_user_B;
  } else {
    state='comprobando estado';
    userSeller = 'comprobando id de vendedor';
    userBuyer = 'comprobando id del comprador';
  };

  console.log(actualUser, state, userSeller, userBuyer);

  const acceptHandler = async(e) =>{
    e.preventDefault();
    const response = 'accept'
    const res = await fetch(`http://localhost:3300/user/${actualUser}/bookings/${info.id}/${response}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ meetDate, ubication }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setError('');
    } else {
      setError(data.error);
    }
  };

  const rejectHandler = async (e) => {
    const response = 'reject'
    e.preventDefault();
    const res = await fetch(`http://localhost:3300/user/${actualUser}/bookings/${info.id}/${response}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setError('');
    } else {
      setError(data.error);
    }
  };

  const cancelHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3300/user/${actualUser}/bookings/${info.id}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setError('');
    } else {
      setError(data.error);
    }
  };
  

  if (actualUser === userSeller && state === "read"){
    const userIsSeller=true;
    return userIsSeller;
  }


  return(
/*     <>
      {actualUser === userSeller ? (
        state === "read" ? ( */
        <>
          <form id='meeting' onSubmit={acceptHandler}>
            <label htmlFor="meeting-date" />
            <input 
              type="datetime-local" 
              id="meeting-date" 
              name="meeting-date" 
              value={meetDate} 
              onChange={(e) => setMeetDate(e.target.value)} 
              placeholder='Día propuesto para la venta'
              required
            />

            <label htmlFor="meeting-ubication" />
            <input 
              type="text" 
              id="meeting-ubication" 
              name="meeting-ubication" 
              value={ubication} 
              onChange={(e) => setUbication(e.target.value)} 
              placeholder='Lugar propuesta para la venta'
              required
            />
            <input type='submit' value='ACEPTAR' />
          </form>
          <button onClick={rejectHandler}>RECHAZAR</button>
          <button onClick={cancelHandler}>CANCELAR</button>
        </>
 /*        ) : (
          <>
            <p>fallo en el estado de la reserva</p>
          </>
        )
      ) : (
        <>
          <p>fallo en comparar usuario</p>
        </>
      )}
    </> */
  )
  
}

export default BookingOptions;