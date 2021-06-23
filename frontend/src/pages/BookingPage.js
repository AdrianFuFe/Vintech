import useRemoteSingleBooking from '../hooks/useRemoteSingleBooking';

const BookingPage = (props) => {
  const [booking] = useRemoteSingleBooking();

  console.log(booking);
  return(
    <>
    </>
  )
}
export default BookingPage