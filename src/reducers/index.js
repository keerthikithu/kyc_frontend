import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import  authReducer  from './authReducer';
import errorReducer  from './errorReducer';
import userReducer from './userReducer';
// import alertReducer from './alertReducer';
import adminReducer from'./adminReducer';
import roleReducer from './roleReducer';
export default combineReducers({
    // app: app,
    form: formReducer,
    auth : authReducer,
    error : errorReducer,
    user : userReducer,
    result : adminReducer,
    role : roleReducer,
})

