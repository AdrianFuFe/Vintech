import { useEffect, useState } from "react";

const useWhoAmI = (info, decodedToken) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    let marcador = info.id_user_A;
    if (decodedToken.id === info.id_user_A) {
      marcador = info.id_user_B;
    }

    const chargeUser = async () => {
      const res = await fetch(`http://localhost:3300/user/${marcador}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUser(data);
      console.log(data);
    };
    chargeUser();
  }, []);

  return [user, setUser];
};

export default useWhoAmI;
