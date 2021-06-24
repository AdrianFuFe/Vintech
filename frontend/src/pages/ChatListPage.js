import useRemoteConversations from '../hooks/useRemoteConversations';
import HeaderBackTitle from "../components/HeaderBackTitle";
import MenuBar from "../components/MenuBar";
import ChatList from '../components/ChatList';

const ChatListPage = (props) => {
  const [conversations] = useRemoteConversations();
  console.log(conversations.id_product);
  let conversationsList;
  if (conversations){
    for (let i = 0 ; i < conversations.length ; i++ ){
      /* conversationsList */
    }
  } else {
    conversationsList = 'Todavía no tienes conversaciones'
  }

  return (
    <>
      <HeaderBackTitle />
      <ChatList info={conversations.data}/>
      <MenuBar />
    </>
  )
}
export default ChatListPage;