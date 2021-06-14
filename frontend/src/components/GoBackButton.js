import {useHistory} from "react-router-dom";


const GoBackButton = (props) => {

  const history = useHistory();

  return(
    <button onClick={() => history.goBack()}>Go Back</button>
  )
}

export default GoBackButton;