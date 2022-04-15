import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home';
import ViewUser from "./components/ViewUsers";

function App() {
  return (
    <div className="container app">
      <BrowserRouter>
        <Navbar />
        <div className="container p-2 bg-light">
          <Routes>    
            <Route path="/" element={ <Home /> } />         
            <Route path="/register" element={ <Register /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/user" element={ <ViewUser/> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
