import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAll, loginUser } from "../operations/operations";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const [checked, setChecked] = useState(false);

  // const handleChecked = (event) => {
  //   setChecked(event.target.checked);
  //   if (event.target.checked) {
  //     remember(user);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAll());
    }, 2000);
  }, []);

  useEffect(() => {
    const cookieEmail = getCookie("myEmail");
    const cookiePassword = getCookie("myPassword");
      setUser({
        email: cookieEmail,
        password: cookiePassword,
      });
    document.cookie ="myPassword=; MaxAge=0; secure ; path=http://localhost:3000";
    document.cookie = "myEmail=; MaxAge=0; secure ; path=http://localhost:3000";
  }, []);

  const getCookie = (key) => {
    const name = key + "=";
    const arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      while (item.charAt(0) == " ") {
        return (item = item.substring(1));
      }
      if (item.indexOf(name) === 0) {
        return item.substring(name.length, item.length);
      }
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log("login_onchange-->", user);
  };

  const remember = (values) => {
    //set cookies...
    document.cookie =
      "myEmail=" + values.email + "; path=http://localhost:3000";
    document.cookie =
      "myPassword=" + values.password + "; path=http://localhost:3000";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(user));
    if (res.login) {
      navigate("/user");
    }
  };

  return (
    <div className="container my-2 border p-2">
      <div className="header text-center text-secondary"> Login </div>
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
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </div>

        <div className="remember-me p-1">
          <input
            // style={{ width: "-webkit-fill-available" }}
            className="checkbox mx-1"
            type="checkbox"
            name="remember me"
            // checked={checked}
            // onChange={handleChecked}
            onClick={()=>remember(user)}
          />
          <label>Remember me</label>
        </div>

        <div className="button my-2 p-1">
          <button className="submit btn-warning mb-2" type="submit">
            <FaSignInAlt /> Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
