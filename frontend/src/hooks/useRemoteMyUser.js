import { useEffect, useState, useContext } from 'react';
import { TokenContext } from '../components/TokenContextProvider';
import decodeToken from '../utils/decodeToken'

const useRemoteMyUser = () => {
  const [user, setUser] = useState([]);

  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const id = decodedToken.id;

  const chargeUser = async () => {
    const res = await fetch(`http://localhost:3300/user/${id}/myProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const fetchedUser = await res.json();
    setUser(fetchedUser);
  };

  useEffect(() => {
    chargeUser();
  },[]);
  
  return [user, setUser];
};

export default useRemoteMyUser;
