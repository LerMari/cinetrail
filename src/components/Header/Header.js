import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Header.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import SearchResult from '../SearchResult/SearchResult'



function Header() {

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const {user, setUser, token, setToken} = React.useContext(UserContext);

    //activate useNavigate
    let navigate = useNavigate();

    const [profileOptions, setProfileOptions] = React.useState(false);

    //state for search
    const [query, setQuery] = React.useState('')
    const [queryResults, setQueryResults] = React.useState([]);

    const handleLogout = () =>{
        //clear local storage
        localStorage.clear()
        //reset user and token global state
        setUser('')
        setToken('')
        //go to homepage
        navigate('/')
    }

    //const darkMode = true;
    const { darkMode, setDarkMode} = useContext(ThemeContext);
    const handleTheme = () => {
        setDarkMode(!darkMode);
        //save to local storage
        localStorage.setItem("darkMode", !darkMode);
    }

    const handleSearch = (e) => {
        //console.log("e")
        //save text as query
        setQuery(e.target.value);
        //make api call using query
        axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${e.target.value}`)
        .then(res => {
            console.log(res.data.results)
            setQueryResults(res.data.results)
        })
        .catch(err => console.log(err))
    }

  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to = '/' className="logo">CineTrail</Link>
        <div className="search-container">
            <input placeholder="Search movies" 
             className="search-input"
             onChange={handleSearch} />
             {
                query !== ''?
                <div className="search-results-container">
                {
                queryResults?.map(item => <SearchResult movie={item}
                                                        setQuery={setQuery} />)
                }
                </div>
                :
                null
             }
        </div>
        <div className="header-buttons-container">
            <div className="theme-buttons-container">
            {
                    darkMode?
                    <div className="theme-buttons" >
                        <MdOutlineLightMode className="theme-icon" 
                        onClick={handleTheme}/>
                        <MdOutlineDarkMode className="theme-icon theme-icon-active" />
                    </div>
                    :
                    <div className="theme-buttons" >
                        <MdOutlineLightMode className="theme-icon theme-icon-active" />
                        <MdOutlineDarkMode className="theme-icon" onClick={handleTheme} />
                    </div>
                }
            </div>   
            <div>
                {
                    token? 
                    <div className="profile-container">
                        <img src={user.image_url} className="profile-img"
                        onClick={()=>setProfileOptions(!profileOptions)} />
                    <p>Welcome {user.username}</p>
                    {
                        profileOptions? 
                        <div className="fav-div">
                        <Link to='/myfavorites'>My Favorites</Link>
                        <p className="logout" onClick={handleLogout}>Logout</p>
                        </div>
                        :
                        null
                    }
                    </div>
                    :
                <button className="create-account-button"
                onClick={() => navigate(`/signup`)}>Create an account</button>
                }
            </div>
        </div>
    </div>
  )
}

export default Header