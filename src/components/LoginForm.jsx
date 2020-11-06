
import React, { Component } from 'react'
import { reduxForm } from "redux-form"
import { withRouter } from "react-router-dom";
import { Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/user.actions";
import {Form,Input} from 'semantic-ui-react-form-validator'


class LoginForm extends Component{

  onSubmit=()=>{
    alert("Submitted");
  }
  constructor(props) {
    super(props);
  this.state={
    email_id:'',
    password:'',
    errors: {}
  };

  // this.handleSubmit = this.handleSubmit.bind(this);
}


componentWillReceiveProps(nextProps) {
  if (nextProps.auth.isAuthenticated) {
    this.props.history.push("/dashboard");   // push user to dashboard when they login
  }if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}

componentDidMount() {
  // If logged in and user navigates to Login page, should redirect them to dashboard page
  if (this.props.auth.isAuthenticated) {
    this.props.history.push("/dashboard");
  }
  // else{
  //   alert("invalid user");
  // }
}

onSubmit = e => {

  ///e.persist();
  e.preventDefault();
 const loginCredentials = {
  email_id: this.state.email_id,
  password:this.state.password
};
  

this.props.loginUser(loginCredentials);
console.log(loginCredentials);
// alert("login successful..!");
}



  render(){ 
    
    const { errors } = this.state;
    return (  
   
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
       {<Image src='/KYC.jpg' />}LogIn
      </Header>
      <Form size='large' ref="form" onSubmit={this.onSubmit}>
        <Segment>
         
          <Input 
            fluid icon='user'
            iconPosition='left'
            name='email_id'
            placeholder='E-mail address'
            onChange={(e)=>{this.setState({email_id:e.target.value})}} 
            value={this.state.email_id}
            error={errors.email_id}
            validators={['required','isEmail']} 
            errorMessages={['this field is required']} 
            width={24} 
           />

          <Input
            fluid icon='lock'
            iconPosition='left'
            name='password'
            placeholder='Password'
            type='password'
            onChange={(e)=>{this.setState({password:e.target.value})}} 
            value={this.state.password}
            error={errors.password}
            validators={['required']} 
            errorMessages={['this field is required']} 
            width={24} 
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='http://localhost:3000/sign-up'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>)
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

LoginForm = connect(
  mapStateToProps,
  { loginUser }
)(withRouter (LoginForm));

export default reduxForm({
  form: 'userLogin' 
})(LoginForm)
