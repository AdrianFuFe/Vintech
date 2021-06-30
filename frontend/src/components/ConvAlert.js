import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";
import decodeToken from "../utils/decodeToken";
import useRemoteConversations from "../hooks/useRemoteConversations";

const ConvAlert = (props) => {
  const { token } = props;
  const decodedToken = decodeToken(token);

  const [conversations] = useRemoteConversations(decodedToken.id);
  const [convAlert, setConvAlert] = useState(-1);

  let route;

  useEffect(() => {
    conversations.data
      ? setConvAlert(
          conversations.data.findIndex((conversation) => {
            return (
              conversation.id_user_A !== decodedToken.id &&
              conversation.status === "sent"
            );
          })
        )
      : setConvAlert(-1);
  }, [convAlert, decodedToken, conversations.data]);

  decodedToken.id && conversations.data && convAlert >= 0
    ? (route = `/user/${decodedToken.id}/messages/${conversations.data[convAlert].id_user_A}`)
    : (route = "/");

  return (
    <>
      {convAlert !== -1 && (
        <Link to={route}>
          <FiberManualRecordIcon style={{ fill: "red" }} />
        </Link>
      )}
    </>
  );
};

export default ConvAlert;
