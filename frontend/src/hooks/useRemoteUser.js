import { useEffect, useState, useContext } from 'react';
import { TokenContext } from '../components/TokenContextProvider';
import decodeToken from '../utils/decodeToken'
import { useParams } from 'react-router';

const useRemoteUser = () => {
const {id} = useParams();

  const [user, setUser] = useState([]);

  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const idToken = `${decodedToken.id}`;
  
  useEffect(() => {
    if ( id === idToken ) {
      const chargeUser = async () => {
        const res = await fetch(`http://localhost:3300/user/${idToken}/myProfile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        });
        const fetchedUser = await res.json();
        setUser(fetchedUser);
      };
      chargeUser();
      
    } else {
      const chargeUser = async () => {
        const res = await fetch(`http://localhost:3300/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const fetchedUser = await res.json();
        setUser(fetchedUser);
      };
      chargeUser();
    }
  },[]);
  
  return [user, setUser];
};

export default useRemoteUser;
