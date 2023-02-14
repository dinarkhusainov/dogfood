import React, { useContext } from 'react'
import { Star, StarFill, Trash3} from "react-bootstrap-icons"
import { Link } from 'react-router-dom';
import Ctx from '../../Ctx';



function Review({author, name, text, rating, created_at, id, _id}) {
  const { api, users, user,  setProduct, PATH } = useContext(Ctx)


  const setRating = (n) => {
    let stars = [];
    for (let i=0; i<n; i++) {
      stars.push(<StarFill key={i} />)
    } 
    for (let i=stars.length; i<5; i++) {
      stars.push(<Star key={i} />)
    }
    return stars;
  }

  const setName = (us, au) => {
  let nameAuthor = "";
    for (let i=0; i<us.length; i++) {
      if ( us[i]._id === au
        ) {
      nameAuthor = us[i].name
      } else {}
   } 
   return nameAuthor;
   }

   const remove = (e) => {
    api.delReview(id, _id) 
        .then(res => res.json())
        .then(data => {
            if(!data.error) {
              console.log(data)
              setProduct(data);
            }
        })
    }

  return (
    <>
      <hr></hr>
      {author && author === user._id ? 
        <Link to={PATH + "profile"}><h4>{setName(users, author)}</h4></Link> : 
        <h4>{setName(users, author)}</h4>}
      <div>{setRating(rating)}</div>
      <p>{text}</p>
      <div>{new Date (created_at).toLocaleString()}</div>
      {author && author === user._id &&<button 
      className="button" 
      onClick={remove}
      > 
        <Trash3 />
      </button>}
      <hr></hr>
    </>
  )
}

export default Review