import BookingTemplate from './BookingTemplate';

const BookingsList = (props) => {
  const {bookings, bkInfo} = props;

  let arrayBookings;
  bookings
  ?(arrayBookings = bookings.map((booking,index) => {
    const bookingInfo = bkInfo[index];
    return (
      <li key={bookings.id} className="booking">
        <BookingTemplate data={booking} bkInfo={bookingInfo}/>
      </li>
    );
  })) 
  : (arrayBookings = 'No se han encontrado reservas')


  return(<ul>{arrayBookings}</ul>)
}

export default BookingsList;