import { Link } from "react-router-dom";

const HomeButton = (props) => {
  return (
    <Link to="/">
      <button id="home-button"></button>
    </Link>
  );
};

export default HomeButton;
