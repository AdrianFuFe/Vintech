import GoBackButton from "./GoBackButton";
import { useLocation } from 'react-router';
import "../css/header-title.css";

const HeaderBackTitle = (props) => {
  const location = useLocation();
  let title = 'PERFIL';

  if (location.pathname.includes('/user')) {
    title='PERFIL'
  }

  return (
    <header id='header-title'>
      <GoBackButton />
      <h2>{title}</h2>
    </header>  
  )
}

export default HeaderBackTitle;