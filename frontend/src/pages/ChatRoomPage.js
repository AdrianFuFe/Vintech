import useRemoteMessages from "../hooks/useRemoteMessages";
import ChatRoomHeader from "../components/ChatRoomHeader";
import MessagesList from "../components/MessagesList";
import ChatRoomInput from "../components/ChatRoomInput"
import MenuBar from "../components/MenuBar";
import HeaderBackTitle from "../components/HeaderBackTitle";

const ChatRoomPage = (props) => {
  const [messages] = useRemoteMessages();
  /* const copiaConvers = messages.data;
  console.log(copiaConvers);

    //obtenemos un array con los valores de id_user_B sin duplicados
    let uniques;
    if (copiaConvers){
      uniques = [...new Set(copiaConvers.map(
        (obj) => {
        return obj.id_user_B
        })
      )];
    }
  
    //obtenemos un nuevo array con los ultimos mensajes recibidos para cada valor de id_user_B que obtuvimos antes
    let filteredList
    if(uniques){
      filteredList = copiaConvers.filter(function(item){
        return uniques.indexOf(item.id_user_B) > -1;
      });
      console.log(filteredList);
    } */

    /* 
    if (uniques) {
      filteredList = [...new Map(copiaConvers.map(obj =>
        [`${obj.id_user_B}:${uniques}`, obj])).values()
      ];
    console.log(filteredList);
    }
    */
  return(
    <>
      <HeaderBackTitle />
      <ChatRoomHeader messages={messages.data}/>
      <MessagesList messages={messages.data}/>
      <ChatRoomInput />
      <MenuBar />
    </>
  )
}
export default ChatRoomPage;