import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { MdAccountBox, MdDelete } from "react-icons/md";

import { getAll, deleteUser } from "../operation/operations";
import { FaUserAlt } from "react-icons/fa";

function Home() {
  const users = useSelector((state) => state.get.users);
  const loginUser = useSelector((state) => state.login.users)
  const dispatch = useDispatch();

  const neUser = Array.from(users);

  useEffect(() => {
    console.log("array", neUser);
    console.log("home-state", users);
  }, []);

  const deleteUserAccount = async (id) => {
    const res = await dispatch(deleteUser(id));
    if (res.delete) {
      dispatch(getAll());
      alert("user-deleted successfully");
    }
  };

  return (
    <>
      {loginUser.isAdmin ? (
        <div className="main">
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

          <div className="user-table ">
            {users.length > 0 ? (
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
                    <th scope="col-2">Profile</th>
                    <th scope="col">Name</th>
                    <th scope="col-2">email</th>
                    <th scope="col">Actons</th>
                  </tr>
                </thead>
                <tbody>
                  {neUser.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>{user._id}</td>

                        <td>
                          <img
                            className="shadow rounded"
                            src={
                              user.profile == "" ? <FaUserAlt /> : user.profile
                            }
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>

                        <td>
                          <MdAccountBox /> {user.name}
                        </td>

                        <td>
                          <strong>{user.email}</strong>
                        </td>

                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUserAccount(user._id)}
                          >
                            {" "}
                            <MdDelete />
                            Account
                          </button>
                        </td>
                      </tr>
                    ); //return close...
                  })}
                </tbody>
              </Table>
            ) : (
              <h3 className="text-center text-warning"> no users YEt!? </h3>
            )}
          </div>
        </div>
      ) : (
        <div> not a admin</div>
      )}
    </>
  );
}

export default Home;
