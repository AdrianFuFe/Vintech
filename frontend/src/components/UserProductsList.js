import UserProductsTemplate from './UserProductsTemplate';



const UserProductsList = () => {

  const products = [
    {id:5,
      id_seller:4,
      title:'portatil',
      price:150,
      description:'ordenador portatil del año 2000 marca asus',
      ubication:'Madrid',
      modification_date:'2021-05-21 16:58:33',
      category:'ordenadores'
    },
    {id:6,
      id_seller:4,
      title:'camara reflex',
      price:70,
      description:'camara de fotos raflex marca panasonic',
      ubication:'Madrid',
      modification_date:'2021-05-21 16:59:26',
      category:'foto'
    },
]


  const arrayProducts= products.map((product) => <li key={product.id}><UserProductsTemplate data={product} /></li>);

  return(<ul>{arrayProducts}</ul>  )
}

export default UserProductsList;