import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";
import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import ProductInfo from "../components/ProductInfo";
import SellerInfo from "../components/SellerInfo";
import CarouselImagenes from "../components/CarouselImagenes";
import ProductBuyerOptions from "../components/ProductBuyerOptions";
import MenuBar from "../components/MenuBar";
import FavButton from "../components/FavButton";
import "../css/product-page.css";

const ProductPage = (props) => {
  const [product] = useRemoteSingleProduct();

  return (
    <>
      <div id="product-page">
        <HeaderBackSearchFavs />
        <div id="carousel">
          <CarouselImagenes />
        </div>
        <FavButton productData={product.data} />
        <ProductInfo />
        <SellerInfo />
        <ProductBuyerOptions productData={product.data} />
        <MenuBar />
      </div>
    </>
  );
};
export default ProductPage;
