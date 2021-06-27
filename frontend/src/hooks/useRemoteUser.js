import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import { useParams } from "react-router";

const useRemoteUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  useEffect(() => {
    //comparamos el id de la url con el del token del usuario que accede para diferenciar la peticion a la api entre buscar mis datos y los de otro usuario
    if (Number(id) === decodedToken.id) {
      const chargeUser = async () => {
        const res = await fetch(
          `http://localhost:3300/user/${decodedToken.id}/myProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `${token}`,
            },
          }
        );
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
  }, []);

  return [user, setUser];
};

export default useRemoteUser;
