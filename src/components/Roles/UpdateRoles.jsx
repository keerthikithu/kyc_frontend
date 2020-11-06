import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import {getUserRoles,deleteRole} from "../../actions/admin.actions"
import { reduxForm } from "redux-form"
import {Form, Table,Header,Button, TableCell,Segment} from 'semantic-ui-react'

class  UpdateRoles extends  Component{
  
    constructor(){
        super();
        this.state={
          role_Name:'',
          display_Value:'',
          description:''
        }
    }

    componentDidMount(){
      this.props.getUserRoles();
    }

  render(){
       const {roles} = this.props;
       const data = roles.roles;
        //console.log(roles);
    return (
      <Form size='large' ref="form" >  
  <Segment placeholder>
    <Header color="green">UPDATE ROLES</Header>
  <Table basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ROLE NAME</Table.HeaderCell>
        <Table.HeaderCell>DISPLAY VALUE</Table.HeaderCell>
        <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>  
        <Table.HeaderCell>ACTIONS</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {data.map((role, index) => (
    <Table.Row key={index}>
        <Table.Cell>
          <Header>
        <Header.Content>
        {role.role_Name}
      </Header.Content>
      </Header>
        </Table.Cell>
        <Table.Cell>{role.display_Value}</Table.Cell>
        <Table.Cell>{role.description}</Table.Cell>
        <Table.Cell>
          <Button primary>Update</Button>
        </Table.Cell>
        <Table.Cell>
          <Button negative  onClick={()=>this.props.deleteRole({"role_name":role.role_Name})}>Delete</Button>
        </Table.Cell>
    </Table.Row>
     ))}
      </Table.Body>
    </Table>
    </Segment>
        </Form>);
}
}

UpdateRoles.propTypes = {
  getUserRoles: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  roles: state.role,
  //auth: state.auth
});

UpdateRoles = connect(
  mapStateToProps,
  {getUserRoles,deleteRole}
)(withRouter (UpdateRoles));

export default reduxForm({
  form: 'roleupdate' 
})(UpdateRoles)