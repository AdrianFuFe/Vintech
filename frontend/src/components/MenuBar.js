import HomeButton from "./HomeButton";
import CategoriesButton from "./CategoriesButton";
import UploadButton from "./UploadButton";
import MessagesButton from "./MessagesButton";
import ProfileButton from "./ProfileButton";
import "../css/menu-bar.css";

const MenuBar = (props) => {
  return (
    <>
      <footer id="menu-bar">
        <nav>
          <ul>
            <li>
              <HomeButton />
            </li>
            <li>
              <CategoriesButton />
            </li>
            <li>
              <UploadButton />
            </li>
            <li>
              <MessagesButton />
            </li>
            <li>
              <ProfileButton />
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default MenuBar;
