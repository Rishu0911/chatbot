import React, { useState } from "react";
import httpHandler from "../http/HttpHandler";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted:", {'username': username, 'password': password });
    login({'username': username, 'password': password })
    
  };
  const login = async (creds) => {
    try {
        const response = await httpHandler.post("/auth/authenticate", creds);
        let token = response.data.token
        console.log(token)
        localStorage.setItem("token", token)
        navigate("/home")
    } catch (error) {
      console.error("Error sending message to API:", error);
      
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
