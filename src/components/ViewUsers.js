import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { Table } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

function ViewUser() {
  const [ state, setState ] = useState('');
  // const navigate = useNavigate();
  const user = useSelector((state) => state.login.users);
  const allUsers = useSelector((state) => state.get.users);
  const xxa = Array.from(allUsers)
 
  // const dispatch = useDispatch();
  // const neUser = Array.from(users);
  // console.log("array", neUser);
  
  useEffect(() => {
    console.log("view-user_login", user);
    console.log("view-user_getall", allUsers);

    var viewUser = xxa.filter( x => x._id === user._id)
    console.log("view-user_filter", viewUser);
    setState(viewUser);
    console.log("view-user_state", state);
    
    //localStorage.clear('token')
  }, [user]);

  // const logOut = (e) => {
  //   e.preventDefault();
    
  //     const delToken = localStorage.removeItem(`token_id-${state[0]._id}`)
  //     console.log("deleted-Token",delToken);
  //     setState('');
  //     navigate('/register')

    
  // }

  return ( 
    <>
      <div
        className="container bg-light text-center"
        style={{ height: "100px" }}
      >
        <div>{state.name}-Detail's</div>

      </div>

      <div className="table ">
        {/* {user.length > 0 ? ( */}
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
                
                  <tr >
                    <td>{state._id}</td>

                    <td>
                      <Link
                        to={{ pathname: `/viewUser/${user.id}` }}
                        state={user}
                        //onClick={ () => handleView(user) }
                      >
                        {state.name}
                      </Link>
                    </td>

                    <td>
                      <strong>{state.email}</strong>
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
                        // onClick={()=>logOut}
                      >
                        {" "}
                        Log-Out
                      </button>
                    </td>
                  </tr>
                
            </tbody>
          </Table>
        {/* // ) : (
        //   <h3 className="text-center text-warning"> PLZ, LOGIN again!!!</h3>
        //  )} */}
      </div>
    </>
  );
}

export default ViewUser;
