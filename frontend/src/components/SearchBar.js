import { useState } from "react";

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
      <input type='submit' value='send' />
    </form>
  )
}

export default SearchBar;