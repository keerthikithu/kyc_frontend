import React, { Component } from 'react'
import {
  Button,
  Form,
  Input,
  Radio,
  TextArea,
  Header
} from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { reduxForm } from "redux-form"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { userInfo,getUserById } from "../actions/user.actions";


class UserProfile extends Component {
  state = {}
  constructor(props) {
    super(props);
  this.state={
    uuid:'',
    full_name: '',
    second_number : '',
    dob : '',
    addr_type : '',
    addr_line1 : '',
    addr_line2 : '',
    city : '',
    state : '', 
    country : '',
    pin : ''
         // errors: {}
  };
 // this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    const user = this.props.auth;
    console.log(user);
    //const Full ={ uid: user.user.uu_id} 
   // await this.props.getUserById(id);
    //console.log(this.props.getUserById(id))
  }

  onSubmit = text => e => {
    e.preventDefault();
  
    const user= this.props.auth;
    const FullName = text;
   // console.log(FullName)

    //validations
  const re1 = /^[0-9\b]+$/;        //regular expn for only numbers
  const re2 = /^[0]?[789]\d{9}$/;  // regular expn for indian phone number
  const re3 = /^[1-9][0-9]{5}$/;   // regular expn for pincode
 const re4 = /^[a-zA-Z]{2,20}$/;       // regular expn for only letters
  
  if (re1.test(this.state.second_number)===false){
    alert("letters are not allowed in secondary contact");
  }
 else if(re2.test(this.state.second_number)===false){
   alert("please enter a valid mobile number");
  }
 else if(re3.test(this.state.pin)===false){
   alert("pincode is invalid ");
  }
 else if(re1.test(this.state.pin)===false){
  alert("letters are not allowed in pincode");
  }
 else if(re4.test(this.state.city)===false){
  alert("invalid city name");
  }
 else if(re4.test(this.state.state)===false){
  alert("invalid state name");
 }
 else if(re4.test(this.state.country)===false){
  alert("invalid country name");
 }
 else{

    const userData = {
  
      uid:user.user.uu_id,
      full_name: FullName,
      secondary_number : this.state.second_number,
      date_of_birth : this.state.dob,
      addr_type : this.state.value,
      addr_line1 : this.state.addr_line1,
      addr_line2 : this.state.addr_line2,
      city : this.state.city,
      state : this.state.state, 
      country : this.state.country,
      pincode : this.state.pin
  
    };
    
    console.log(userData);
    this.props.userInfo(userData, this.props.history); 
    alert("successfully updated the details");
    window.location.href="http://localhost:3000/dashboard"
  } 
  }
  handleChange = (e, { value }) => this.setState({ value })


 
  render() {
    const { value } = this.state;
    const user = this.props.auth;
    const data = user.user.full_name;
     //const data = user.user;
     console.log(data)
    return (
     
      <Form size='small' ref="form" onSubmit={this.onSubmit(data)}>
         <Header>
        <h1>Profile Details</h1>
      </Header>
        {/* <Form.Group widths='equal'> */}
          <Form.Field
             //icon ='user'
            control={Input}
            label='Full Name'
            name='full_name'
            value={data}    
            placeholder='Full name'
            readOnly={true}
          />
       
        <Form.Field
            control={Input}
          //  icon ='mobile'
            label='Secondary Contact'
            name='second_number'
            placeholder='+91-xxxxxx'
            onChange={(e)=>{this.setState({second_number:e.target.value})}}
            required 
          />
           <Form.Field
            control={Input}
             type= 'Date'
            label='Date of Birth'
            name='dob'
            placeholder='dob'
            onChange={(e)=>{this.setState({dob:e.target.value})}}
            required 
          />
        <Form.Group inline>
          <label>Address Type</label>
          <Form.Field
            control={Radio}
            name='address_type'
            label='Permanent Address'
            value='permanent'
            checked={value === 'permanent'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            name='address_type'
            label='Current Address'
            value='temporary'
            checked={value === 'temporary'}
            onChange={this.handleChange}
          />
         
        </Form.Group>
        <Form.Group widths='equal'>
         <Form.Field
          control={TextArea}
          label='Address Line1'
          name='addr_line1'
          placeholder='Address Line1'
          onChange={(e)=>{this.setState({addr_line1:e.target.value})}}
          required
        />
        <Form.Field
          control={TextArea}
          label='Address Line2'
          name='addr_line2'
          placeholder='Address Line2'
          onChange={(e)=>{this.setState({addr_line2:e.target.value})}}
          required 
        /> 
         </Form.Group>
         <Form.Group widths='equal'>
         <Form.Field
          control={Input}
          label='City'
          name='city'
          placeholder='city'
          onChange={(e)=>{this.setState({city:e.target.value})}}
          required 
        />
        <Form.Field
          control={Input}
          label='State'
          name='state'
          placeholder='state'
          onChange={(e)=>{this.setState({state:e.target.value})}}
          required 
        /> 
         <Form.Field
          control={Input}
          label='Country'
          name='country'
          placeholder='country'
          onChange={(e)=>{this.setState({country:e.target.value})}} 
          required
        />
         </Form.Group>
         <Form.Field
          control={Input}
          label='Pin Code'
          name='pin'
          placeholder='00-00-00'
          onChange={(e)=>{this.setState({pin:e.target.value})}} 
          required
        />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}

UserProfile.propTypes = {
  getUserById: PropTypes.func.isRequired,
  userInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
   //errors: state.errors
});

UserProfile = connect(
  mapStateToProps,
  { userInfo,getUserById }
)(withRouter (UserProfile));

export default reduxForm({
  form: 'userprofile' 
})(UserProfile)
//export default UserProfile
