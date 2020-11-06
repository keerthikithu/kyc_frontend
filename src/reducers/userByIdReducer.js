import {GET_USER_BY_ID} from "../actions/types";
//import { object } from "prop-types";
  
  
  const initialState = { 
       user: {}
     };
  
  export default function user(state = initialState, action) {
    if(action.type == GET_USER_BY_ID){
      state = Object.assign({}, state, {
        user: action.payload
      });
    }
    // console.log(state);
    return state;
    
  }