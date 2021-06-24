import { useState, useContext } from 'react';
import { TokenContext } from './TokenContextProvider';
import { useParams } from 'react-router-dom';

const ChatRoomInput = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [token] = useContext(TokenContext);
  const idParams = useParams();

  const sendMsg = async (e) => {
    e.preventDefault();
    const newMessage = { author: idParams.id, text: inputValue, date: new Date().toISOString() };
    // console.log('mensaje', e.target.elements.msginput.value);
    await fetch(`http://localhost:3300/product/${idParams.idProduct}/messages/${idParams.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:token,
      },
      body: JSON.stringify(newMessage.text),
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
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default ChatRoomInput;
