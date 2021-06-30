import { useLocation, useHistory } from "react-router";
import queryString from "query-string";

const SearchFilters = (props) => {
  const { search } = useLocation();
  const values = queryString.parse(search);
  const history = useHistory();

  function applyFilters(e) {
    e.preventDefault();
    const min = e.target[0].value || 0;
    const max = e.target[1].value || Infinity;

    history.push(`/products?search=${values.search}&min=${min}&max=${max}`);
  }
  return (
    <div id="filters">
      <form onSubmit={applyFilters}>
        <label htmlFor="min">
          mín
          <input type="number" name="min" id="min" />€
        </label>
        <label htmlFor="max">
          máx
          <input type="number" name="max" id="max" />€
        </label>
        <input type="submit" value="Aplicar" />
      </form>
    </div>
  );
};

export default SearchFilters;
