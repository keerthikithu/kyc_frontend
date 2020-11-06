import {GET_KYC_REGISTRY} from "../actions/types";
//import { object } from "prop-types";
  
  
  const initialState = {
       result: []
     };
  
  export default function user(state = initialState, action) {
    if(action.type === GET_KYC_REGISTRY){
      state = Object.assign({}, state, {
        result: action.payload
      });
    }
     console.log(state);
    return state;
    
  }
  