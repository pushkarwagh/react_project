import { toast } from "react-toastify";
// import Loader from "react-js-loader";

import API from "./api.js";
import { getTokenFromLs, setTokenInLs } from "../utils/helpers.js";
import {
  loginRequest,
  loginSuccess,
  loginError,
  getRequest,
  getSuccess,
  getError,
  getUserRequest,
  getUserSuccess,
  getUserError,
  getTeamRequest,
  getTeamSuccess,
  getTeamError,
} from "../actions/actionCreators";

// const useLoader = () => {
//   var [loading, setLoading] = useState(null);
//   return (
//     <Loader
//       type="spinner-circle"
//       color="#00BFFF"
//       height={100}
//       width={100}
//       visible={loading}
//     />
//   );
// };

export const getAll = () => {
  // console.log("getAll-operations--->");
  return (dispatch) => {
    dispatch(getRequest());
    API.get("/all")
      .then((response) => {
        // console.log("register-user_response ---", response);
        dispatch(getSuccess(response.data));
      })
      .catch((error) => {
        // console.log("error", error);
        dispatch(getError(error));
      });
  };
};

export const getUser = (id) => {
  // console.log("getAll-operations--->");
  return async (dispatch) => {
    try {
      dispatch(getUserRequest());
      const response = await API.get(`/user/${id}`, {
        headers: {
          authorization: getTokenFromLs(),
        },
      });
      // console.log("get-user_response ---", response);
      dispatch(getUserSuccess(response.data));
      return { getUser: true };
    } catch (error) {
      // console.log("error", error);
      dispatch(getUserError(error));
      return { getUser: false };
    }
  };
};

export const getTeam = (id) => {
  console.log("getTeam-operations--->");
  return async (dispatch) => {
    try {
      dispatch(getTeamRequest());
      const response = await API.get(`/team/${id}`, {
        headers: {
          authorization: getTokenFromLs(),
        },
      });
      console.log("get-team_response ---", response);
      dispatch(getTeamSuccess(response.data));
      return { getTeam: true };
    } catch (error) {
      // console.log("error-team", error);
      dispatch(getTeamError(error));
      toast.error(error.response.data)
      return { getTeam: false };
    }
  };
};

export const register = (user) => {
  // console.log("register-operations--->", user);
  return async () => {
    try {
      const response = await API.post("/register", user);
      // console.log("register-user_response ---", response.data);
      // alert(response.data)

      toast.success(response.data);
      return { register: true };
    } catch (error) {
      // console.log("error", error.response.data);
      // alert(error.response.data)
      toast.error(error.response.data);
      return { register: false };
    }
  };
};

export const addUser = (user,id) => {
  return async () => {
    try {
      const response = await API.post(`/add/${id}`, user, {
        headers: {
          authorization: getTokenFromLs(),
        },
      });

      toast.success(response.data);
      return { addNew: true };
    } catch (error) {
      toast.error(error.response.data);
      return { addNew: false };
    }
  };
};

export const loginUser = (user) => {
  // console.log("operations-login--->", user);
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await API.post("/login", user);
      // console.log("login-user_response ---", response.data);

      //setting token..
      setTokenInLs(response.data.token);

      dispatch(loginSuccess(response.data));
      dispatch(getUser(response.data._id));
      toast.success("logged in successfully");
      // alert('Logged-In successfully!!')
      return { login: true };
    } catch (error) {
      // console.log("login_operation-error", error.response.data)
      dispatch(loginError(error.response.data));
      // alert(`login_operations-error-- \n ${error.response.data}`)
      toast.error(error.response.data);
      return { login: false };
    }
  };
};

export const updateProfile = (user, id) => {
  // console.log("operations-editUser--->", user,"id____",id);
  return async (dispatch) => {
    try {
      const response = await API.patch(`/editProfile/${id}`, user, {
        headers: {
          authorization: getTokenFromLs(),
        },
      });
      // console.log("editProfile_response ---", response.data);
      // alert('Profile updated successfully!!')/
      // await dispatch(getUser(id));
      toast.success("Profile updated successfully");
      return { editProfile: true };
    } catch (error) {
      // console.log("editProfile_operation-error", error.response)
      // alert(`editProfile_operations-error-- \n ${error.response.data.message}`)
      toast.error(error.response.data.message);
      return { editProfile: false };
    }
  };
};

export const editUser = (user) => {
  // console.log("operations-editUser--->", user);
  return async (dispatch) => {
    try {
      const { _id: id } = user;

      const response = await API.patch(`/edit/${id}`, user, {
        headers: {
          authorization: getTokenFromLs(),
        },
      });
      // console.log("editUser_response ---", response.data);
      // alert('updated successfully!!')
      await dispatch(getUser(id));
      toast.success("user updated successfully");
      return { edit: true };
    } catch (error) {
      // console.log("editUser_operation-error", error.response)
      // alert(`editUser_operations-error-- \n ${error.response.data.message}`)
      toast.error(error.response.data.message);
      return { edit: false };
    }
  };
};

export const deleteUser = (_id) => {
  // console.log("operations-deleteUser--->", _id);
  return async () => {
    try {
      const response = await API.delete("/delete", {
        headers: {
          authorization: getTokenFromLs(),
        },
        data: { _id },
      });

      // console.log("deleteUser_response ---", response.data);
      // alert('deleted successfully!!')

      toast.success("deleted successfully");
      return { delete: true };
    } catch (error) {
      // console.log("deleteUser_operation-error", error.response)
      // alert(`deleteUser_operations-error-- \n ${error.response.data.message}`)
      toast.error(error.response.data.message);
      return { delete: false };
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
