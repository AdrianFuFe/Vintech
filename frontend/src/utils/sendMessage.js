async function sendMessage(token, product, sender, text) {
  const formData = new FormData();
  formData.append("text", text);

  await fetch(`http://localhost:3300/product/${product}/messages/${sender}`, {
    method: "POST",
    headers: {
      authorization: token,
    },
    body: formData,
  });
}

export default sendMessage;
