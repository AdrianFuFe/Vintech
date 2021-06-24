import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from '../components/TokenContextProvider';


const useRemoteConversations = () => {
  const [conversations, setConversations] = useState([]);
  const { id } = useParams();
  const [token] = useContext(TokenContext);

  const loadConversations = async () => {
    const res = await fetch(`http://localhost:3300/user/${id}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    setConversations(data);
  };

  useEffect(() => {
    loadConversations();
  }, []);

  return [conversations, setConversations];
};

export default useRemoteConversations;