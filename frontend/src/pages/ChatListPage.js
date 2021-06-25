import useRemoteConversations from "../hooks/useRemoteConversations";
import HeaderBackTitle from "../components/HeaderBackTitle";
import MenuBar from "../components/MenuBar";
import ChatList from "../components/ChatList";

const ChatListPage = (props) => {
  const [conversations] = useRemoteConversations();
  console.log(conversations);

  return (
    <>
      <HeaderBackTitle />
      <ChatList info={conversations.data} />
      <MenuBar />
    </>
  );
};
export default ChatListPage;
