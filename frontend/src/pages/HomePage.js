import SearchBar from "../components/SearchBar";
import GoFavsButton from "../components/GoFavsButton";

const HomePage = (props) => {
  
  return(
    <>
      <SearchBar/>
      <GoFavsButton/>
      <img className='logo' src='/images/icons/png/logo.png' alt='logo vintech'></img>
    </>
  )
}

export default HomePage;