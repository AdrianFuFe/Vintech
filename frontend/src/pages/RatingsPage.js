import HeaderBackTitle from "../components/HeaderBackTitle";
import VotesList from "../components/VotesList";
import MenuBar from "../components/MenuBar";
import useRemoteVotes from "../hooks/useRemoteVotes";
import "../css/ratings-page.css";

const RatingsPage = (props) => {
  const [votes] = useRemoteVotes();
  return (
    <>
      <HeaderBackTitle />
      <VotesList votes={votes.data} buyer={votes.buyer} />
      <MenuBar />
    </>
  );
};

export default RatingsPage;
