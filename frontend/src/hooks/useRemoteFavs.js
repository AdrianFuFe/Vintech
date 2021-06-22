import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../components/TokenContextProvider';
import decodeToken from '../utils/decodeToken'


const useRemoteFavs = () => {
  const [favs, setFavs] = useState([]);
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const idToken = `${decodedToken.id}`;

  const loadVotes = async () => {
    const res = await fetch(`http://localhost:3300/user/${idToken}/favs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    setFavs(data);
  };

  useEffect(() => {
    loadVotes();
  }, []);

  return [favs, setFavs];
};

export default useRemoteFavs;