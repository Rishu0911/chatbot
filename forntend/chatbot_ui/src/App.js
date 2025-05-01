import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home"
import AuthForm from "./login/auth";

function App() {
  

  return (
    <div>
       <Router>
      {/* <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
