import { useEffect, useState } from "react";

const useRemoteProducts = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetch("http://localhost:3300/products");
    const fetchedProducts = await res.json();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return [products, setProducts];
};

export default useRemoteProducts;
