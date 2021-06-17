import useRemoteProducts from "../hooks/useRemoteProducts";
import IconButton from "@material-ui/core/IconButton";
import PhotoIcon from "@material-ui/icons/Photo";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ReactTimeAgo from "react-time-ago";

const ProductsGallery = (props) => {
  const [products] = useRemoteProducts();
  const data = products.data;
  let arrayData;
  data
    ? (arrayData = data.map((product) => (
        <li key={product.id} className="product">
          <div className="div-img">
            {product.img ? (
              <img
                src={`http://localhost:3300/uploads/imgs/${product.img.img}`}
                alt="foto de producto"
              />
            ) : (
              <IconButton>
                <PhotoIcon />
              </IconButton>
            )}
          </div>
          <h2>{product.price}</h2>
          <p>
            <ReactTimeAgo date={product.modification_date} locale="es-ES" />
          </p>
          <p>{product.title}</p>
          <p>
            <LocationOnOutlinedIcon />
            {product.ubication}
          </p>
        </li>
      )))
    : (arrayData = "No hay productos");

  return <ul>{arrayData}</ul>;
};

export default ProductsGallery;
