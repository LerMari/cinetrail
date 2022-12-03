import React from 'react'
import StarRatings from 'react-star-ratings'

function Rating({stars}) {
  return (
    <div>
        <StarRatings
            rating={stars}
            starRatedColor="red"
            starDimension="15px"
            starSpacing="1px"
        />
    </div>
  )
}

export default Rating