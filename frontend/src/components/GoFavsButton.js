import { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "./TokenContextProvider";
import IconButton from "@material-ui/core/IconButton";

import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const GoFavsButton = (props) => {
  const [token] = useContext(TokenContext);

  return (
    <>
      {token && (
        <Link to="/user/:id/favs">
          <IconButton>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </Link>
      )}
    </>
  );
};

export default GoFavsButton;
