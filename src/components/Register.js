import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../operation/operations";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log("register_onchange-->", user);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(register(user));
    if (res.register) {
      navigate("/login")
      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="container my-2 border p-2">
      <div className="header text-center text-secondary"> Register_User </div>
      <form className="form-wrapper w-50 my-2 m-auto " onSubmit={onSubmit}>
        <div className="name p-1">
          <div className="label">
            <label>Name:</label>
          </div>
          <input
            className="input border-2px-danger round"
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={onChange}
          />
        </div>

        <div className="email p-1">
          <div className="label">
            <label>Email:</label>
          </div>
          <input
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
            className="input"
            type="password"
            placeholder="Pasword"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </div>
        <div className="button my-2 p-1">
          <button
            className="submit btn-warning"
            type="submit"
            // onClick={() => onSubmit(user)}
          >
            <FaUserPlus /> Register
          </button>
        </div>

        <div className="para p-2">
          <p>
            {" "}
            Have an account? then
            <Link
              to="/login"
              className="text-blue ms-1"
              style={{ textDecoration: "none" }}
            >
              Log_IN
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;