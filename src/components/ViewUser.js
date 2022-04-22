import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";

import { deleteUser, getAll } from "../operation/operations";

function ViewUser() {
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.users);
  const allUsers = useSelector((state) => state.get.users);

  useEffect(() => {
    console.log("view-user_login", user);
    console.log("view-user_getall", allUsers);

    if (allUsers !== null) {
      var viewUser = allUsers.filter((x) => x._id === user._id);
      console.log("view-user_filter", viewUser);
    }

    if (viewUser.length > 0) {
      viewUser = JSON.parse(JSON.stringify(viewUser[0]));
      setState(viewUser);
      console.log("view-user_state", state);
    }

    //localStorage.clear('token')
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    const delToken = localStorage.removeItem(`token`);
    // console.log("deleted-Token", delToken);
    setState("");
    navigate("/login");
    alert("logging-out");
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteUser(state._id));
    if (res.delete) {
      navigate("/login");
    }
  };

  return (
    <>
      <div
        className="container bg-light text-center d-flex align-items-baseline"
        style={{ height: "100px" }}
      >
        <div className="user-heading m-auto">
          Welcome - <strong> {state.name} </strong> :) 
        </div>
        <div className="user-logout">
          <button
              className="me-auto
              btn border border-info shadow "
              onClick={logOut}
              >   <RiLogoutCircleLine size={25}/>    
            </button>  
        </div>
      </div>

      <div className="table ">
        <Table striped bordered hover variant="light">
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

        <div className="delete-account" style={{ float:"right" }} >
            <button className="shadow btn btn-warning m-2 " onClick={deleteAccount} >
              {" "}
              Delete
            </button>        
              
          </div>
      </div>
    </>
  );
}

export default ViewUser;
