import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useRemoteSingleProduct = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  const loadProduct = async () => {
    const res = await fetch(`http://localhost:3300/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return [product, setProduct];
};

export default useRemoteSingleProduct;
