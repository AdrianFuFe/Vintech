import HeaderBackTitle from "../components/HeaderBackTitle";
import ChangePwdForm from "../components/ChangePwdForm";
import MenuBar from "../components/MenuBar";
import useRemoteUser from "../hooks/useRemoteUser";


const ChangePwdPage = (props) => {
  const [user] = useRemoteUser();
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