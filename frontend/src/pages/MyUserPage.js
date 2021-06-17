import HeaderBackTitle from '../components/HeaderBackTitle';
import UserDataMyProfile from '../components/UserDataMyProfile';
import UserProfileMenu from '../components/UserProfileMenu';
import MenuBar from '../components/MenuBar';


const MyUserPage = (props) => {

  return(
    <>
      <HeaderBackTitle />
      <UserDataMyProfile />
      <UserProfileMenu />
      <MenuBar />
    </>
  )
}
export default MyUserPage;