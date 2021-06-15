import GoBackButton from "./GoBackButton";
import SearchBar from "./SearchBar";
import GoFavsButton from "./GoFavsButton";
import "../css/header-search.css";

const HeaderBackSearchFavs = (props) => {
  return (
    <header id="header-search">
      <GoBackButton />
      <SearchBar />
      <GoFavsButton />
    </header>
  );
};

export default HeaderBackSearchFavs;
