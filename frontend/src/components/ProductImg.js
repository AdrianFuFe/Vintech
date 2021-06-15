import useRemoteProducts from "../hooks/useRemoteProducts";

const ProductImg = (props) => {

  console.log(useRemoteProducts);

  return (
    <div className="prodImg">
      <img src={`/images/products/${props.product}.png`} alt="Foto de producto"></img>
    </div>
  );
};

export default ProductImg;
