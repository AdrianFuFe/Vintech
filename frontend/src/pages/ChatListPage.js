import useRemoteConversations from '../hooks/useRemoteConversations';
import HeaderBackTitle from "../components/HeaderBackTitle";
import MenuBar from "../components/MenuBar";
import ChatList from '../components/ChatList';

const ChatListPage = (props) => {
  const [conversations] = useRemoteConversations();
  const copiaConvers = conversations.data;

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
  if (uniques) {
    filteredList = [...new Map(copiaConvers.map(obj =>
      [`${obj.id_user_B}:${uniques}`, obj])).values()
    ];
  }


  return (
    <>
      <HeaderBackTitle />
      <ChatList info={filteredList}/>
      <MenuBar />
    </>
  )
}
export default ChatListPage;