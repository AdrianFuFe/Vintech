import { useEffect, useState, useContext } from "react";
import { TokenContext } from '../components/TokenContextProvider';
import decodeToken from '../utils/decodeToken'

const useRemoteBookingsIn = () => {
  const [bookingsIn, setBookingsIn] = useState([]);
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  const loadBookings = async () => {
    const res = await fetch(`http://localhost:3300/user/${decodedToken.id}/bookings-in`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    setBookingsIn(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return [bookingsIn, setBookingsIn];
};

export default useRemoteBookingsIn;