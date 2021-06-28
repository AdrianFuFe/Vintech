// import BookingTemplate from "./BookingTemplate";
import { Link, useLocation } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import PhotoIcon from "@material-ui/icons/Photo";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import "../css/booking-list.css";

const BookingsList = (props) => {
  const { bookings, usersInfo, imgInfo } = props;

  console.log(bookings);
  console.log(usersInfo);
  console.log(imgInfo);

  const route = useLocation();

  let arrayBookings;
  bookings
    ? (arrayBookings = bookings.map((booking, index) => {
        const usersData = usersInfo[index];
        const imgData = imgInfo[index];

        console.log(usersData);
        console.log(imgData.img.img);

        return (
          <li key={booking.id} className="booking">
            <div id="booking-template" className="booking-list">
              <Link to={`${route.pathname}/${booking.id}`}>
                <div className="bk-img">
                  {imgData.img ? (
                    <img
                      src={`http://localhost:3300/uploads/imgs/${imgData.img.img}`}
                      alt="foto de producto"
                    />
                  ) : (
                    <PhotoIcon />
                  )}
                </div>
                <h2 id="bk-product">{usersData.title_product}</h2>
                <h3 id="bk-price">{usersData.price_product}€</h3>
                <p className="bk-time-ago">
                  <ReactTimeAgo date={booking.date} locale="es-ES" />
                </p>
                <span className="bk-users">
                  <p id="buyer">{usersData.username_buyer}</p>
                  <KeyboardArrowRightIcon />
                  <p id="seller">{usersData.username_seller}</p>
                </span>
                <p id="bk-status">estado de la reserva - {booking.status}</p>
              </Link>
            </div>
          </li>
        );
      }))
    : (arrayBookings = "No se han encontrado reservas");

  return <ul>{arrayBookings}</ul>;
};

export default BookingsList;
