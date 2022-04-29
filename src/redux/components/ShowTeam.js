import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { MdAccountBox, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser, getTeam } from "../operations/operations";

function ShowTeam() {
  const { id } = useParams();
  const users = useSelector((state) => state.getTeam.users);
  const teamMembers = Array.from(users);
  const dispatch = useDispatch();

  // const [filterList, setFilterList] = useState(users);

  // const handleSearch = (event) => {
  //   if (event.target.value === "") {
  //     setFilterList(users);
  //     return;
  //   }
  //   const filteredValues = users.filter(
  //     (item) =>
  //       item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
  //   );
  //   setFilterList(filteredValues);
  // };

  const deleteUserAccount = async (userId) => {
    const res = await dispatch(deleteUser(userId));
    if (res.delete) {
      dispatch(getTeam(id));
      toast.success("user-deleted successfully");
    }
  };

  return (
    <div>
      <div>ShowTeam...</div>

      {/* <input
        className="my-1 shadow border border-none"
        type="search"
        placeholder="Search user"
        onChange={handleSearch}
      /> */}

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
          {teamMembers &&
            teamMembers.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user._id}</td>

                  <td>
                    <img
                      className="shadow rounded"
                      src={user.profile == "" ? <FaUserAlt /> : user.profile}
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
    </div>
  );
}

export default ShowTeam;
