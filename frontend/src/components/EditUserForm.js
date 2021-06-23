import { useState, useContext, useRef } from "react";
import { TokenContext } from "./TokenContextProvider";
import { useHistory } from "react-router";

const EditUserForm = (props) => {
  const { user } = props;
  const [token] = useContext(TokenContext);

  const fileInput = useRef();

  const history = useHistory();
  const id = user.id;

  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [last_ubication, setLast_ubication] = useState("");

  const [error, setError] = useState("");

  const editUser = async (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];

    const formData = new FormData();
    formData.append("username", username || user.username);
    formData.append("fname", fname || user.fname);
    formData.append("lname", lname || user.lname);
    formData.append("email", email || user.email);
    formData.append("bio", bio || user.bio);
    formData.append("last_ubication", last_ubication || user.last_ubication);
    formData.append("img", file);

    const res = await fetch(`http://localhost:3300/user/${id}`, {
      method: "PUT",
      headers: {
        authorization: token,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setError("");
      history.push(`/user/${user.id}`);
    } else {
      setError(data.error);
    }
  };

  return (
    <div id="editUserWrapper">
      <h2>Mis datos de perfil</h2>
      <form id="editUserForm" onSubmit={editUser}>
        <label htmlFor="editUsername" />
        <input
          type="text"
          id="editUsername"
          name="editUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={user.username}
        />

        <label htmlFor="editFname" />
        <input
          type="text"
          id="editFname"
          name="editFname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          placeholder={user.fname || "Nombre"}
        />

        <label htmlFor="editLname" />
        <input
          type="text"
          id="editLname"
          name="editLname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          placeholder={user.lname || "Apellidos"}
        />

        <label htmlFor="editEmail" />
        <input
          type="email"
          id="editEmail"
          name="editEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={user.email || "email"}
        />

        <label htmlFor="editFname" />
        <input
          type="textarea"
          id="editBio"
          name="editBio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder={user.bio || "Biografía"}
        />

        <label htmlFor="editUbication" />
        <input
          type="text"
          id="editUbication"
          name="editUbication"
          value={last_ubication}
          onChange={(e) => setLast_ubication(e.target.value)}
          placeholder={user.last_ubication || "Ubicación"}
        />

        <input type="file" ref={fileInput} accept="image/*" />

        <input type="submit" value="Actualizar mis datos" />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default EditUserForm;
