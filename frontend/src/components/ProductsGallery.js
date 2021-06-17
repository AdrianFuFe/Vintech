import useRemoteProducts from '../hooks/useRemoteProducts';
import ProductSheet from './ProductSheet';

const ProductsGallery = (props) => {
  const products = useRemoteProducts();

  console.log(products);

  const arrayProducts = products.map((product) => <ProductSheet key={product.id} obj={product}/>);

  return <ul>{arrayProducts}</ul>;
};

export default ProductsGallery;

