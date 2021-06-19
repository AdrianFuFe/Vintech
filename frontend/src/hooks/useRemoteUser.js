import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useRemoteUser = () => {
  const [user, setUser] = useState([]);

  let {id} = useParams();

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

  useEffect(() => {
    chargeUser();
  },[]);
  
  return [user, setUser];
};

export default useRemoteUser;
