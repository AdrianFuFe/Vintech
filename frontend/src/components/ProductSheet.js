import ProductImg from "./ProductImg";
import ProductInfo from "./ProductInfo";

const ProductSheet = (props) => {

  const { prod } = props;

  return (
    <div className='productSheet'>
      <ProductImg images={prod.images}/>
      <ProductInfo content={prod.body}/>
    </div>
  )
}

export default ProductSheet;