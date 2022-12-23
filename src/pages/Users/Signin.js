import React from 'react'
import './Sign.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import {useNavigate} from 'react-router-dom'


function Signin() {
        const serverUrl="https://cinetrail-server.herokuapp.com"

        let navigate = useNavigate();

        //global state
        const {user, setUser, token, setToken} = React.useContext(UserContext);


    const [email, setEmail] = React.useState("")
    const[password, setPassword] = React.useState('')

    const handleSignin = (e) => {
        e.preventDefault();
        console.log(email,password);
        //api call to log in
        axios.post(`${serverUrl}/users/login`, {email, password})
        .then(res => {
            console.log(res.data)
            //saver user data and token
            setUser(res.data)
            setToken(res.data.token)
            //save to local storage
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userInfo', JSON.stringify(res.data))
        })
        .catch(err => console.log(err))

        //nav to homepage
        navigate('/')


    }

  return (
    <div className="sign-container">
    <form className="signup-form" onSubmit={handleSignin}>
        <div className="title-container">
            <h1>Sign In</h1>
            <p>Please fill in this form to log in.</p>
        </div>
        <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email} 
                    id="email"  required />
        </div>
        <div className="input-wrapper">
            <label htmlFor="pwd">Password</label>
            <input type="password" placeholder="Enter password"  
                    onChange={(e)=> setPassword(e.target.value)}
                   id="pwd" value={password}required />
        </div>

        <div className="button-container">
            <button type="reset" className="cancel-btn">Cancel</button>
            <button type="submit" className="sign-btn">Sign up</button>
        </div>
        <p className="sign-message">Don't have an account?&nbsp;
            <Link to="/signup" className="red-text">Sign Up</Link>
        </p>

    </form>
</div>
  )
}

export default Signin