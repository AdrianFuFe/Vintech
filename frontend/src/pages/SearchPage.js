import queryString from "query-string";
import { useLocation } from "react-router";
import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import SearchGallery from "../components/SearchGallery";

const SearchPage = () => {
  const { search } = useLocation();
  const value = queryString.parse(search).search;

  return (
    <>
      <HeaderBackSearchFavs />
      <p>Tus resultados para "{value}"</p>
      <br />
      <SearchGallery search={value} />
    </>
  );
};
export default SearchPage;
