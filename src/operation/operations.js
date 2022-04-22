import API from './api.js';

import { getTokenFromLs, setTokenInLs } from '../utils/helpers.js';
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
    API.get('/all')
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
  return async () => {
    try{
      const response = await API.post('/register', user)
      console.log("register-user_response ---", response.data);
      alert(response.data)
      return { register: true }
    }
    catch(error){
      console.log("error", error.response.data);
      alert(error.response.data)
      return { register: false }
    }
    
  };
};

export const loginUser =  (user) => {
  console.log("operations-login--->", user);
  return  async (dispatch) => {
    try{
      dispatch(loginRequest())
      const response = await API.post('/login', user)
      console.log("login-user_response ---", response.data);
      
      //setting token..
      setTokenInLs(response.data.token);
      
      dispatch(loginSuccess(response.data))
      alert('Logged-In successfully!!')
      return { login: true }
    }
    catch(error){
      console.log("login_operation-error", error.response.data)
      dispatch(loginError(error.response.data))
      alert(`login_operations-error-- \n ${error.response.data}`)
      return { login: false }
    }    
  };
};

export const editUser =  (user) => {
  console.log("operations-editUser--->", user);
  return  async () => {
    try{
      const { _id: id } = user
    
      const response = await API.patch(`/edit/${id}`, user, {
        headers: {
          'authorization': getTokenFromLs()
        },
        
      })
      console.log("editUser_response ---", response.data);
      alert('updated successfully!!')
      return { edit: true }
    }
    catch(error){
      console.log("editUser_operation-error", error.response)
      alert(`editUser_operations-error-- \n ${error.response.data.message}`)
      return { edit: false }
    }
    
  };
};


export const deleteUser =  (_id) => {
  console.log("operations-deleteUser--->", _id);
  return  async () => {
    try{
      const response = await API.delete('/delete',{
        headers: {
          'authorizaton': getTokenFromLs()
        },
        data:{ _id }
      })

      console.log("deleteUser_response ---", response.data);
      alert('deleted successfully!!')
      return { delete: true }
    }
    catch(error){
      console.log("deleteUser_operation-error", error.response)
      alert(`deleteUser_operations-error-- \n ${error.response.data.message}`)
      return { delete: false }
    }
    
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
