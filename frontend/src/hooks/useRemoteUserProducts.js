import { useEffect, useState } from "react";
import { useParams } from "react-router";

const useRemoteUserProducts = (props) => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch(`http://localhost:3300/user/${id}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return [products, setProducts];
};

export default useRemoteUserProducts;
