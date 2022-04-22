import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ViewUser from "./components/ViewUser";
import EditUser from "./components/EditUser";
import NotFound from "./components/NotFound";

function App() {
  const [state, setState] = useState({
    token: "",
    isActive: true,
  });

  useEffect(() => {
    const Token = localStorage.getItem(`token`);
    console.log("nav", Token);
    if (Token) {
      setState({ token: Token, isActive: false });
    } else {
      setState({ token: "", isActive: true });
    }
  });

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container app">
        <div className="container p-2 bg-light">
          <Routes>
            {state.isActive ? (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </>
            ) : (
              <>
              <Route path="/" element={<Home />} />
                <Route path="/user" element={<ViewUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
