import useRemoteProducts from "../hooks/useRemoteProducts";
import ProductSheet from "./ProductSheet";

const ProductsGallery = (props) => {
  const [products] = useRemoteProducts();
  console.log(products);

  const arrayProducts = products.map((product) => <li>{product.message}</li>);

  return <ul>{arrayProducts}</ul>;
};

export default ProductsGallery;
