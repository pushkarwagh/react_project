import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import { getAll } from "../operation/operations";

function Home() {
  const users = useSelector((state) => state.get.users);
  const dispatch = useDispatch();
  const neUser = Array.from(users);
  console.log("array", neUser);

  useEffect(() => {
    console.log("home-state", users);
    //localStorage.clear('token')
  }, [users]);

  return (
    <>
      <div
        className="container bg-light text-center"
        style={{ height: "100px" }}
      >
        <div>USER'S-LIST</div>

        <button
          className="btn btn-success mx-2"
          onClick={() => dispatch(getAll())}
        >
          {" "}
          all-users
        </button>
      </div>

      <div className="table ">
        {users.length > 0 ? (
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th scope="col-2">id</th>
                <th scope="col">Name</th>
                <th scope="col-2">email</th>
                <th scope="col">Actons</th>
                <th scope="col">Button</th>
              </tr>
            </thead>
            <tbody>
              {neUser.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user._id}</td>

                    <td>
                      <Link
                        to={{ pathname: `/viewUser/${user.id}` }}
                        state={user}
                        //onClick={ () => handleView(user) }
                      >
                        {user.name}
                      </Link>
                    </td>

                    <td>
                      <strong>{user.email}</strong>
                    </td>

                    <td>
                      <Link
                        to={{
                          pathname: `/editUser/${user.id}`,
                          state: { data: user },
                        }}
                      >
                        <GrEdit
                          className="mx-2 "
                          //onClick={() => dispatch(EditUser(user)) }
                        />
                      </Link>

                      <MdDelete
                        className="mx-2 text-danger"
                        //onClick={ () => dispatch(DeleteUser(user.id)) }
                      />
                    </td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => localStorage.removeItem(`token_id-${user._id}`)}
                      >
                        {" "}
                        Delete_Token
                      </button>
                    </td>
                  </tr>
                ); //return close...
              })}
            </tbody>
          </Table>
        ) : (
          <h3 className="text-center text-warning"> no users YEt!?</h3>
        )}
      </div>
    </>
  );
}

export default Home;
