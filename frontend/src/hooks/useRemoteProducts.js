import { useEffect, useState } from "react";

const useRemoteProducts = (props) => {
  let direction;
  props ? (direction = `?search=${props}`) : (direction = "");
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetch(`http://localhost:3300/products${direction}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, [props]);

  return [products, setProducts];
};

export default useRemoteProducts;
