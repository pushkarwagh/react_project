import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./redux/components/Navbar";
import Login from "./redux/pages/Login";
import Register from "./redux/pages/Register";
import Home from "./redux/pages/Home";
import ViewUser from "./redux/components/ViewUser";
import EditUser from "./redux/components/EditUser";
import NotFound from "./redux/pages/NotFound";

toast.configure();

function App() {
  const [state, setState] = useState({
    token: "",
    isActive: true,
  });

  useEffect(() => {
    const Token = localStorage.getItem(`token`);
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
