import HeaderBackTitle from "../components/HeaderBackTitle";
import EditProductForm from "../components/EditProductForm";
import MenuBar from "../components/MenuBar";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";

const EditProductPage = () => {
  const [product] = useRemoteSingleProduct();

  return (
    <>
      <HeaderBackTitle />
      {product.data ? (
        <EditProductForm product={product.data[0]} />
      ) : (
        <h3>Cargando datos de usuario</h3>
      )}
      <MenuBar />
    </>
  );
};

export default EditProductPage;
