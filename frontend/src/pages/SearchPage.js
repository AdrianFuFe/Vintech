import queryString from "query-string";
import { useLocation } from "react-router";
import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import SearchGallery from "../components/SearchGallery";
import MenuBar from "../components/MenuBar";
import SearchFilters from "../components/SearchFilters";

const SearchPage = () => {
  const { search } = useLocation();
  const value = queryString.parse(search).search;

  return (
    <>
      <HeaderBackSearchFavs />
      <SearchFilters />
      <p>Tus resultados para "{value}"</p>
      <br />
      <SearchGallery />
      <MenuBar />
    </>
  );
};
export default SearchPage;
