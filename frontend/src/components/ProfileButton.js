import { useContext } from "react";
import { TokenContext } from "./TokenContextProvider";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import decodeToken from "../utils/decodeToken";

const ProfileButton = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  let id;
  decodedToken ? (id = decodedToken.id) : (id = null);

  let route;
  token ? (route = `/user/${id}`) : (route = "/login");

  const location = useLocation();
  let fill;
  if (location.pathname.includes(`/user/${id}`)) {
    fill = "#d07017";
  } else {
    fill = "#828282";
  }
  if (location.pathname.includes('messages')) {
  fill = "#828282";  
  }

  
  return (
    <Link to={route}>
      <svg
        width="117"
        height="149"
        viewBox="0 0 117 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M58.5311 73.7985C78.91 73.7985 95.4303 57.2781 95.4303 36.8992C95.4303 16.5204 78.91 0 58.5311 0C38.1522 0 21.6318 16.5204 21.6318 36.8992C21.6318 57.2781 38.1522 73.7985 58.5311 73.7985Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.000100186 125.116C-0.00877555 122.523 0.572205 119.961 1.6991 117.625C5.22839 110.559 15.1984 106.813 23.4695 105.114C29.4335 103.84 35.48 102.989 41.5639 102.566C52.8302 101.576 64.1617 101.576 75.4281 102.566C81.5059 102.998 87.5528 103.848 93.5224 105.114C101.786 106.813 111.756 110.204 115.301 117.625C116.419 119.978 117 122.55 117 125.155C117 127.76 116.419 130.332 115.301 132.685C111.756 140.098 101.786 143.496 93.5224 145.118C87.5605 146.447 81.5136 147.327 75.4281 147.744C66.2535 148.516 57.048 148.655 47.8579 148.161C45.7341 148.161 43.6876 148.161 41.5639 147.736C35.4978 147.327 29.4719 146.455 23.539 145.126C15.1984 143.504 5.30562 140.106 1.6991 132.685C0.576114 130.317 -0.00432956 127.729 0.000100186 125.109V125.116Z"
          fill={fill}
        />
      </svg>
    </Link>
  );
};

export default ProfileButton;
