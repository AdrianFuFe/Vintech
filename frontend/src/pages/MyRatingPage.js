import HeaderBackTitle from '../components/HeaderBackTitle';
import VotesList from '../components/VotesList';
import MenuBar from '../components/MenuBar';
import useRemoteVotes from '../hooks/useRemoteVotes';

const MyRatingPage = (props) => {
  const [votes] = useRemoteVotes();

  return (
    <>
      <HeaderBackTitle />
      <VotesList votes={votes.data} buyer={votes.buyer}/>
      <MenuBar />
    </>
  )
}
export default MyRatingPage;