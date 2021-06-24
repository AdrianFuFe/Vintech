import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from '../components/TokenContextProvider';


const useRemoteMessages = () => {
  const [messages, setMessages] = useState([]);
  const { id, idProduct } = useParams();
  const [token] = useContext(TokenContext);

  const loadMessages = async () => {
    const res = await fetch(`http://localhost:3300/user/${id}/product/${idProduct}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return [messages, setMessages];
};

export default useRemoteMessages;