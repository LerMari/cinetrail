import React from 'react'
import './Review.css'
import noimage from '../../assets/istockphoto.jpg'

function Review({review}) {
    const imageUrl = process.env.REACT_APP_IMAGE_BASE_URL;

    //state for image error
    const [imageError, setImageError] = React.useState(false);

    //state for more/less
    const [seeMore, setSeeMore] = React.useState(false);


  return (
    <div className="review">
        <div className="avatar-container">
            <img className="avatar"
            onError={()=>setImageError(true)}
            src={imageError? noimage : `${imageUrl}${review.author_details.avatar_path}`} />
            <p>{review.author}</p>

        </div>
        <div className="review-text">
            {
                seeMore ? 
                <p>{review.content}<span className="read-content" onClick={()=>setSeeMore(false)}>&nbsp;see less</span></p>
                :
                <p>{review.content.slice(0,250)}<span className="read-content" onClick={()=>setSeeMore(true)}>&nbsp;see more</span></p>
            }

        </div>
    </div>
  )
}

export default Review