import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const GoBackButton = (props) => {
  const history = useHistory();

  return (
    <IconButton onClick={() => history.goBack()}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default GoBackButton;
