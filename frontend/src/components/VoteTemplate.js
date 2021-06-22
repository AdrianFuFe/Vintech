import { Avatar } from "@material-ui/core";
import "../css/vote-template.css";


const VoteTemplate = (props) => {
  const {data, buyer} = props;

  return (
    <div id='vote-template'>
      <Avatar/>
      <p id='date'>{data.creation_date}</p>
      <p id='buyer'>{ `${buyer.fname_buyer} ${buyer.lname_buyer}` || buyer.username_buyer }</p>
      <p id='comment'>{data.comment}</p>
      <p id='stars'>{data.stars}</p>
    </div>
  )
}

export default VoteTemplate;