import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import SearchBar from "../components/SearchBar";
import GoFavsButton from "../components/GoFavsButton";
import LogoVintech from "../components/LogoVintech";
import ProductsGallery from "../components/ProductsGallery";
import MenuBar from "../components/MenuBar";

const HomePage = (props) => {
  return (
    <>
      <HeaderBackSearchFavs />
      <LogoVintech />
      <ProductsGallery />
      <MenuBar />
    </>
  );
};

export default HomePage;
