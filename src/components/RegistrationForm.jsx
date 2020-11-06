import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import { reduxForm } from "redux-form"
import { Grid, Header,Segment,Button,Checkbox} from "semantic-ui-react"
import {Form,Input,Dropdown} from 'semantic-ui-react-form-validator'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { registerUser } from "../actions/user.actions";
import classnames from "classnames";


class RegistrationForm extends Component{

 
  constructor(props) {
    super(props);
  this.state={
  
         full_name:'',
         email_id:'',
         contact_number:'',
         user_type:'',
         password:'',
         verifyPassword:'',
          errors: {}
  };

  // this.handleSubmit = this.handleSubmit.bind(this);
}

componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}

onSubmit = e => {
  e.preventDefault();

  var regex = /^[a-zA-Z ]{2,30}$/;
  var regex2=/^[0]?[789]\d{9}$/;
  var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if(regex.test(this.state.full_name)==false){
    alert("numbers are not allowed in full name");
  }
  else if(regex2.test(this.state.contact_number)==false){
    alert("invalid phone number");
  }
  else if(pattern.test(this.state.email)==false){
    alert("email id is not valid");
  }
  else if(this.state.checked==false){
    console.log("unchecked");
    alert("you are not agreed to the terms and conditions");
  }
  else {
  const newUser = {

    email_id: this.state.email,
    full_name:this.state.full_name,
    contact_number:this.state.contact_number,
    password:this.state.password,
    user_type:this.state.dropdown

  };
  this.props.registerUser(newUser, this.props.history); 
  console.log(newUser);
 }
}
handleCheck = () => this.setState({ checked: !this.state.checked })

  render(){  
    const { errors } = this.state;

    return (  
     
    // <form>
    <Grid  style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column textAlign='centered' style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
       SignUp
      </Header>
      <Form size='large' ref="form" onSubmit={this.onSubmit} >
        <Segment>

        <Input 
            fluid 
            label='Full Name'
            name='full_name'
            placeholder=''
            onChange={(e)=>{this.setState({full_name:e.target.value})}} 
            value={this.state.full_name}
            error={errors.full_name}
            validators={['required']} 
            errorMessages={['this field is required']} 
            width={24} 
           />

         <Input 
            fluid icon='user'
            iconPosition='left'
            label='Email'
            name='email_id'
            placeholder='abc@xyz.com'
            onChange={(e)=>{this.setState({email:e.target.value})}} 
            value={this.state.email}
            error={errors.email}
            validators={['required','isEmail']} 
            errorMessages={['this field is required']} 
            width={24} 
           />

           <Input 
            fluid icon='mobile'
            iconPosition='left'
            label='Contact Number'
            name='contact_number'
            placeholder=''
            onChange={(e)=>{this.setState({contact_number:e.target.value})}} 
            value={this.state.contact_number}
            error={errors.contact_number}
            validators={['required']} 
            errorMessages={['this field is required']} 
            width={24} 
           />
  

       <Dropdown
           fluid
           selection
           label="User Type"
           name="user_type"
           options={[
            { key: "IndividualUser", text: "Individual User", value: "IndividualUser" },
            { key: "VerifyingAuthority", text: "Verifying Authority", value: "verifyingAuthority"},
            { key: "Stakeholder", text: "KYC Stakeholder", value: "KYC Stakeholder"}
          ]}
          onChange={(e,{value})=>{this.setState({dropdown:value})}} 
          value={this.state.dropdown}  
          error={errors.dropdown}
          validators={['required']} 
          errorMessages={['You must select one option']}
           width={24} 
          />

          <Input
            fluid icon='lock'
            iconPosition='left'
            label='Password'
            name='password'
            placeholder='Password'
            type='password'
            onChange={(e)=>{this.setState({password:e.target.value})}} 
            value={this.state.password}
            error={errors.password}
            validators={['required']} 
            errorMessages={['this field is required']} 
            className={classnames("", {
              invalid: errors.password
             })}
            width={24} 
          />

          <Input
            fluid icon='lock'
            iconPosition='left'
            label='Verify Password'
            name='verify_password'
            placeholder='Password'
            type='password'
            onChange={(e)=>{this.setState({verifyPassword:e.target.value})}} 
            value={this.state.password}
            error={errors.verify_password}
            validators={['required']} 
            errorMessages={['this field is required']} 
            className={classnames("", {
              invalid: errors.verify
            })}
            width={24} 
          />

        <Checkbox
          label="I agree to the Terms and Conditions"
          name="checkbox"
         onChange={this.handleCheck}
         defaultChecked={this.state.checked}
          />
          <br/><br/>
          <Button color='teal' fluid>
            Submit
          </Button>
        </Segment>
      </Form>
      
    </Grid.Column>
  </Grid>
  // </form>
)
  }
}

RegistrationForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
   errors: state.errors
});

RegistrationForm = connect(
  mapStateToProps,
  { registerUser }
)(withRouter (RegistrationForm));

export default reduxForm({
  form: 'userRegistration' 
})(RegistrationForm)
