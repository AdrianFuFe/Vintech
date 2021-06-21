import EditUserForm from "../components/EditUserForm";
import HeaderBackTitle from "../components/HeaderBackTitle";
import MenuBar from "../components/MenuBar";
import useRemoteUser from "../hooks/useRemoteUser";


const EditUserPage = (props) => {
  const [user ] = useRemoteUser();

  const data =  user.data; 
  let userData;

  data ? (userData = data[0]) : (userData='cargando datos de usuario')
    return (
      <>
        <HeaderBackTitle />
        <EditUserForm user={userData}/>
        <MenuBar />
      </>
    );
}

export default EditUserPage;