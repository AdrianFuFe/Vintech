import UserProductsTemplate from './UserProductsTemplate';

const UserProductsList = (props) => {
  const {products} = props;

  const arrayProducts= products.map((product) => <li key={product.id}><UserProductsTemplate data={product} /></li>);

  return(<ul>{arrayProducts}</ul>  )
}

export default UserProductsList;