import ReactTimeAgo from "react-time-ago";
import { Rating } from "@material-ui/lab";
import UserAvatar from "../components/UserAvatar";
import "../css/ratings-page.css";

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
      <Rating id="rating-stars" name="read-only" value={data.stars} readOnly />
    </div>
  );
};

export default VoteTemplate;
