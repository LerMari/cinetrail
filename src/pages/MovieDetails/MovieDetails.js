import React from 'react'
import {useParams} from 'react-router-dom'
import './MovieDetails.css'
import axios from 'axios'
import ReactPlayer from 'react-player'

function MovieDetails() {
    //  const params= useParams();
    //  console.log(params);
     const{movieId} = useParams();
     const apiKey = process.env.REACT_APP_API_KEY;
     const baseUrl = process.env.REACT_APP_BASE_URL;
     const imageUrl = process.env.REACT_APP_IMAGE_BASE_URL;

     //create state to hold video info
     const [videoLink, setVideoLink] = React.useState('');

     //create state to hold movie
     const [movie, setMovie] = React.useState({});
    
     React.useEffect(
        ()=>{

        //call api to get movie info
        axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
        .then(res=>{
        console.log(res.data)
        setMovie(res.data)
        setRating(res.data.vote_average/2)
      })
      .catch(err=>console.log(err))


            axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`)
            .then(res=> {
                console.log(res.data.results)

                //filter to find youtube trailer
                const youTubeLinks = res.data.results.filter( item=> item.site==="YouTube" && item.type ==="Trailer"
                )
                setVideoLink(youTubeLinks[0].key)
            })
            .catch(err=>console.log(err))
        }, []
     )
  return (
    <div className="details-container">
        { videoLink ? 
            <div className="trailer-container">
                <ReactPlayer
                    className="trailer-player"
                    url={`https://www.youtube.com/watch?v=${videoLink}`}
                    width="100%"
                    height="100%"
                />
            </div>
            :
            
            <div className="trailer-container-blank"
            style={
                {
                backgroundImage:`url("${imageUrl}/${movie?.backdrop_path}")`,
                backgroundPosition:"center",
                backgroundSize:"cover"
                }}  >
            <p>No trailers released yet</p>
            </div>
        }

    </div>
  )
}

export default MovieDetails