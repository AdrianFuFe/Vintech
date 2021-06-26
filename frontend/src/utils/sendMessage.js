async function sendMessage({ token, to, text }) {
  const formData = new FormData();
  formData.append("text", text);

  const res = await fetch(`http://localhost:3300/user/${to}/messages/`, {
    method: "POST",
    headers: {
      authorization: token,
    },
    body: formData,
  });

  const data = await res.json();
  console.log(data);
}

export default sendMessage;
