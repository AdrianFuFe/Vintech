import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

const BookingTemplate = (props) => {
  const {data, bkInfo} = props;

  console.log(bkInfo);

  let bk;
  data && bkInfo
  ? (  
    bk = {
    date : data.date,
    meeting_date : data.meeting_date || 'No hay fecha de entrega todavía',
    ubication : data.ubication || 'No hay lugar de entrega todavía',
    seller : ` id: ${bkInfo[0].id_seller} alias: ${bkInfo[0].username_seller}`,
    buyer : ` id: ${bkInfo[0].id_buyer} alias: ${bkInfo[0].username_buyer}`,
    product : ` id: ${bkInfo[0].id_product} producto: ${bkInfo[0].title_product} precio: ${bkInfo[0].price_product}€`,
    status : data.status,
    })
  : (bk = 'cargando datos de reservas')


  return(
    <div id='booking-template'>
      <ReactTimeAgo date={bk.date} locale="es-ES" />
      <p id='meeting-date'>{bk.meeting_date}</p>
      <p id='ubication'>{bk.ubication}</p>
      <p id='seller'>vendedor : {bk.seller}</p>
      <p id='buyer'>comprador : {bk.buyer}</p>
      <p id='product'>producto : {bk.product}</p>
      <p id='status'>estado de la reserva : {bk.status}</p>
    </div>
  )
}
export default BookingTemplate;