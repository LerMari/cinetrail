import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Header.css'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { ThemeContext } from '../../contexts/ThemeContext'

function Header() {

    //activate useNavigate
    let navigate = useNavigate();

    //const darkMode = true;
    const { darkMode, setDarkMode} = useContext(ThemeContext);
    const handleTheme = () => {
        setDarkMode(!darkMode);
        //save to local storage
        localStorage.setItem("darkMode", !darkMode);
    }

  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to = '/' className="logo">CineTrail</Link>
        <div className="search-container">
            <input placeholder="Search movies" className="search-input" />
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
                <button className="create-account-button"
                onClick={() => navigate(`/signup`)}>Create an account</button>
            </div>
        </div>
    </div>
  )
}

export default Header