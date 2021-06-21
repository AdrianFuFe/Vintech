import HeaderBackTitle from "../components/HeaderBackTitle";
import ChangePwdForm from "../components/ChangePwdForm";
import MenuBar from "../components/MenuBar";
import useRemoteMyUser from "../hooks/useRemoteMyUser";


const ChangePwdPage = (props) => {
  const [user] = useRemoteMyUser();
  const data =  user.data; 
  let userData;
  data ? (userData = data[0]) : (userData='cargando datos de usuario')

return (
<>
  <HeaderBackTitle />
  <ChangePwdForm user={userData}/>
  <MenuBar />
</>)
}
export default ChangePwdPage;