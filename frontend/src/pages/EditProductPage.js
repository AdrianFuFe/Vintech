import HeaderBackTitle from "../components/HeaderBackTitle";
import EditProductForm from "../components/EditProductForm";
import MenuBar from "../components/MenuBar";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";
import AddProductImgs from "../components/AddProductImgs";
import DeleteProductImgs from "../components/DeleteProductImgs";

const EditProductPage = () => {
  const [product] = useRemoteSingleProduct();
  return (
    <>
      <HeaderBackTitle />
      {product.data ? (
        <>
          <DeleteProductImgs imgs={product.imgs} />
          <AddProductImgs />
          <EditProductForm product={product.data[0]} />
        </>
      ) : (
        <h3>Cargando datos de producto</h3>
      )}

      <MenuBar />
    </>
  );
};

export default EditProductPage;
