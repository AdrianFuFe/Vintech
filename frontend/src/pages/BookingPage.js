import { Link } from "react-router-dom";
import useRemoteSingleBooking from "../hooks/useRemoteSingleBooking";
import HeaderBackTitle from "../components/HeaderBackTitle";
import PhotoIcon from "@material-ui/icons/Photo";
import BookingOptions from "../components/BookingOptions";
import MenuBar from "../components/MenuBar";
import "../css/booking-page.css";

const BookingPage = (props) => {
  const [booking] = useRemoteSingleBooking();

  let bk;
  booking.booking && booking.moreInfo && booking.imgs
    ? (bk = {
        date: booking.booking.date,
        meeting_date:
          booking.booking.meeting_date || "No hay fecha de entrega todavía",
        ubication:
          booking.booking.ubication || "No hay lugar de entrega todavía",
        seller_id: booking.moreInfo.id_seller,
        seller: booking.moreInfo.username_seller,
        buyer_id: booking.moreInfo.id_buyer,
        buyer: booking.moreInfo.username_buyer,
        product_id: booking.booking.id_product,
        product: booking.moreInfo.title_product,
        price: `${booking.moreInfo.price_product} €`,
        img: booking.imgs.img_product,
        status: booking.booking.status,
      })
    : (bk = "cargando datos de reservas");
  console.log(bk.img);
  return (
    <div id="bk-page">
      <HeaderBackTitle />
      <section className="bk-product">
        <div className="bk-img">
          {bk.img ? (
            <img
              src={`http://localhost:3300/uploads/imgs/${bk.img}`}
              alt="foto de producto"
            />
          ) : (
            <PhotoIcon />
          )}
        </div>
        <Link to={`/product/${bk.product_id}`}>
          <h2>{bk.price} </h2>
          <h3>{bk.product}</h3>
        </Link>
      </section>
      <section className="bk-users">
        <h3 id="bk-users-seller-title">Vendedor:</h3>
        <Link id="bk-users-seller-data" to={`/user/${bk.seller_id}`}>
          <p>{bk.seller}</p>
        </Link>
        <h3 id="bk-users-buyer-title">Comprador:</h3>
        <Link id="bk-users-buyer-data" to={`/user/${bk.buyer_id}`}>
          <p>{bk.buyer}</p>
        </Link>
      </section>
      <section className="bk-options">
        <BookingOptions info={booking.booking} />
      </section>
      <MenuBar />
    </div>
  );
};
export default BookingPage;
