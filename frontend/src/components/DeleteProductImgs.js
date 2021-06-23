import { useContext } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "./TokenContextProvider";

const DeleteProductImgs = (props) => {
  const { imgs } = props;
  const { id } = useParams();

  const [token] = useContext(TokenContext);

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
  }

  const arrayImages = imgs.map((img, index) => {
    return (
      <li key={index}>
        <img
          id={img.id}
          onClick={deleteImg}
          src={`http://localhost:3300/uploads/imgs/${img.img}`}
          alt="Foto de producto"
        />
      </li>
    );
  });
  return (
    <div id="delete-images">
      <h3>Clicka una imagen de este producto para borrarla</h3>
      <ul>{arrayImages}</ul>
    </div>
  );
};

export default DeleteProductImgs;
