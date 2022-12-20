import React from 'react'
import { MdSentimentSatisfiedAlt } from 'react-icons/md'
import './Sign.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
function Signup() {

    const baseUrl = "https://cinetrail-server.herokuapp.com";

    const [email, setEmail] = React.useState("")
    const[password, setPassword] = React.useState('')
    const[username, setUsername] = React.useState('')
    const [success, setSuccess] = React.useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(email, password, username);
        //make api call to create new user
        axios.post(`${baseUrl}/users/signup`, {email, password, username})
        .then(res=>{
            console.log(res.data)

            if(res.data.status === 409) {
                alert("email exists")
            }
            else {
                setSuccess(true);
                //clear boxes
                setEmail('')
                setPassword('')
                setUsername('')
            }
        })
        .catch(err => console.log(err))
    }


  return (
    <div className="sign-container">
        <form className="signup-form" onSubmit={handleSignup}>
            <div className="title-container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
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
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Enter username"
                        onChange={(e)=> setUsername(e.target.value)}  
                       id="username" value={username} required />
            </div>
            <div className="button-container">
                <button type="reset" className="cancel-btn">Cancel</button>
                <button type="submit" className="sign-btn">Sign up</button>
            </div>
            {
                success ?
                <p>Account created</p>
                :
            <p className="sign-message">Already have an account?&nbsp;
                <Link to="/signin" className="red-text">Sign In</Link>
            </p>
            }
        </form>
    </div>
  )
}

export default Signup