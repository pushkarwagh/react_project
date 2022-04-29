import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from "../actions/actionTypes";

const initialState = {
  loading: null,
  users: {},
  error: "",
};

const getAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case GET_ERROR:
      return {
        loading: false,
        users: {},
        error: action.payload,
      };
      
    default:
      return state;
  }
};

export default getAllReducer;
