import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home"
import AuthForm from "./login/auth";

function App() {
  

  return (
    <div>
       <Router>
    
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
