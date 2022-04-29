import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { MdAccountBox, MdDelete } from "react-icons/md";

import { getAll, deleteUser } from "../operations/operations";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function Home() {
  const users = useSelector((state) => state.getAllUsers.users);
  const loginUser = useSelector((state) => state.login.users);
  const dispatch = useDispatch();

  const neUser = Array.from(users);

  const [filterList, setFilterList] = useState(neUser);

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setFilterList(neUser);
      return;
    }
    const filteredValues = neUser.filter(
      (item) =>
        item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    );
    setFilterList(filteredValues);
  };

  // useEffect(() => {
  //   console.log("array", neUser);
  //   console.log("home-state", users);
  // }, []);

  const deleteUserAccount = async (id) => {
    const res = await dispatch(deleteUser(id));
    if (res.delete) {
      dispatch(getAll());
      toast.success("user-deleted successfully");
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
            <input
              className="my-1 shadow border border-none"
              type="search"
              placeholder="Search user"
              onChange={handleSearch}
            />
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
                    <th scope="col-2">Id</th>
                    <th scope="col-2">Profile</th>
                    <th scope="col">Name</th>
                    <th scope="col-2">Email</th>
                    <th scope="col">Actons</th>
                  </tr>
                </thead>
                <tbody>
                  {filterList &&
                    filterList.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>{user._id}</td>

                          <td>
                            <img
                              className="shadow rounded"
                              src={
                                user.profile == "" ? (
                                  <FaUserAlt />
                                ) : (
                                  user.profile
                                )
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
              <h3 className="text-center text-warning"> No users yEt!? </h3>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
            minHeight: "60vh", color:"white", textAlign:"center"
          }}
        >
          {" "}
          Not Admin?!
        </div>
      )}
    </>
  );
}

export default Home;
