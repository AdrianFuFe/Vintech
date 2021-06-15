import { useEffect, useState } from 'react';

const useRemoteProducts = () => {
  const [products, setProducts] = useState([]);

  const chargeProducts = async () => {
    const res = await fetch('http://localhost:3300/products');
    const fetchedProducts = await res.json();
    setProducts(fetchedProducts);
  };
  
  useEffect(() => {
    chargeProducts();
  },[]);

  return products;
};

export default useRemoteProducts;
