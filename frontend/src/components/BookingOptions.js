import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import BookingOptionsSeller from "./BookingOptionsSeller";
import BookingOptionsCancel from "./BookingOptionsCancel";

const BookingOptions = (props) => {
  const { info } = props;
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  let state;
  let userSeller;
  let userBuyer;

  if (info) {
    state = info.status;
    userSeller = info.id_user_A;
    userBuyer = info.id_user_B;
  } else {
    state = "comprobando estado";
    userSeller = "comprobando id de vendedor";
    userBuyer = "comprobando id del comprador";
  }

  return (
    <>
      {((decodedToken.id === userSeller && state === "sent") ||
        (decodedToken.id === userSeller && state === "read")) && (
        <BookingOptionsSeller product={info.id_product} />
      )}
      {((decodedToken.id === userSeller && state === "accepted") ||
        (decodedToken.id === userBuyer &&
          (state === "sent" || state === "read"))) && <BookingOptionsCancel />}
    </>
  );
};

export default BookingOptions;
