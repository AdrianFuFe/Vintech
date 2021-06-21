import HeaderBackTitle from '../components/HeaderBackTitle';
import UserDataMyProfile from '../components/UserDataMyProfile';
import UserProfileMenu from '../components/UserProfileMenu';
import MenuBar from '../components/MenuBar';
import useRemoteMyUser from '../hooks/useRemoteMyUser';


const MyUserPage = (props) => {
  const [user] = useRemoteMyUser();

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