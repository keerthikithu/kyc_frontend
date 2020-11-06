import React,{Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { reduxForm } from "redux-form"
import {
  Button,
  Card,
  Image,
  Grid,
  Form,
  Header
  } from 'semantic-ui-react'

  import { getAllUser, acceptUser } from "../actions/user.actions";
  import PropTypes from "prop-types";


  class UserList extends Component{
    
    constructor(props) {
      super(props);
      this.state={
        uuid:'',
        user_action:'',
        errors: {}
      };
      
      console.log(this.props)
  }

    async componentDidMount() {

      await this.props.getAllUser();
     console.log(this.props.getAllUser());
     const {users} = this.props;
   
     }
    //  accepthandle = (event) => {
    //   event.preventDefault();
    //   const acceptCredentials = {
    //     uuid:this.state.uuid,
    //     user_action: 1
    //   }
    //   this.props.acceptUser(acceptCredentials);
    //   console.log("acceptCredentials",acceptCredentials)
    //  }

    render(){
      
      const {users} = this.props;
      
      const data =users.users;
      
      return(
        <div>
        <Form size='large' ref="form" >   
  <Grid>
    <Grid.Row>
    <Grid.Column columns='two' divided>
      <Header as='h2' color='purple' textAlign='left' text style={{ marginTop: '1em',marginLeft:'2em',marginRight:'2em' }} fluid>
            Registered Users</Header>
    <Card.Group text style={{ marginLeft: '4em' }}>
    {data.map((user, index) =>
      <Card>
        <Card.Content>
        <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/wireframe/image.png' 
          />
      <Card.Header>{user.full_Name}</Card.Header>
        <Card.Meta>{user.user_Type}</Card.Meta>
          <Card.Description> { withRouter } 
         {user.contact_Number}<br/><strong> {user.email_id}</strong>
          </Card.Description>
           </Card.Content>
          <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' type="submit" onClick={()=>this.props.acceptUser({"uuid":user.uuid,"user_action":1})} >
              Accept
            </Button>
            <Button basic color='red'type="submit" onClick={()=>this.props.acceptUser({"uuid":user.uuid,"user_action":2})} >
              Reject
            </Button>
          </div>
        </Card.Content>
      </Card> )}
    </Card.Group>
    </Grid.Column>
    </Grid.Row>
    </Grid>
    </Form> 
  </div>
)
  }
}

UserList.propTypes = {
  getAllUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.user,
  auth: state.auth
});

UserList = connect(
  mapStateToProps,
  {getAllUser, acceptUser}
)(withRouter (UserList));

export default reduxForm({
  form: 'listusers' 
})(UserList)

