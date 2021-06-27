import BookingTemplate from "./BookingTemplate";

const BookingsList = (props) => {
  const { bookings, bkInfo, img } = props;

  let arrayBookings;
  bookings
    ? (arrayBookings = bookings.map((booking, index) => {
        const bookingInfo = bkInfo[index];
        const imgInfo = img[index];

        return (
          <li key={booking.id} className="booking">
            <BookingTemplate
              data={booking}
              bkInfo={bookingInfo}
              img={imgInfo}
            />
          </li>
        );
      }))
    : (arrayBookings = "No se han encontrado reservas");

  return <ul>{arrayBookings}</ul>;
};

export default BookingsList;
