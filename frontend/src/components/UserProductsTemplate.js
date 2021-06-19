import { Avatar } from "@material-ui/core";
import "../css/rating-template.css";


const UserProductsTemplate = (props) => {

  const {data} = props;

  return (
    <div id='user-products-template'>
      <Avatar/>
      <p id='title'>{data.title}</p>
      <p id='price'>{data.price}€</p>
      <p id='category'>{data.category}</p>
      <p id='description'>{data.description}</p>
      <p id='ubication'>{data.ubication}</p>
      <p id='modification_date'>{data.modification_date}</p>
    </div>
  )
}

export default UserProductsTemplate;
