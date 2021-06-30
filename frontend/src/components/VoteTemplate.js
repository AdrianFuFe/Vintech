import ReactTimeAgo from "react-time-ago";
import { Rating } from "@material-ui/lab";
import "../css/vote-template.css";
import UserAvatar from "./UserAvatar";

const VoteTemplate = (props) => {
  const { data, buyer } = props;

  let user = {};
  buyer ? (user.img = buyer.img_buyer) : (user = undefined);

  return (
    <div id="vote-template">
      <UserAvatar user={user} />
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
