import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import ProductInfo from "../components/ProductInfo";
import SellerInfo from "../components/SellerInfo";
import CarouselImagenes from "../components/CarouselImagenes";
import "../css/product-page.css";

const ProductPage = (props) => {
  return (
    <>
      <HeaderBackSearchFavs />
      <CarouselImagenes />
      <ProductInfo />
      <SellerInfo />
      <button>Comprar</button>
      <button>Chatear</button>
    </>
  );
};
export default ProductPage;
