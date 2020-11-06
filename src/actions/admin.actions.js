import axios from "axios"
import {ip} from "./url"
import { GET_KYC_REGISTRY, GET_ALL_ROLES,GET_ERRORS} from "./types";
import Axios from "axios" 

export const registrySearch = req => dispatch =>{

    const token = localStorage.getItem('jwtToken')
    const http = axios.create({
      headers: {'Authorization': 'Bearer '+token}
    })
    http.post(ip+"/api/kycRegistrySearch",req ,{ headers : {'Authorization': 'Bearer '+token} })
    .then(response => {
      dispatch(getResult(response.data))
       //console.log( response.data)
      // return response.data
    })
    .catch(error => {
      throw(error);
    });
  }; 
  
  export const getResult = result => {
    return {
      type: GET_KYC_REGISTRY,
      payload: result
    }
  };


// Get all userroles
 export const getUserRoles = () => dispatch => {
  const token = localStorage.getItem('jwtToken')
  const http = Axios.create({
    headers: {'Authorization': 'Bearer '+token}
  })
 http.get(ip+"/api/getAllUserRoles")
 .then(response => {
   dispatch(getAllUserRoles(response.data))
   // console.log( response.data)
   // return response.data
 })
 .catch(error => {
   throw(error);
 });
}; 

export const getAllUserRoles = roles => {
 // console.log("++++++++",users)
 return {
   type: GET_ALL_ROLES,
   payload: roles
 }
};

export const createRole = (userRole, history) => dispatch => {
  
  const token = localStorage.getItem('jwtToken')
  
  axios
    .post(ip+"/api/createUserRole", userRole,{ headers : {'Authorization': 'Bearer '+token} })
    .then()                             // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err||{}).response||{}).data || 'Error unexpected'})  
    );

   
};    

export const deleteRole = (deleteRole) => dispatch => {
  const token = localStorage.getItem('jwtToken')

  //console.log(acceptCredentials.uuid)
  const credentials = {
    role_name: deleteRole.role_name
  }
  
  console.log(credentials);
  
  axios
    .post(ip+"/api/deleteUserRole", credentials ,{ headers : {'Authorization': 'Bearer '+token} })
     .then(response => {
       alert(response.data)
     })                             // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: ((err||{}).response||{}).data || 'Error unexpected'}) 
    );
}
