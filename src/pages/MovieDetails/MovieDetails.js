import React from 'react'
import {useParams} from 'react-router-dom'
import './MovieDetails.css'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Rating from '../../components/Rating/Rating'
import Review from '../../components/Review/Review'

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
    
    const [rating, setRating] = React.useState(0);

    //state to hold reviews
    const [reviews, setReviews] = React.useState([]);
    const [reviewNumber, setReviewNumber] = React.useState(3);
    const [totalReviews, setTotalReviews] = React.useState(0);

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
        
        
            //call api to get reviews
            axios.get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`)
            .then(res=>{
                setReviews(res.data.results)
                setTotalReviews(res.data.total_results)
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

        <div className="info-container">
            {movie?.original_title}
            <Rating stars={rating} />
            <div className="moviedetails-info">
                <img src={`${imageUrl}/${movie?.poster_path}`} 
                 className="details-poster" />

                <div className="moviedetails-right">
                    <h2>{movie?.tagline}</h2>
                    <h4>{movie?.overview}</h4>
                    <h4>Status: <span>{movie?.status}</span></h4>
                    <h4>Runtime: <span>{movie?.runtime}</span></h4>
                    <h4>Budget: <span>{movie?.budget}</span></h4>
                </div>
            </div>

        </div>

        <div className="review-container">
            {reviews.slice(0,reviewNumber).map(item => <Review 
                                                        key={item.id}
                                                        review={item} />)}
        </div>
        {
            reviewNumber <= totalReviews?
            <p className="review-toggle" onClick={()=>setReviewNumber(reviewNumber + 3)}>Read more reviews</p>
            :
            <p className="review-toggle" onClick={()=>setReviewNumber(3)}>End of reviews</p>
        }
    </div>
  )
}

export default MovieDetails