import MessageTemplate from "./MessageTemplate";

const MessagesList = (props) => {
  const { messages } = props;
  console.log(messages);

  let copiaConvers = {messages}/* .data */;
  console.log(copiaConvers);

  let copiaDos = messages;

    //obtenemos un array con los valores de id_user_B sin duplicados
    let uniques;
    if (copiaDos){
      uniques = [...new Set(copiaDos.map(
        (obj) => {
        return obj.id_user_B
        })
      )];
      console.log( uniques);
    }

    //obtenemos un nuevo array con los ultimos mensajes recibidos para cada valor de id_user_B que obtuvimos antes
    let filteredList
    if(uniques){
      filteredList = copiaConvers.messages.filter(function(item){
        return uniques.indexOf(item.id_user_B) > -1;
      });
      filteredList = { copiaConvers : filteredList}
      console.log(filteredList);
    }

/*
  let arrayMessages;
  messages
  ?(arrayMessages = messages.map((message) => {
    return (
      <li key={message.id} className="message">
        <MessageTemplate info={message} />
      </li>
    );
  })) 
  : (arrayMessages = 'Todavía no hay valoraciones') */


  return(<ul>{/* {arrayMessages} */}</ul>)
}
export default MessagesList;