import RatingTemplate from './RatingTemplate';



const RatingList = () => {

  const ratings = [
    {id:1,
      date:'20/6/25',
      fname:'adrian',
      lname:'fufe',
      coment:'bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
      points:4,
    },
    {id:2,
      date:'20/4/7',
      fname:'Julia',
      lname:'Garcia Sanjuan',
      coment:'Donec nec congue elit, at lacinia erat. Sed suscipit odio in orci rutrum aliquam. Duis enim tellus, suscipit non nisi eget, commodo porttitor arcu.',
      points:5,
    },
]


  const arrayRatings= ratings.map((rating) => <li key={rating.id}><RatingTemplate data={rating} /></li>);

  return(<ul>{arrayRatings}</ul>  )
}

export default RatingList;