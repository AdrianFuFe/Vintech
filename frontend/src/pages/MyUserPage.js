import HeaderBackTitle from '../components/HeaderBackTitle';
import UserDataMyProfile from '../components/UserDataMyProfile';
import UserProfileMenu from '../components/UserProfileMenu';
import MenuBar from '../components/MenuBar';
import useRemoteUser from '../hooks/useRemoteUser';


const MyUserPage = (props) => {
  const [user] = useRemoteUser();
  console.log(user);
  const data =  user.data; 
  let userData;

  data ? (userData = data[0]) : (userData='cargando datos de usuario')

  return(
    <>
      <HeaderBackTitle />
      <UserDataMyProfile user={userData}/>
      <UserProfileMenu user={userData}/>
      <MenuBar />
    </>
  )
}
export default MyUserPage;