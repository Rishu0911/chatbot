import React, { useState } from 'react'
import httpHandler from "../http/HttpHandler";
import { useNavigate } from "react-router-dom";
import './auth.css'

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup attempted:", {'username': username, 'password': password });
    signUp({'username': username, 'password': password }).then((response) => {
      if(response.status === 200){
        alert("User Created")
        switchLoginSignup()
      }
      else{
        alert('Error')
      }
    })
    .catch((error) => {
      alert(error.response.data.detail)
    })
    
  };
  const signUp = async (creds) => {
        const response = await httpHandler.post("/auth/create", creds);
        return response
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted:", {'username': username, 'password': password });
    login({'username': username, 'password': password }).then((response) => {
      if(response.status === 200){
        let token = response.data.token
        console.log(token)
        localStorage.setItem("token", token)
        navigate("/home")
      }
      else{
        alert('Error')
      }
    })
    .catch((error) => {
      alert(error.response.data.detail)
    })
    
  };
  const login = async (creds) => {
        const response = await httpHandler.post("/auth/authenticate", creds);
        return response
        
  };
  const switchLoginSignup = () => {
    setIsLogin(!isLogin)
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='auth_body'>
    <div className='auth_container'>
        <div className='auth_form-container'>
            <div className='auth_form-toggle'>
                <button className={isLogin ? 'active' : ""} onClick={switchLoginSignup}>
                  Login</button>
                <button className={!isLogin ? 'active' : ""} onClick={switchLoginSignup}>
                  SigUp</button>
            </div>
            { isLogin ? <>
            <div className='auth_form'>
              <input type='text' placeholder='Username' value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
              <input type='password' placeholder='Password'  value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
              <button onClick={handleLogin}>Login</button>
              <br></br>
              <p>Not a Member? <a href='#' onClick={switchLoginSignup}>Signup now</a></p>
            </div>
            </> : <>
            <div className='auth_form'>
              <input type='text' placeholder='Username' value={username}
            onChange={(e) => setUsername(e.target.value)} required/>
              <input type='password' placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
              <input type='password' placeholder='Confirm Password' value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required/>
              <button onClick={handleSignup}>SignUp</button>
              </div>
            </>}
        </div>
    </div>
    </div>
  )
}
