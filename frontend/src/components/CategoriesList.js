import { Link } from "react-router-dom";
import "../css/categories-list.css";

const CategoriesList = (props) => {
  const categories = [
    "Ordenadores",
    "Telefonía",
    "Audio",
    "Foto",
    "Vídeo",
    "Televisores",
    "Consolas",
    "Redes",
    "Otros",
  ];

  const categoriesArray = categories.map((cat, index) => (
    <li key={index}>
      <Link to={`/products?search=${cat}`}>
        <span id={cat} />
        <h3>{cat}</h3>
      </Link>
    </li>
  ));

  return (
    <div id="categories">
      <h2>Categorías</h2>
      <ul id="categories-list">{categoriesArray}</ul>
    </div>
  );
};
export default CategoriesList;
