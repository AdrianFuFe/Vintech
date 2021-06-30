import { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";

const useRemoteProducts = () => {
  const { search } = useLocation();
  const value = queryString.parse(search).search;
  const min = queryString.parse(search).min;
  const max = queryString.parse(search).max;

  const info = {
    min: min || 0,
    max: max || Infinity,
  };

  let direction;
  search
    ? (direction = `?search=${value}&min=${info.min}&max=${info.max}`)
    : (direction = "");
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
  }, [search]);

  return [products, setProducts];
};

export default useRemoteProducts;
