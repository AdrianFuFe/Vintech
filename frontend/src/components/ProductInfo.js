import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";
import Moment from "react-moment";
import "moment-timezone";

const ProductInfo = (props) => {
  const [product] = useRemoteSingleProduct();

  return product.data ? (
    <>
      <div className="product-sheet">
        <h2 id="price">{product.data[0].price}</h2>
        <h2 id="title">{product.data[0].title}</h2>
        <p>{product.data[0].description}</p>
        <p>
          <Moment format="DD/MM/YYYY">
            {product.data[0].modification_date}
          </Moment>
        </p>
      </div>
    </>
  ) : (
    <h2>No hay información</h2>
  );
};

export default ProductInfo;
