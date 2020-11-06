import React, { Component } from 'react'
import { Form,Input,Select,Button,Segment,Table,Divider,Grid,Checkbox,Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { reduxForm } from "redux-form"
import {registrySearch} from "../actions/admin.actions";
import PropTypes from "prop-types";


 class RegistrySearch  extends Component {

 
  constructor(props) {
    super(props);
  this.state={
  
         fullname:'',
         owners_Name:'',
         doc_type:'',
         verified_by:'',
         date_of_verification:'',
         status:''
     
  };

}

componentDidMount(){
  this.props.registrySearch();
}

onSubmit = e =>{
  e.preventDefault();
 const req = {
  name : this.state.fullname,
  doc_type : this.state.doc_type
 } 
 console.log(req);
 this.props.registrySearch(req);
}
  render() {

    const {result} = this.props;
    const data = result.result;

    const options=[
      {
        key: 'SelectDocumentType',
        text: 'Select Document Type',
        value: 'SelectDocumentType'
       
      },
      {
        key: 'Adhaar',
        text: 'Adhaar',
        value: 'Adhaar'
       
      },
      {
        key: 'PanCard',
        text: 'PanCard',
        value: 'PanCard'
       
      },
      {
        key: 'Passport',
        text: 'Passport',
        value: 'Passport'
       
      },
      {
        key: 'DrivingLicense',
        text: 'DrivingLicense',
        value: 'DrivingLicense'
       
      }  
    ];
   
    
    return (
      <Form  onSubmit={this.onSubmit}>  
     <Form.Group >
       <Segment size='large'>
     <Grid columns={2} relaxed='very'>
      <Grid.Column>
     <Form.Field
            control={Input}
            label='Full Name of Document Owner'
            name='fullname'
            placeholder='full name'
            onChange={(e)=>{this.setState({fullname:e.target.value})}}
            required 
          />
          </Grid.Column>
      <Grid.Column>   
      <Form.Field
        control={Select}  
        selection
        name = 'doc_type'
        options={options}
        value={this.state.doc_type} 
        onChange={(e,{value})=>{this.setState({doc_type:value})}}  
        label='Kyc Document Type'
       />  
       </Grid.Column>
       </Grid>
        <Divider vertical>Or</Divider>
        </Segment>
        </Form.Group>
        <Button>Search</Button>  



        <Segment placeholder size='large'>
        <Table celled  selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Owner's Name</Table.HeaderCell>
        <Table.HeaderCell>Document Type</Table.HeaderCell>
        <Table.HeaderCell>Verified By</Table.HeaderCell>
        <Table.HeaderCell>Date of Verification</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    {/* <Table.Body>
    {data.map((result, index) => (
      <Table.Row key={index}>
      <Table.Cell collapsing>
        <Checkbox slider />
        </Table.Cell>
        <Table.Cell>{result.owners_Name}</Table.Cell>
        <Table.Cell>{result.doc_Type}</Table.Cell>
        <Table.Cell>{result.verified_by}</Table.Cell>
        <Table.Cell>{result.date_of_verification}</Table.Cell>
        <Table.Cell>{result.status}</Table.Cell>
      </Table.Row>
       ))}
    </Table.Body> */}
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button
            floated='right'
            icon
            labelPosition='left'
            primary
            size='small'
          >
            <Icon name='paper plane' /> Request to View
          </Button>
          
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
    </Segment>
      </Form>
    )
  }
}
RegistrySearch.propTypes = {
  registrySearch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  result: state.result,
  auth: state.auth
});

RegistrySearch = connect(
  mapStateToProps,
  {registrySearch}
)(withRouter (RegistrySearch));

export default reduxForm({
  form: 'registrysearch' 
})(RegistrySearch)

