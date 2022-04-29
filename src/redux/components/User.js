import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";

function User() {
  const singleUser = useSelector((state) => state.getUser.user);

  const [state, setState] = useState("");

  useEffect(() => {
    setState(singleUser);
  }, []);

  return (
    <>
      <div
        className="container bg-light text-center d-flex align-items-baseline border-round"
        style={{ height: "100px" }}
      >
        <div className="user-heading m-auto">
          Welcome - <strong> {state.name} </strong> :)
        </div>
      </div>

      <div className="card my-2 ">
        <Card className=" p-2 shadow" style={{ backgroundColor: "lightblue" }}>
          <Card.Body>
            <Card.Title className="text-center text-dark border border-dark p-2 ">
              <h4> Id: {state._id} </h4>
            </Card.Title>
            <Card.Text className="p-2 text-dark shadow">
              <ul
                key={state._id}
                className="p-2 border"
                style={{ listStyleType: "none" }}
              >
                <li> <b> Name: </b> {state.name} </li>
                <li> <b> Email: </b> {state.email} </li>
                <li> <b> Admin: </b> {state.isAdmin ? "Yes" : "No"} </li>
              </ul>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div style={{ float: "right" }}>
              Edit:
              <Link to={`/edit/${state._id}`} state={{ data: state }}>
                <GrEdit className="mx-2 " />
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default User;
