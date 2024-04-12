import { useState, } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import SignInimg from './style/images/SignIn.jpg';

import './style/css/LandingPage-signIn.css';

function SignIn() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Utilize useNavigate hook

    function postData() {
        axios.post('http://localhost:3000/user/signin', {
            username: name,
            password: password
        })
            .then(function (response) {
                console.log(response);
                if (response.data.message === 'Successfully') { // Check for success response from backend
                    const expirationTime = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000);
                // Save token to cookies with expiration time
                document.cookie = `token=${response.data.token}; expires=${expirationTime.toUTCString()}; path=/dashboard`;
                    navigate('/dashboard'); // Redirect to dashboard on successful login
                } else {
                    console.error('Login failed:', response.data.message);
                    // Handle login failure (e.g., display error message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className="landingPage-signIn-flexContainer">

                <div className="landingPage-signIn-centeredContent">
                    <img className="landingPage-signIn-flexItem imagSignIN" src={SignInimg} alt="" />
                    <div className="landingPage-signIn-flexItem flexContainerTwo">
                        <input
                            className='flexContainerTwo-input'
                            type="email"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className='flexContainerTwo-input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button className='flexContainerTwo-button' type="button" onClick={postData}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
