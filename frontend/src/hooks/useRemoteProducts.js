import { useEffect, useState } from "react";

const useRemoteProducts = () => {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    /* const res = [
      {
        id: 1,
        title: "comida",
      },
      {
        id: 2,
        title: "bebida",
      },
    ]; */

    const res = await fetch("http://localhost:4000/products").then((r) =>
      r.json()
    );
    setProducts(res);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return [products, setProducts];
};

export default useRemoteProducts;
