import HeaderBackSearchFavs from "../components/HeaderBackSearchFavs";
import ProductInfo from "../components/ProductInfo";
import SellerInfo from "../components/SellerInfo";

const ProductPage = (props) => {
  return (
    <>
      <HeaderBackSearchFavs />
      <ProductInfo />
      <SellerInfo />
      <button>Comprar</button>
      <button>Chatear</button>
    </>
  );
};
export default ProductPage;
