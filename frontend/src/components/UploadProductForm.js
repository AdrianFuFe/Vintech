import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { TokenContext } from './TokenContextProvider';
import "../css/new-product.css";



const UploadProductForm = (props) => {
  const [ title, setTitle ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ ubication, setUbication] = useState('');

  const [token] = useContext(TokenContext);

  const [error, setError] = useState('');

  const history = useHistory();

  const uploadProd = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3300/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token}`,
      },
      body: JSON.stringify({ title, price, description, category, ubication }),
    });
    
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setError('');
      history.push('/');
    } else {
      setError(data.error);
    }
  };



  return (
  <div id='upload-product'>

      <form id="NewProductForm" onSubmit={uploadProd}>

        <label htmlFor="title"><h4>Nombre del producto</h4></label>
        <input 
          type='text' 
          id='title' 
          name='title' 
          value={title} 
          onChange={(e)=> setTitle(e.target.value)} 
          placeholder='Nombre' 
          required
        />


        <label htmlFor="price"><h4>Precio</h4></label>
        
        <input 
          type="number" 
          id="price" 
          name="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder='Precio'
          required
        />

        <label htmlFor="description"><h4>Descripción</h4></label>
        <input
          type="textarea"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Descripción del producto'
        />

        <section id='category'>
          <label id='category-header' htmlFor='category'>
            <h4 id='category-header'>Categorías</h4>
          </label>
          <label className='catRadios' htmlFor='ordenadores'>
            Ordenadores
            <input type='radio' id='ordenadores' name='category' value='ordenadores' onChange={(e) => setCategory(e.target.value)} required/>
          </label>
          <label className='catRadios' htmlFor='telefonia'>
            Telefonía
            <input type='radio' id='telefonia' name='category' value='telefonia' onChange={(e) => setCategory(e.target.value)}/>
          </label>
          <label className='catRadios' htmlFor='audio'>
            Audio
            <input type='radio' id='audio' name='category' value='audio' onChange={(e) => setCategory(e.target.value)}/>
          </label>
          <label className='catRadios' htmlFor='foto'>
            Foto
            <input type='radio' id='foto' name='category' value='foto' onChange={(e) => setCategory(e.target.value)}/>
          </label>
          <label className='catRadios' htmlFor='video'>
            Video
            <input type='radio' id='video' name='category' value='video' onChange={(e) => setCategory(e.target.value)}/>
          </label>
          <label className='catRadios' htmlFor='televisores'>
            Televisores
            <input type='radio' id='televisores' name='category' value='televisores' onChange={(e) => setCategory(e.target.value)}/>
          </label>
          <label className='catRadios' htmlFor='consolas'>
            Consolas
            <input type='radio' id='consolas' name='category' value='consolas' onChange={(e) => setCategory(e.target.value)}/>
          </label>
          <label className='catRadios' htmlFor='redes'>
            Redes
            <input type='radio' id='redes' name='category' value='redes' onChange={(e) => setCategory(e.target.value)}/>
          </label>
          <label className='catRadios' htmlFor='otros'>
            Otros
            <input type='radio' id='otros' name='category' value='otros' onChange={(e) => setCategory(e.target.value)}/>
          </label>
        </section>


        <label htmlFor="ubication"><h4>Localización</h4></label>
        <input 
          type='text' 
          id='ubication' 
          name='ubication' 
          value={ubication} 
          onChange={(e)=> setUbication(e.target.value)} 
          placeholder='Localización' 
          required
        />


        <input type="submit" value="SUBIR"/>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
)
}
export default UploadProductForm;