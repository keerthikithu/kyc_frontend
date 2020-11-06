import React, { Component } from 'react'
import { Button, Form, Select, Segment} from 'semantic-ui-react'

class  RolePrivilege  extends  Component{
  
    constructor(){
        super();
        this.state={
          roleName:'',
          privilegeName:''
        }
    }

    onSubmit = e =>{
        e.preventDefault();
       const privilege ={
         roleName : this.state.roleName,
         privilegeName : this.state.privilegeName,
         
       }
       alert(JSON.stringify(privilege))
    }
   
  render(){
    const roles = [
        { key: 'af', value: 'Team Head', text: 'Team Head' },
        { key: 'ax', value: 'Manager', text: 'Manager' },
        { key: 'al', value: 'Admin', text: 'Admin' },
        { key: 'dz', value: 'Organisation', text: 'Organisation'}
       ]
    return(
        <Form ref="form" onSubmit={this.onSubmit}>
             <Segment placeholder>
        <Form.Group grouped>
       <Form.Field>
      <label>Role Name</label>
      <Select placeholder='Select role' options={roles} />
       </Form.Field>
        <Form.Field>
      <label>Privilege Name</label>
      <input placeholder='Privilege Name'
      name='privilegeName'
      onChange={(e)=>{this.setState({privilegeName:e.target.value})}} />
     </Form.Field>
    <Button primary>Link</Button>
  </Form.Group>
  </Segment>
  </Form>
);
}
}
export default RolePrivilege