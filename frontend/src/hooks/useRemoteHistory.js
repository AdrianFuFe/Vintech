import { useEffect, useState } from "react";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import decodeToken from "../utils/decodeToken";

const useRemoteHistory = () => {
  const [products, setProducts] = useState([]);
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const idToken = decodedToken.id;

  const loadProducts = async () => {
    const res = await fetch(`http://localhost:3300/user/${idToken}/history`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return [products, setProducts];
};

export default useRemoteHistory;
