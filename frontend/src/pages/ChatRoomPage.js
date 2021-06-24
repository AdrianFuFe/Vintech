import ChatRoomHeader from "../components/ChatRoomHeader";
import MessageTemplate from "../components/MessageTemplate";
import ChatRoomInput from "../components/ChatRoomInput"
import MenuBar from "../components/MenuBar";
import HeaderBackTitle from "../components/HeaderBackTitle";

const ChatRoomPage = (props) => {
  return(
    <>
      <HeaderBackTitle />
      <ChatRoomHeader />
      <MessageTemplate/>
      <ChatRoomInput />
      <MenuBar />
    </>
  )
}
export default ChatRoomPage;