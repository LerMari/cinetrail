import axios from 'axios'
import React from 'react'



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
    height: "60vh"
}

  return (
    <div style={ sliderStyle }> 
        {upcomingMovies[0]?.title}
    </div>
  )
}

export default Slider