import { useEffect, useState } from "react";

const useRemoteProducts = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetch("http://localhost:3300/products", {
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
  }, []);

  return [products, setProducts];
};

export default useRemoteProducts;
