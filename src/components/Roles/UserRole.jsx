import React, { Component } from 'react'
import { Button, Form, Select, Segment} from 'semantic-ui-react'

class  UserRole  extends  Component{
  
    constructor(){
        super();
        this.state={
          roleName:'',
          userName:''
        }
    }

    onSubmit = e =>{
        e.preventDefault();
       const userrole ={
         roleName : this.state.roleName,
         userName : this.state.userName,
         
       }
       alert(JSON.stringify(userrole))
    }
   
  render(){
    const roles = [
        { key: 'af', value: 'Team Head', text: 'Team Head' },
        { key: 'ax', value: 'Manager', text: 'Manager' },
        { key: 'al', value: 'Admin', text: 'Admin' },
        { key: 'dz', value: 'Organisation', text: 'Organisation'}
       ]
       const users = [
        { key: 'af', value: 'Mithun', text: 'Mithun' },
        { key: 'ax', value: 'Anila', text: 'Anila' }
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
      <label>User Name</label>
      <Select placeholder='Select User' options={users} />
     </Form.Field>
    <Button primary>Assign</Button>
  </Form.Group>
  </Segment>
  </Form>
);
}
}
export default UserRole