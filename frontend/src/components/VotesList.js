import VoteTemplate from './VoteTemplate';

const VotesList = (props) => {
  const {votes, buyer} = props;

  let arrayVotes;
  votes
  ?(arrayVotes = votes.map((vote,index) => {
    const buyerInfo = buyer[index];
    return (
      <li key={vote.id} className="vote">
        <VoteTemplate data={vote} buyer={buyerInfo}/>
      </li>
    );
  })) 
  : (arrayVotes = 'Todavía no hay valoraciones')


  return(<ul>{arrayVotes}</ul>)
}

export default VotesList;