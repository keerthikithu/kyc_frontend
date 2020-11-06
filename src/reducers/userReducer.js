import {GET_ALL_USERS} from "../actions/types";
//import { object } from "prop-types";
  
  
  const initialState = {
       users: []
     };
  
  export default function user(state = initialState, action) {
    if(action.type === GET_ALL_USERS ){
      state = Object.assign({}, state, {
        users: action.payload
      });
    }
    // console.log(state);
    return state;
    
  }
  
  