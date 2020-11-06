import axios from "axios"
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"
import { alertActions } from './'
import {ip} from "./url"
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING ,GET_ALL_USERS,GET_USER_BY_ID} from "./types";
import Axios from "axios"

//const ip ="http://localhost:4000";

export const registerUser = (newUser, history) => dispatch => {
  axios
    .post(ip+"/api/registerUser", newUser)
    .then(history.push("/sign-in"))                             // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err||{}).response||{}).data || 'Error unexpected'})  
    );

    // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    // function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
};    




// Login - get user token
export const loginUser = loginCredentials => dispatch => {
  axios
    .post(ip+"/api/authenticateUser",loginCredentials)
    .then(res => {
     
      // Save to localStorage// Set token to localStorage
      const  token  = res.data;
    
      localStorage.setItem("jwtToken", token);

      console.log("token",token);

      
      // Set token to Auth header
      setAuthToken(token);         

      // Decode token to get user data
      const decoded = jwt_decode(token);
       console.log(decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err||{}).response||{}).data || 'Error unexpected'})
    );
};


//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {

  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  
  // Remove auth header for future requests
    setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};



// Get all users
 export const getAllUser = () => dispatch => {
   const token = localStorage.getItem('jwtToken')
   const http = Axios.create({
     headers: {'Authorization': 'Bearer '+token}
   })
  http.get(ip+"/api/getAllUsers")
  .then(response => {
    dispatch(getAllUsers(response.data))
    // console.log( response.data)
    // return response.data
  })
  .catch(error => {
    throw(error);
  });
}; 

export const getAllUsers = users => {
  // console.log("++++++++",users)
  return {
    type: GET_ALL_USERS,
    payload: users
  }
};

//Get user by id

export const getUserById = (id) => dispatch =>{

  const token = localStorage.getItem('jwtToken')
  const http = axios.create({
    headers: {'Authorization': 'Bearer '+token}
  })
  http.post(ip+"/api/getUserDetailsById",id ,{ headers : {'Authorization': 'Bearer '+token} })
  .then(response => {
    dispatch(getUser(response.data))
     //console.log( response.data)
    // return response.data
  })
  .catch(error => {
    throw(error);
  });
}; 

export const getUser = user => {
  return {
    type: GET_USER_BY_ID,
    payload: user
  }
};

export const userInfo = (userData, history) => dispatch => {

  const token = localStorage.getItem('jwtToken')

 
  axios.post(ip+"/api/createUserProfile", userData ,{ headers : {'Authorization': 'Bearer '+token} })
    .then(history.push('/dashboard'))                             // re-direct to success on successful update
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err||{}).response||{}).data || 'Error unexpected'}) 
    );

    // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    // function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
};    

// Accept  User
export const acceptUser = (acceptCredentials) => dispatch => {
  const token = localStorage.getItem('jwtToken')

  //console.log(acceptCredentials.uuid)
  const credentials = {
    uid : acceptCredentials.uuid,
    user_action: acceptCredentials.user_action
  }
  axios
    .post(ip+"/api/userVerificationAction", credentials,{ headers : {'Authorization': 'Bearer '+token} })
     .then(response => {
       alert(response.data)
     })                             // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err||{}).response||{}).data || 'Error unexpected'}) 
    );
}

