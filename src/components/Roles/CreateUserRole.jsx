import React, { Component } from 'react'
import { Button, Form, TextArea,Segment} from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { reduxForm } from "redux-form"
import { withRouter } from "react-router-dom"
import {createRole} from "../../actions/admin.actions"
class  CreateUserRole extends  Component{
  
    constructor(){
        super();
        this.state={
          roleName:'',
          displayValue:'',
          description:''
        }
    }

    onSubmit = e =>{
        e.preventDefault();
       const userRole ={
         roleName : this.state.roleName,
         displayValue : this.state.displayValue,
         description : this.state.description
       }
      console.log(userRole)
       this.props.createRole(userRole);
       window.location.reload(false);
    }
  render(){

    return(
        <Form ref="form" onSubmit={this.onSubmit}>
          <Segment placeholder>
        <Form.Group grouped>
       <Form.Field>
      <label>Role Name</label>
      <input placeholder='Role Name'
       name = 'roleName'
       onChange={(e)=>{this.setState({roleName:e.target.value})}} />
       </Form.Field>
        <Form.Field>
      <label>Display value</label>
      <input placeholder='Display value'
      name='displayValue'
      onChange={(e)=>{this.setState({displayValue:e.target.value})}} />
     </Form.Field>
     <Form.Field>
      <label>Description</label>
      <TextArea placeholder='Description'
       name = 'description'
      onChange={(e)=>{this.setState({description:e.target.value})}}  />
    </Form.Field>
    <Button primary>Create</Button>
  </Form.Group>
  </Segment>
  </Form>
);
}
}
CreateUserRole.propTypes = {
  createRole: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  roles: state.role,
  //auth: state.auth
});

CreateUserRole = connect(
  mapStateToProps,
  {createRole}
)(withRouter (CreateUserRole));

export default reduxForm({
  form: 'createRole' 
})(CreateUserRole)