import React, {useContext} from 'react'
import Slider from '../../components/Slider/Slider';
import './Homepage.css'
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import { ThemeContext } from '../../contexts/ThemeContext'


function Homepage() {
  const { darkMode, setDarkMode} = useContext(ThemeContext);
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const pageNumbers = [1,2,3,4,5,6,7,8,9,10];
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [topRatedMovies, setTopRatedMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);

  //useEffect to call API when component loads (function + empty array)
  React.useEffect(
    ()  => {
      axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
      .then(res => {setPopularMovies(res.data.results);
      })
      .catch(err => console.log(err))

      axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&page=1`)
      .then(res => { setTopRatedMovies(res.data.results.slice(0, 10));
      })
      .catch(err => console.log(err))
    }, [page]
  )



  return (
    <div className={darkMode? "homepage-container" : "homepage-container homepage-light"}>
        <Slider />

        <div className="movies-wrapper">
          <div className="popular-container">
            <h3>Popular Movies</h3>
            <div className="popular-cards-wrapper">
              {/* {
                popularMovies.map(item=> <p>{item.title}</p>)
              } */}
               {
                popularMovies.map(item=> <MovieCard movie={item} 
                                                   imageUrl={item.poster_path}
                                                   imgHeight="300px" 
                                                   cardStyle="popular-card"
                                                   borderRadius="16px"/>)
              }
            </div>


            <div className="page-numbers">
              <p>Select Page</p>
              {
                pageNumbers.map(num => <p onClick={()=>setPage(num)}>{num}</p>)
              }



            </div>
          </div>



          <div className="top-rated-container">
            <h3>Top Rated Movies</h3>
            <div className="top-rated-cards-wrapper">
              {
                topRatedMovies.map(item=> <MovieCard movie={item}
                                                     imageUrl={item.backdrop_path} 
                                                     imgHeight="100px" 
                                                     cardStyle="top-rated-card"
                                                     borderRadius="8px"/>)
              }

            </div>
          </div>
        </div>

    </div>
  )
}

export default Homepage