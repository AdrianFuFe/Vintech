import { useState, useContext } from "react";
import { TokenContext } from "./TokenContextProvider";
import { useParams } from "react-router-dom";
import sendMessage from "../utils/sendMessage";

const ChatRoomInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [token] = useContext(TokenContext);
  const { idB } = useParams();

  const sendMsg = async (e) => {
    e.preventDefault();
    sendMessage({
      token,
      to: idB,
      text: inputValue,
    });
    setInputValue("");
    window.location.reload();
  };

  return (
    <form className="chatroom-input" onSubmit={sendMsg}>
      {props.children}
      <input
        type="text"
        id="msginput"
        name="msginput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default ChatRoomInput;
