import { TokenContext } from "./TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import sendMessage from "../utils/sendMessage";
import useRemoteSingleBooking from "../hooks/useRemoteSingleBooking";

const BookingOptionsSeller = (props) => {
  const infoParams = useParams();
  const [meetDate, setMeetDate] = useState();
  const [ubication, setUbication] = useState();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const [error, setError] = useState();

  const history = useHistory();

  const [booking] = useRemoteSingleBooking();

  const acceptHandler = async (e) => {
    e.preventDefault();
    const response = "accept";
    const res = await fetch(
      `http://localhost:3300/user/${decodedToken.id}/bookings/${infoParams.idBooking}/${response}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ meetDate, ubication }),
      }
    );
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setError("");
      sendMessage({
        token,
        to: booking.booking.id_user_B,
        text: `El usuario ha aceptado tu reserva para el día ${meetDate} en ${ubication}`,
      });
      history.goBack();
    } else {
      setError(data.error);
    }
  };

  const rejectHandler = async (e) => {
    const response = "reject";
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3300/user/${decodedToken.id}/bookings/${infoParams.idBooking}/${response}`,
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
      sendMessage({
        token,
        to: booking.booking.id_user_B,
        text: `El usuario ha cancelado tu reserva`,
      });
      history.goBack();
    } else {
      setError(data.error);
    }
  };

  return (
    <>
      <form id="meeting" onSubmit={acceptHandler}>
        <label htmlFor="meeting-date" />
        <input
          type="datetime-local"
          id="meeting-date"
          name="meeting-date"
          value={meetDate}
          onChange={(e) => setMeetDate(e.target.value)}
          placeholder="Día propuesto para la venta"
          required
        />

        <label htmlFor="meeting-ubication" />
        <input
          type="text"
          id="meeting-ubication"
          name="meeting-ubication"
          value={ubication}
          onChange={(e) => setUbication(e.target.value)}
          placeholder="Lugar propuesta para la venta"
          required
        />
        <input type="submit" value="ACEPTAR" />
        <button onClick={rejectHandler}>RECHAZAR</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
export default BookingOptionsSeller;
