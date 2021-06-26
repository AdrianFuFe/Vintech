import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./TokenContextProvider";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import decodeToken from "../utils/decodeToken";

const FavButton = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  let id;
  decodedToken ? (id = decodedToken.id) : (id = null);
  const { productData } = props;
  let idProduct;
  productData
    ? (idProduct = productData[0].id)
    : (idProduct = "cargando informacion del producto");
  const [fav, setFav] = useState();

  const checkFavs = async () => {
    const res = await fetch(`http://localhost:3300/user/${id}/favs`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const data = await res.json();
    const products = await data.products;
    const arrayProductIds = [];
    for (let i = 0; i < products.length; i++) {
      const productIds = await products[i].id;
      arrayProductIds.push(productIds);
    }
    arrayProductIds.includes(idProduct) ? setFav(true) : setFav(false);
  };
  checkFavs();

  useEffect(() => {
    checkFavs();
  }, [fav]);

  const addFav = async (e) => {
    await fetch(`http://localhost:3300/product/${idProduct}/fav`, {
      method: "POST",
      headers: {
        authorization: token,
      },
    });
    setFav(true);
  };

  const deleteFav = async (e) => {
    await fetch(`http://localhost:3300/product/${idProduct}/fav`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    setFav(false);
  };

  return token ? (
    <div div id="fav-btn">
      {fav === false && <FavoriteBorderIcon onClick={addFav} />}
      {fav === true && <FavoriteIcon onClick={deleteFav} />}
    </div>
  ) : (
    <Link to="/login" />
  );
};
export default FavButton;
