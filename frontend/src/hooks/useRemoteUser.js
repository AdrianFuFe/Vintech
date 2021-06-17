import { useEffect, useState } from 'react';

const useRemoteUser = () => {
  const [user, setUser] = useState([]);

  const chargeUser = async () => {
    const res = await fetch('http://localhost:3300/user/4', {
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
