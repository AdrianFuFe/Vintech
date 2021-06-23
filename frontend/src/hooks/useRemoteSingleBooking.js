import { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "../components/TokenContextProvider";


const useRemoteSingleBooking = () => {
  const [booking, setBooking] = useState([]);
  const [token] = useContext(TokenContext);
  const { id, idBooking } = useParams();

  const loadBooking = async () => {
    const res = await fetch(`http://localhost:3300/user/${id}/bookings/${idBooking}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    setBooking(data);
  };

  useEffect(() => {
    loadBooking();
  }, []);

  return [booking, setBooking];
};

export default useRemoteSingleBooking;