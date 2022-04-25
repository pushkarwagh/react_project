import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAll, loginUser } from "../operation/operations";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAll());
    }, 2000);
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log("login_onchange-->", user);
  };

 const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(user))
    if(res.login) {
        navigate("/user")
    }
  };

  return (
    <div className="container my-2 border p-2">
      <div className="header text-center text-secondary"> Log_IN </div>
      <form className="form-wrapper my-2 w-50 m-auto p-2" onSubmit={onSubmit}>
        <div className="email p-1">
          <div className="label">
            <label>Email:</label>
          </div>
          <input
            style={{ width: "-webkit-fill-available" }}
            className="input"
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={onChange}
          />
        </div>

        <div className="password p-1">
          <div className="label">
            <label>Password:</label>
          </div>
          <input
            style={{ width: "-webkit-fill-available" }}
            className="input"
            type="password"
            placeholder="Pasword"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </div>
        <div className="button my-2 p-1">
          <button className="submit btn-warning mb-2" type="submit">
            <FaSignInAlt /> LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
