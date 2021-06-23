import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import ProductInfo from "../components/ProductInfo";
import SellerInfo from "../components/SellerInfo";
import CarouselImagenes from "../components/CarouselImagenes";
import BuyButton from "../components/BuyButton";
import "../css/product-page.css";

const ProductPage = (props) => {
  return (
    <>
      <HeaderBackSearchFavs />
      <CarouselImagenes />
      <ProductInfo />
      <SellerInfo />
      <BuyButton />
      <button>Chatear</button>
    </>
  );
};
export default ProductPage;
