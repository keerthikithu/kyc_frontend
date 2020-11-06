import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

// import { createHistory } from 'history/createBrowserHistory'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'
 import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser,logoutUser } from "./actions/user.actions";
import rootReducer from './reducers'

import LoginForm from "./components/LoginForm"
import RegistrationForm from "./components/RegistrationForm"
import CreateUserRole from './components/Roles/CreateUserRole'
import UpdateRoles from './components/Roles/UpdateRoles'
import PrivateRoute from "./private-route/PrivateRoute"
import Success from './components/Success'
// import UploadDocuments from './components/UploadDocuments'
import SideBar from './components/SideBar'
import UserProfile from './components/UserProfile'

import RolePrivilege from './components/Roles/RolePrivilege'
import UserRole from './components/Roles/UserRole'


const persistConfig = {
    key: 'root',
    storage
  }
    
  const client = axios.create({
    baseURL: 'http://localhost:8080/',
    responseType: 'json'
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, axiosMiddleware(client))
)
const persistor = persistStore(store)


const jwtToken = localStorage.getItem("jwtToken");

if (jwtToken !== null) {
    // Set auth token header auth
    try{
    const token = jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());    // Redirect to login
      window.location.href = "./sign-in";
    }
    }catch(error){console.log("invalid")};
    
  }



ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router>
         <Route exact path="/" component={LoginForm} />
         <Route path="/sign-in" component={LoginForm} />
         <Route path="/sign-up" component={RegistrationForm} />
         <Route path="/success"  component={Success} />
         <Route path="/user"  component={UserProfile} />

          {/* <Route path="/dashboard"  component={SideBar} />  */}

      
         <Route path="/role"  component={CreateUserRole} />
         <Route path="/updaterole"  component={UpdateRoles} />
         <Route path="/roleprivilege"  component={RolePrivilege} />
         <Route path="/userrole"  component={UserRole} />

         <Route/> 
         <Switch> 
             <PrivateRoute exact path="/dashboard"  component={SideBar} />
             </Switch>
      </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
