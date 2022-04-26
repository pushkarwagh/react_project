import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
// import { RiLogoutCircleLine } from "react-icons/ri";

import { deleteUser, getAll, updateProfile } from "../operations/operations";

function ViewUser() {
  const [state, setState] = useState("");
  const [profile, setProfile] = useState(state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.users);
  const allUsers = useSelector((state) => state.get.users);
  
  useEffect(() => {
    // console.log("view-user_login", user);
    // console.log("view-user_getall", allUsers);

    if (allUsers !== null) {
      var viewUser = allUsers.filter((x) => x._id === user._id);
      // console.log("view-user_filter", viewUser);
    }

    if (viewUser.length > 0) {
      viewUser = JSON.parse(JSON.stringify(viewUser[0]));
      setState(viewUser);
      // console.log("view-user_state", state);
    }
  }, []);

  const selectProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteUser(state._id));
    if (res.delete) {
      const delToken = localStorage.removeItem(`token`);
      navigate("/register");
    }
  };

  const changeProfile = async (state,profile) => {
    // console.log("update-profile",profile);
    // console.log("profile-staet",state);
    if(profile !== "") {
      const formData = new FormData();
      formData.append("email", state.email);  
      formData.append("profile",profile);
        
      
      console.log("profile0",formData);
      const res = await dispatch(updateProfile(formData,state._id));
      if(res.editProfile) {
        //  alert("success")
         const all = dispatch(getAll())
         setState({...state,profile:profile})
      }
    }
  };

  return (
    <>
      <div
        className="container bg-light text-center d-flex align-items-baseline border-round"
        style={{ height: "100px" }}
      >
        <div className="user-heading m-auto">
          Welcome - <strong> {state.name} </strong> :)
        </div>
        {/* <div className="user-logout">
          <button
            className="me-auto btn border border-info shadow "
            disabled
          >
            {" "}
            <RiLogoutCircleLine size={25} />
          </button>
        </div> */}
      </div>

      <div className="shadow w-50 m-auto my-2 border text-center align-self-end">
        <div>
          <h5 className="p-1">Profile</h5>
          <img
            alt="user_profile"
            style={{ width: "150px", height: "120px" }}
            src={state.profile}
          />
          <div>
            <input
              className="input p-2"
              type="file"
              placeholder="Profile"
              name="profile"
              filename="profile"
              onChange={selectProfile}
              style={{font: "-webkit-small-control"}}
            />
          </div>
          <div className="m-2">
            <button className="btn btn-success" onClick={()=>changeProfile(state,profile)}>
              {" "}
              upload{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="container table ">
        <Table
          striped
          bordered
          hover
          variant="light"
          style={{ overflowWrap: "anywhere" }}
        >
          <thead>
            <tr>
              <th scope="col-2">id</th>
              <th scope="col">Name</th>
              <th scope="col-2">email</th>
              <th scope="col">Actons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state._id}</td>

              <td>
                <strong> {state.name} </strong>
              </td>

              <td>{state.email}</td>

              <td>
                <Link to={`/edit/${state._id}`} state={{ data: state }}>
                  <GrEdit className="mx-2 " />
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>

        <div className="delete-account" style={{ float: "right" }}>
          <button
            className="shadow btn btn-warning m-2 "
            onClick={deleteAccount}
          >
            {" "}
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
