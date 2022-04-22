import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { MdAccountBox, MdDelete } from "react-icons/md";

import { getAll, deleteUser } from "../operation/operations";

function Home() {
  const users = useSelector((state) => state.get.users);
  const dispatch = useDispatch();
  
  const neUser = Array.from(users);
  console.log("array", neUser);

  useEffect(() => {
    console.log("home-state", users);
    //localStorage.clear('token')
  }, [users]);

  const deleteUserAccount = async (id) => {
    const res = await dispatch(deleteUser(id))
    if(res.delete) {
      alert("user-deleted successfully");
    }
  }

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
              </tr>
            </thead>
            <tbody>
              {neUser.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user._id}</td>

                    <td>
                        <MdAccountBox/>{user.name}
                    </td>

                    <td>
                      <strong>{user.email}</strong>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={()=> deleteUserAccount(user.id) }
                      >
                        {" "}
                        <MdDelete/>Account
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
