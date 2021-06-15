import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const SearchBar = (props) => {
  const [value, setValue] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/product?search=${value}`);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} id="search-form">
      <InputBase
        id="search-input"
        placeholder="Buscar"
        value={value}
        onChange={handleChange}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="submit" aria-label="search" id="search-icon">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
