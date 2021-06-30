import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "../components/TokenContextProvider";

const useRemoteConversations = (props) => {
  const [conversations, setConversations] = useState([]);
  let { id } = useParams();
  const [token] = useContext(TokenContext);

  if (!id) {
    id = props;
  }

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
    console.log(data);
  };

  useEffect(() => {
    loadConversations();
  }, []);

  return [conversations, setConversations];
};

export default useRemoteConversations;
