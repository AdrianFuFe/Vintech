async function sendMessage (token, product, sender,receiver,text){
  const newMessage = { author: sender, text: text, date: new Date().toISOString() };

  await fetch(`http://localhost:3300/product/${product}/messages/${sender}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization:token,
    },
    body: JSON.stringify(newMessage.text),
  });
}

export default sendMessage;