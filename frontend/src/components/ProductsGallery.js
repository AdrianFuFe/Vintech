import useRemoteProducts from '../hooks/useRemoteProducts';
import ProductSheet from './ProductSheet';

const ProductsGallery = (props) => {
  const [products] = useRemoteProducts();

  const arrayProducts = products?.map((product) => <ProductSheet key={product.id} />);

  return <ul>{arrayProducts}</ul>;
};

export default ProductsGallery;

