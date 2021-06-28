import { Link } from "react-router-dom";
import PhotoIcon from "@material-ui/icons/Photo";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ReactTimeAgo from "react-time-ago";
import "../css/my-products-list.css";

const UserProductsList = (props) => {
  const { products } = props;

  let arrayProducts;
  products
    ? (arrayProducts = products.map((product) => (
        <li key={product.id} className="products-list">
          <Link to={`/product/${product.id}`}>
            <div className="img-list">
              {product.img ? (
                <img
                  src={`http://localhost:3300/uploads/imgs/${product.img.img}`}
                  alt="foto de producto"
                />
              ) : (
                <PhotoIcon />
              )}
            </div>
            <h3>{product.price}€</h3>
            <p className="time-ago">
              <ReactTimeAgo date={product.modification_date} locale="es-ES" />
            </p>
            <h2 className="prod-title">{product.title}</h2>
            <p className="prod-ubication">
              <LocationOnOutlinedIcon />
              {product.ubication}
            </p>
          </Link>
        </li>
      )))
    : (arrayProducts = "No tienes productos");

  return <ul id="products-list">{arrayProducts}</ul>;
};

export default UserProductsList;
