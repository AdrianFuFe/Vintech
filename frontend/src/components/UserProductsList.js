import { Link } from "react-router-dom";
import PhotoIcon from "@material-ui/icons/Photo";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ReactTimeAgo from "react-time-ago";
import "../css/products-gallery.css";

const UserProductsList = (props) => {
  const {products} = props;
  
  let arrayProducts;
  products
    ? (arrayProducts = products.map((product) => (
      <li key={product.id} className="product">
        <Link to={`/product/${product.id}`}>
          <div className="div-img">
            {product.img ? (
              <img
                src={`http://localhost:3300/uploads/imgs/${product.img.img}`}
                alt="foto de producto"
              />
            ) : (
              <PhotoIcon />
            )}
          </div>
          <h2>{product.price}</h2>
          <p className="time-ago">
            <ReactTimeAgo date={product.modification_date} locale="es-ES" />
          </p>
          <p className="product-title">{product.title}</p>
          <p className="product-ubication">
            <LocationOnOutlinedIcon />
            {product.ubication}
          </p>
        </Link>
      </li>
      )))
    : (arrayProducts = "No tienes productos")
  

  return(<ul id="products">{arrayProducts}</ul>  )
}

export default UserProductsList;