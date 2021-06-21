import { Link } from "react-router-dom";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const SellerInfo = () => {
  const [product] = useRemoteSingleProduct();

  return product.data ? (
    <div id="seller-info">
      <Link to={`/user/${product.data[0].user_id}`}>
        <div id="seller-avatar">
          {product.data[0].user_img ? (
            <img
              src={`http://localhost:3300/uploads/avatars/${product.data[0].user_img}`}
              alt="avatar de usuario"
            />
          ) : (
            <AccountCircleOutlinedIcon />
          )}
        </div>
        <h3>{product.data[0].user_username}</h3>
        <Rating
          name="user-rating"
          id="user-rating"
          defaultValue={product.feedback[0].rating}
          precision={0.25}
          readOnly
        />

        <p>
          <LocationOnOutlinedIcon />
          {product.data[0].user_last_ubication}
        </p>
      </Link>
    </div>
  ) : (
    <h2>No hay información de usuario</h2>
  );
};

export default SellerInfo;
