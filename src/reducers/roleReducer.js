import {GET_ALL_ROLES} from "../actions/types";
//import { object } from "prop-types";
  
  
  const initialState = {
       roles: []
     };
  
  export default function role(state = initialState, action) {
    if(action.type === GET_ALL_ROLES ){
      state = Object.assign({}, state, {
        roles: action.payload
      });
    }
    // console.log(state);
    return state;
    
  }