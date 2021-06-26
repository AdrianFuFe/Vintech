import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import BookButton from "../components/BookButton";
import ChatButton from "../components/ChatButton";

const ProductBuyerOptions = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const { productData } = props;
  let data;
  productData ? (data = productData[0]) : (data = "error");

  return (
    <div id="product-options">
      {decodedToken && decodedToken.id !== data.user_id && <BookButton />}
      {decodedToken && decodedToken.id !== data.user_id && <ChatButton />}
    </div>
  );
};
export default ProductBuyerOptions;
