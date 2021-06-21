import HeaderBackTitle from '../components/HeaderBackTitle';
import UserProductsList from '../components/UserProductsList';
import MenuBar from '../components/MenuBar';
import useRemoteUser from '../hooks/useRemoteUser';

const UserProductsPage = (props) => {
  const [user] = useRemoteUser();

  return (
    <>
      <HeaderBackTitle />
      <UserProductsList products={user.products}/>
      <MenuBar />
    </>
  )
}
export default UserProductsPage;