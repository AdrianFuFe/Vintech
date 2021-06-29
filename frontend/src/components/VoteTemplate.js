import { Avatar } from "@material-ui/core";
import ReactTimeAgo from "react-time-ago";
import { Rating } from "@material-ui/lab";
import "../css/vote-template.css";

const VoteTemplate = (props) => {
  const { data, buyer } = props;

  return (
    <div id="vote-template">
      <Avatar />
      <p className="time-ago">
        <ReactTimeAgo date={data.creation_date} locale="es-ES" />
      </p>
      <p id="buyer">{buyer.username_buyer}</p>
      <p id="comment">{data.comment}</p>
      <Rating name="read-only" value={data.stars} readOnly />
    </div>
  );
};

export default VoteTemplate;
