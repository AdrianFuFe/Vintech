import { useContext } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "./TokenContextProvider";

const DeleteProductImgs = (props) => {
  const { imgs } = props;
  const { id } = useParams();

  const [token] = useContext(TokenContext);

  function confirmDelete(e) {
    if (window.confirm("¿Realmente deseas eliminar esta foto?")) deleteImg(e);
  }

  async function deleteImg(e) {
    const res = await fetch(
      `http://localhost:3300/product/${id}/images/${e.target.id}`,
      {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    window.location.reload();
  }

  const arrayImages = imgs.map((img, index) => {
    return (
      <li key={index}>
        <img
          id={img.id}
          onClick={confirmDelete}
          src={`http://localhost:3300/uploads/imgs/${img.img}`}
          alt="Foto de producto"
        />
      </li>
    );
  });
  return (
    <div className="form-wrapper" id="delete-images">
      <ul>{arrayImages}</ul>
      <p id="delete-img"> *Haz click una imagen para borrarla</p>
    </div>
  );
};

export default DeleteProductImgs;
