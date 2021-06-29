import { Rating } from "@material-ui/lab";
import { useContext } from "react";
import { useState } from "react";
import decodeToken from "../utils/decodeToken";
import { TokenContext } from "./TokenContextProvider";

const VoteForm = (props) => {
  const { product } = props;

  const [error, setError] = useState();

  const [value, setValue] = useState();
  const [comment, setComment] = useState();

  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  let id;
  if (Number(decodedToken.id) === Number(product.data[0].user_id)) {
    id = decodedToken.id;
  } else {
    id = product.data[0].user_id;
  }

  async function sendFeedback(e) {
    e.preventDefault();
    const res = await fetch(`http://localhost:3300/user/${id}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ stars: value, comment }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setError("");
    } else {
      setError(data.error);
    }
  }

  return (
    <>
      <div id="voting">
        <h3>Zona de votación</h3>
        <form onSubmit={sendFeedback}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <label htmlFor="comment">
            Comentario
            <input
              type="text"
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </label>
          <input type="submit" />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default VoteForm;
