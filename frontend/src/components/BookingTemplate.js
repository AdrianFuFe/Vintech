import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import { Link, useLocation } from "react-router-dom";
import PhotoIcon from "@material-ui/icons/Photo";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import "../css/booking-list.css";

const BookingTemplate = (props) => {
  const { data, bkInfo, img } = props;

  const route = useLocation();

  let bk;
  data && bkInfo
    ? (bk = {
        date: data.date,
        meeting_date: data.meeting_date || "No hay fecha de entrega todavía",
        ubication: data.ubication || "No hay lugar de entrega todavía",
        seller: bkInfo.username_seller,
        buyer: bkInfo.username_buyer,
        product: bkInfo.title_product,
        price: `${bkInfo.price_product}€`,
        img: img.img_product,
        status: data.status,
      })
    : (bk = "cargando datos de reservas");

  return (
    <div id="booking-template" className="booking-list">
      <Link to={`${route.pathname}/${data.id}`}>
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
        <h2 id="product">
          {bk.product} - {bk.price}
        </h2>
        <p className="time-ago">
          <ReactTimeAgo date={bk.date} locale="es-ES" />
        </p>
        <span className="users">
          <p id="buyer">{bk.buyer}</p>
          <KeyboardArrowRightIcon />
          <p id="seller">{bk.seller}</p>
        </span>
        <p id="status">estado de la reserva - {bk.status}</p>
      </Link>
    </div>
  );
};
export default BookingTemplate;
