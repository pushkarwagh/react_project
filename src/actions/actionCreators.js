import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, 
  GET_REQUEST, GET_SUCCESS, GET_ERROR
 } from './actionTypes';

export const getRequest = () => {
  return {
    type:  GET_REQUEST,
  }
}

export const getSuccess = (data) => {
  return {
    type:  GET_SUCCESS,
    payload: data
  }
}

export const getError = (error) => {
  return {
    type:  GET_ERROR,
    payload: error
  }
}


export const loginRequest = () => {
  return {
    type:  LOGIN_REQUEST,
  }
}

export const loginSuccess = (data) => {
  return {
    type:  LOGIN_SUCCESS,
    payload: data
  }
}

export const loginError = (error) => {
  return {
    type:  LOGIN_ERROR,
    payload: error
  }
}

