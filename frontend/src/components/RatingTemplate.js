import { Avatar } from "@material-ui/core";
import "../css/rating-template.css";


const RatingTemplate = (props) => {

  const {data} = props;

  return (
    <div id='rating-template'>
      <Avatar/>
      <p id='date'>{data.date}</p>
      <p id='username'>{`${data.fname} ${data.lname}`}</p>
      <p id='points'>{data.points}</p>
      <p id='coment'>{data.coment}</p>
    </div>
  )
}

export default RatingTemplate;