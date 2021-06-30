import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useRemoteVotes = () => {
  const [votes, setVotes] = useState([]);
  const { id } = useParams();

  const loadVotes = async () => {
    const res = await fetch(`http://localhost:3300/user/${id}/votes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setVotes(data);
    console.log(data);
  };

  useEffect(() => {
    loadVotes();
  }, []);

  return [votes, setVotes];
};

export default useRemoteVotes;
