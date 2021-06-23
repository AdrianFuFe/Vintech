import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../components/TokenContextProvider';
import decodeToken from '../utils/decodeToken'

const useRemoteBookingsOut = () => {
  const [bookingsOut, setBookingsOut] = useState([]);
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);
  const idToken = `${decodedToken.id}`;

  const loadBookings = async () => {
    const res = await fetch(`http://localhost:3300/user/${idToken}/bookings-out`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    setBookingsOut(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return [bookingsOut, setBookingsOut];
};

export default useRemoteBookingsOut;