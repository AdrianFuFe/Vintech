async function sendMessage(token, to, text) {
  const formData = new FormData();
  formData.append("text", text);

  await fetch(`http://localhost:3300/user/${to}/messages/`, {
    method: "POST",
    headers: {
      authorization: token,
    },
    body: formData,
  });
}

export default sendMessage;
