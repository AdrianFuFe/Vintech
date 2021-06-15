import MenuBar from "../components/MenuBar";
import CategoriesList from "../components/CategoriesList";
import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";

const CategoriesPage = (props) => {
  return (
    <>
      <HeaderBackSearchFavs />
      <CategoriesList />
      <MenuBar />
    </>
  );
};

export default CategoriesPage;
