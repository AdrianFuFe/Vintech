import { Link } from "react-router-dom";
import PhotoIcon from "@material-ui/icons/Photo";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ReactTimeAgo from "react-time-ago";
import "../css/favs-list.css";

const FavsList = (props) => {
  const {favs, products} = props;

  let arrayFavs;
  favs
  ?(arrayFavs = favs.map((fav, index) => {
    const productInfo = products[index];
    return (
      <li key={fav.id} className="fav">
        <Link to={`/product/${productInfo.id}`}>
            <div className="div-img">
              {productInfo.img ? (
                <img
                  src={`http://localhost:3300/uploads/imgs/${productInfo.img.img}`}
                  alt="foto de producto"
                />
              ) : (
                <PhotoIcon />
              )}
            </div>
            <h2>{productInfo.price}</h2>
            <p className="time-ago">
              <ReactTimeAgo date={productInfo.modification_date} locale="es-ES" />
            </p>
            <p className="fav-title">{productInfo.title}</p>
            <p className="fav-ubication">
              <LocationOnOutlinedIcon />
              {productInfo.ubication}
            </p>
          </Link>
      </li>
    );
  })) 
  : (arrayFavs = 'Todavía no hay productos favoritos')


  return(<ul id="favoritos">{arrayFavs}</ul>)
}

export default FavsList;