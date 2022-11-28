import axios from 'axios'
import React from 'react'
import './Slider.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import StarRatings from 'react-star-ratings'


function Slider({apiKey, baseUrl}) {

//base url for images
    const imageUrl = "https://image.tmdb.org/t/p/original"

    const [upcomingMovies, setUpcomingMovies] = React.useState(
    []);

    const [index, setIndex] = React.useState(0);

    const [currentRating, setCurrentRating] = React.useState(0);

React.useEffect(
    ()=>{
        // console.log(apiKey);
        axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
        .then(res => {
            // console.log(res.data.results);
            setUpcomingMovies(res.data.results);
            let rating = Math.round((res.data.results[0]?.vote_average)/2);
                setCurrentRating(rating);
        })
        .catch(err => console.log(err))
    }, []
)

const sliderStyle={
    backgroundImage: `url("${imageUrl}${upcomingMovies[index]?.backdrop_path}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "60vh",
    position: "relative"
}

const handleLeft = () => {
    console.log("left clicked");
    index === 0?
    setIndex(upcomingMovies.length -1) :
    setIndex(index-1);
    let rating = Math.round((upcomingMovies[index]?.vote_average)/2);
                setCurrentRating(rating);
}
const handleRight = () => {
    console.log("right clicked");
    index === upcomingMovies.length - 1?
    setIndex(0) :
    setIndex(index+1);
    let rating = Math.round((upcomingMovies[index]?.vote_average)/2);
                setCurrentRating(rating);
}
  return (
    <div style={ sliderStyle }> 
        <div className="slider-overlay"></div>
        <MdKeyboardArrowLeft className="left-arrow" 
                              onClick={handleLeft}/>
        <MdKeyboardArrowRight className="right-arrow" 
                              onClick={handleRight}/>
        <div className="movie-info">
            <h1>{upcomingMovies[index]?.title}</h1>
            <p>{upcomingMovies[index]?.overview.slice(0,120)}</p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <StarRatings
                rating={currentRating}
                starRatedColor="red"
                starDimension = "15px"
                starSpacing="1px"
           />
           <p className="see-details">See Details</p>
        
        </div>
    </div>
  )
}

export default Slider