

const FavsList = (props) => {
  const {favs, products} = props;

  let arrayFavs;
  favs
  ?(arrayFavs = favs.map((fav, index) => {
    const productInfo = products[index];
    return (
      <li key={fav.id} className="favs">
        <p>{productInfo.title}</p>
      </li>
    );
  })) 
  : (arrayFavs = 'Todavía no hay productos favoritos')


  return(<ul>{arrayFavs}</ul>)
}

export default FavsList;