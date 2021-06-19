import HeaderBackTitle from '../components/HeaderBackTitle';
import UserData from '../components/UserDataMyProfile';
import UserProfileMenu from '../components/UserProfileMenu';
import MenuBar from '../components/MenuBar';


const UserPage = (props) => {

  return(
    <>
      <HeaderBackTitle />
      <UserData />
      <UserProfileMenu />
      <MenuBar />
    </>
  )
}
export default UserPage;