import HeaderBackTitle from '../components/HeaderBackTitle';
import FavsList from '../components/FavsList';
import MenuBar from '../components/MenuBar';
import useRemoteFavs from '../hooks/useRemoteFavs';

const FavsPage = (props) => {
  const [favs] = useRemoteFavs();

  return (
    <>
      <HeaderBackTitle />
      <FavsList favs={favs.data} products={favs.products}/>
      <MenuBar />
    </>
  )
}
export default FavsPage;