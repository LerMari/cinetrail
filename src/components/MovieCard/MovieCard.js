import React from 'react'
import Rating from '../Rating/Rating';
import './MovieCard.css'
import {Link} from 'react-router-dom';

function MovieCard({movie, imageUrl, imgHeight, cardStyle, borderRadius}) {

    const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

    const imageStyle={
        backgroundImage: `url("${imageBaseUrl}${imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: imgHeight,
        width: "200px",
        position: "relative",
        borderRadius: borderRadius
    }

    //<Link to={`/moviedetails/${upcomingMovies[index]?.id}`}>

  return (
    <Link className={cardStyle}
    to={`/moviedetails/${movie?.id}`}>
        <div style={imageStyle}>
            <div className="movie-info-top">
                {/* <p>{movie.vote_average}</p> */}
                <Rating stars={movie.vote_average/2} />
            </div>
            <div className="movie-info-bottom">
                <p>{movie.title}</p>
                <p>Rating: {movie.vote_average}</p>
            </div>
        </div>
        {
            cardStyle === "top-rated-card" && <p>{movie.title}</p>
        }
    </Link>
  )
}

export default MovieCard