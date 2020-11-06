import React, { Component } from 'react'
import { Form,Select,Button,Segment,Table,Checkbox} from 'semantic-ui-react'

export default class ViewRequest  extends Component {

  render() {
    const options=[
      {
        key: 'SelectDocumentType',
        text: 'Select Document Type',
        value: 'SelectDocumentType'
       
      },
      {
        key: 'Adhaar',
        text: 'Type1',
        value: 'Adhaar'
       
      },
      {
        key: 'PanCard',
        text: 'Type2',
        value: 'PanCard'
       
      }
    ];
   
    
    return (
      <Form>
     <Form.Group >
       {/* <Segment size='large'> */}
     {/* <Grid  relaxed='very'> */}
      {/* <Grid.Column> */}
     {/* <Form.Field
            control={Input}
            label='Full Name of Document Owner'
            name='dob'
            placeholder='full name'
            //onChange={(e)=>{this.setState({dob:e.target.value})}}
            required 
          /> */}
          {/* </Grid.Column> */}
      {/* <Grid.Column>    */}
      <Form.Field
        control={Select}
        options={options}
        label='Kyc Document Type'
        placeholder='Kyc Document Type'
       />  
       {/* </Grid.Column>
       </Grid> */}
        {/* <Divider vertical>Or</Divider> */}
        {/* </Segment> */}
        </Form.Group>
        <Button>Search</Button>  
        <Segment placeholder size='large'>
        <Table compact celled definition>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Registration Date</Table.HeaderCell>
        <Table.HeaderCell>E-mail address</Table.HeaderCell>
        <Table.HeaderCell>Demo Heading</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>January 11, 2014</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>May 11, 2014</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button
            floated='right'
            positive
            size='small'
          >
          Accept
          </Button>
          <Button
            floated='right'
            negative
            size='small'
          >
          Reject
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