import React from 'react'
import './SearchResult.css'
import {Link} from 'react-router-dom'
import noImage from '../../assets/noimage.png'


function SearchResult({movie, setQuery}) {

  //added imageBase here and changed src in img below
  const imageBase = process.env.REACT_APP_IMAGE_BASE_URL;
  //to handle missing images
  const [imageError, setImageError] = React.useState(false);

  return (
    <Link  to={`/moviedetails/${movie.id}`} className="search-link"
            onClick={()=>setQuery('')}>
                <img onError = {()=>setImageError(true)} 
                src={imageError ? noImage : `${imageBase}${movie.backdrop_path}`} />
        
                <p>{movie.original_title}</p>
    </Link>
  )
}

export default SearchResult