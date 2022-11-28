import axios from 'axios'
import React from 'react'
import './Slider.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";



function Slider({apiKey, baseUrl}) {

//base url for images
    const imageUrl = "https://image.tmdb.org/t/p/original"

    const [upcomingMovies, setUpcomingMovies] = React.useState(
    []);

    const [index, setIndex] = React.useState(0);

React.useEffect(
    ()=>{
        // console.log(apiKey);
        axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
        .then(res => {
            // console.log(res.data.results);
            setUpcomingMovies(res.data.results);
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
}
const handleRight = () => {
    console.log("right clicked");
    index === upcomingMovies.length - 1?
    setIndex(0) :
    setIndex(index+1);
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
        </div>
    </div>
  )
}

export default Slider