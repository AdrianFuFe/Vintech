import { useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "./TokenContextProvider";

const AddProductImgs = (props) => {
  const { id } = useParams();
  const fileInput = useRef();
  const [token] = useContext(TokenContext);

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const file = fileInput.current.files[0];

    formData.append("img", file);

    const response = await fetch(`http://localhost:3300/product/${id}/images`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: formData,
    });

    const data = await response.json();

    console.log(data);
    window.location.reload();
  };

  return (
    <>
      <form id="upload-img" onSubmit={uploadImage}>
        <input type="file" ref={fileInput} accept="image/*" />
        <input type="submit" value="Subir Imagen" />
      </form>
    </>
  );
};

export default AddProductImgs;
