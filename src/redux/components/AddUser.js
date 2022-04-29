import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

import { addUser } from "../operations/operations";

function AddUser() {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [profile, setProfile] = useState("");

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log("register_onchange-->", user);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profile", profile);
    console.log("---",formData);
    const res = await dispatch(addUser(formData,id));
    if (res.addNew) {
      // navigate("/user")
      setUser({
        name: "",
        email: "",
        password: "",
      });
      setProfile("")
    }
  };

  return (
    <div
      className="container my-2 border p-2"
      style={{ backgroundColor: "lightblue" }}
    >
      <div className="header text-center text-secondary d-flex">
      <div>
            {" "}
            <Link to={"/user"}>
              <button className="btn btn-secondary" type="button">
                <BiArrowBack />
              </button>
            </Link>
          </div>
        {" "}
        <div className="heading" style={{marginInline:"auto", alignSelf: "center"}} >
        <FaUserPlus /> User{" "}
        </div>
      </div>

      <form className="form-wrapper w-50 my-2 m-auto " onSubmit={onSubmit}>
        <div className="name p-1">
          <div className="label">
            <label>Name:</label>
          </div>
          <input
            style={{ width: "-webkit-fill-available" }}
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

        <div className="profile p-1 ">
          <input
            className="input"
            type="file"
            placeholder="Profile"
            name="profile"
            filename="profile"
            onChange={selectProfile}
          />
        </div>

        <div className="buttons d-flex my-2 p-1">
          <div>
            <button
              className="btn btn-success"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default AddUser;
