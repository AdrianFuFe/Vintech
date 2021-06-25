
import { Link } from "react-router-dom";

import useRemoteSingleBooking from '../hooks/useRemoteSingleBooking';
import HeaderBackTitle from '../components/HeaderBackTitle';
import PhotoIcon from '@material-ui/icons/Photo';
import BookingOptions from '../components/BookingOptions';


const BookingPage = (props) => {
  const [booking] = useRemoteSingleBooking();


  let bk;
  booking.booking && booking.moreInfo && booking.imgs
  ? (  
    bk = {
    date : booking.booking.date,
    meeting_date : booking.booking.meeting_date || 'No hay fecha de entrega todavía',
    ubication : booking.booking.ubication || 'No hay lugar de entrega todavía',
    seller_id : booking.moreInfo.id_seller,
    seller: booking.moreInfo.username_seller,
    buyer_id : booking.moreInfo.id_buyer,
    buyer : booking.moreInfo.username_buyer,
    product_id : booking.booking.id_product,
    product : booking.moreInfo.title_product,
    price : `${booking.moreInfo.price_product} €`,
    img: booking.imgs.img_product,
    status : booking.booking.status,
    })
  : (bk = 'cargando datos de reservas')  

  return(
    <>
      <HeaderBackTitle />
      <section className='bkProduct'>
        <h3>PRODUCTO</h3>
        <Link to={`/product/${bk.product_id}`}>
          <div className="div-img">
            {bk.img ? (
              <img
              src={`http://localhost:3300/uploads/imgs/${bk.img}`}
              alt="foto de producto"
              />
              ) : (
                <PhotoIcon />
              )}
          </div>
          <p>{bk.product} {bk.price}</p>
        </Link>
      </section>
          <h3>VENDEDOR</h3>
          <Link to={`/user/${bk.seller_id}`}>
            <p>{bk.seller}</p>
          </Link>
        <section>
        </section>
          <h3>COMPRADOR</h3>
          <Link to={`/user/${bk.buyer_id}`}>
            <p>{bk.buyer}</p>
          </Link>
        <section>
          <BookingOptions info={booking.booking}/>
        </section>
    </>
  )
}
export default BookingPage