import HeaderBackTitle from "../components/HeaderBackTitle";
import UserProductsList from "../components/UserProductsList";
import MenuBar from "../components/MenuBar";
import useRemoteUserProducts from "../hooks/useRemoteUserProducts";

const MyProductsPage = (props) => {
  const [products] = useRemoteUserProducts();

  return (
    <>
      <HeaderBackTitle />
      <UserProductsList products={products.data} />
      <MenuBar />
    </>
  );
};
export default MyProductsPage;
