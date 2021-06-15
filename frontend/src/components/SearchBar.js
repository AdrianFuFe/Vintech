import { useState } from "react";
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

  const [value, setValue] = useState ('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  }

  return(
    
    <form className='searchBar' onSubmit={handleSubmit}>
      {props.children}
      <input 
        type='text' 
        id='searchInput' 
        name='searchInput' 
        value={value} 
        onChange={handleChange} 
        />

      <Link to={`/product?search=${value}`}>
        <input type='submit' value='send' />
      </Link>
    </form>
  )
}

export default SearchBar;