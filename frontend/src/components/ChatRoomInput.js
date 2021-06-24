import { useState, useContext } from 'react';
import { TokenContext } from './TokenContextProvider';
import decodeToken from '../utils/decodeToken';

const ChatRoomInput = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  let idProduct = 'lo sacamos por props'

  const sendMsg = async (e) => {
    e.preventDefault();
    const newMessage = { author: decodedToken.id, body: inputValue, date: new Date().toISOString() };
    // console.log('mensaje', e.target.elements.msginput.value);
    await fetch(`http://localhost:3050/product/${idProduct}/messages/${decodedToken.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:token,
      },
      body: JSON.stringify(newMessage),
    });

    setInputValue('');
  };

  return (
    <form className="chatRoomInput" onSubmit={sendMsg}>
      {props.children}
      <input
        type="text"
        id="msginput"
        name="msginput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <input type="submit" value="" />
    </form>
  );
};

export default ChatRoomInput;
