import HeaderBackTitle from "../components/HeaderBackTitle";
import UserProductsList from "../components/UserProductsList";
import MenuBar from "../components/MenuBar";
import useRemoteUserProducts from "../hooks/useRemoteUserProducts";

const UserProductsPage = (props) => {
  const [products] = useRemoteUserProducts();

  return (
    <>
      <HeaderBackTitle />
      <UserProductsList products={products.data} />
      <MenuBar />
    </>
  );
};
export default UserProductsPage;
