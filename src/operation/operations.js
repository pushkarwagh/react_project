import axios from "axios";

import {
  loginRequest,
  loginSuccess,
  loginError,
  getRequest,
  getSuccess,
  getError,
} from "../actions/actionCreators";


export const getAll = () => {
  console.log("getAll-operations--->");
  return (dispatch) => {
    dispatch(getRequest());
    axios
      .get("http://localhost:8000/all")
      .then((response) => {
        console.log("register-user_response ---", response);
        dispatch(getSuccess(response.data));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(getError(error));
      });
  };
};


export const register = (user) => {
  console.log("register-operations--->", user);
  return () => {
    axios
      .post("http://localhost:8000/register", user)
      .then((response) => {
        console.log("register-user_response ---", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

export const loginUser = (user) => {
  console.log("operations-login--->", user);
  return (dispatch) => {
    dispatch(loginRequest());
       axios
      .post("http://localhost:8000/login", user)
      .then((response) => {
        console.log("login-user_response ---", response);
        localStorage.setItem(`token_id-${response.data._id}`,response.data.token)
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(loginError(error));
      });
  };
};

// export const userFetch = () => {
//   return async dispatch => {
//       try {
//           dispatch(fetchUserRequest);
//           const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//           dispatch(fetchUserSuccess(response.data));
//           console.log(response.data);
//       }
//       catch(error){
//           dispatch(fetchUserError(error.message));
//       }
//   }
// }
