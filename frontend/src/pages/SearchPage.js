import queryString from "query-string";
import { useLocation } from "react-router";
import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import SearchGallery from "../components/SearchGallery";
import MenuBar from "../components/MenuBar";

const SearchPage = () => {
  const { search } = useLocation();
  const value = queryString.parse(search).search;

  return (
    <>
      <HeaderBackSearchFavs />
      <p>Tus resultados para "{value}"</p>
      <br />
      <SearchGallery search={value} />
      <MenuBar />
    </>
  );
};
export default SearchPage;
