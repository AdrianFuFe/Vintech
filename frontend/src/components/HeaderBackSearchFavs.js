import GoBackButton from "./GoBackButton";
import SearchBar from "./SearchBar";
import GoFavsButton from "./GoFavsButton";


const HeaderBackSearchFavs = (props) =>{
  return(
    <>
      <GoBackButton/>
      <SearchBar/>
      <GoFavsButton/>
    </>
  )
}

export default HeaderBackSearchFavs;