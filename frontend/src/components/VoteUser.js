import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";
import VoteForm from "./VoteForm";

const VoteUser = (props) => {
  const { id } = props;
  const [product] = useRemoteSingleProduct(id);

  let display;
  product.data && product.data[0].status === "selled"
    ? (display = true)
    : (display = false);

  return <>{display && <VoteForm product={product} id={id} />}</>;
};

export default VoteUser;
