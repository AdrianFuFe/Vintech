import useRemoteMessages from "../hooks/useRemoteMessages";
import ChatRoomHeader from "../components/ChatRoomHeader";
import MessagesList from "../components/MessagesList";
import ChatRoomInput from "../components/ChatRoomInput";
import MenuBar from "../components/MenuBar";
import HeaderBackTitle from "../components/HeaderBackTitle";
import "../css/chatroom.css";

const ChatRoomPage = (props) => {
  const [messages] = useRemoteMessages();

  return (
    <div id="chatroom">
      <HeaderBackTitle />
      <ChatRoomHeader messages={messages.data} />
      <MessagesList messages={messages.data} />
      <ChatRoomInput />
      <MenuBar />
    </div>
  );
};
export default ChatRoomPage;
