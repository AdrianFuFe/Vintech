import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";

const BookingOptionscancel = (props) => {
  const infoParams = useParams();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const [error, setError] = useState();

  const history = useHistory();

  const cancelHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3300/user/${decodedToken.id}/bookings/${infoParams.idBooking}/response/cancel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setError("");
      history.goBack();
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <button onClick={cancelHandler}>CANCELAR</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
export default BookingOptionscancel;
