import React,{Component} from 'react'
import {reduxForm } from "redux-form"
// import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'
import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react'
import {Form,Dropdown} from 'semantic-ui-react-form-validator'


class UploadDocuments extends Component{


  constructor(props) {
    super(props);

    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    this.djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png,application/pdf",
        autoProcessQueue: false
    };

    this.componentConfig = {
        iconFiletypes: ['.jpg','.png','pdf'],
        showFiletypeIcon: true,
        postUrl: '/uploadHandler'
    };

    this.dropzone = null;
}

handleFileAdded(file) {
    console.log(file);
}

handlePost() {
    this.dropzone.processQueue();
}



  render(){

    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
        init: dz => this.dropzone = dz,
        addedfile: this.handleFileAdded.bind(this)
    }

    const options=[
      {
        key: 'Adhaar',
        text: 'Adhaar',
        value: 'Adhaar'
       
      },
      {
        key: 'PANCard',
        text: 'PAN Card',
        value: 'PANCard'
       
      },
      {
        key: 'Passport',
        text: 'Passport',
        value: 'Passport'
       
      },
      {
        key: 'DrivingLicense',
        text: 'Driving License',
        value: 'DrivingLicense'
       
      }
    ];
   
    const options2=[
      {
        key: 'authority1',
        text: 'authority1',
        value: 'authority1'
       
      },
      {
        key: 'authority2',
        text: 'authority2',
        value: 'authority2'
       
      },
      {
        key: 'authority3',
        text: 'authority3',
        value: 'authority3'
       
      }
    ];
  return(

    <div>
      

    <Container>

      <Grid textAlign='left' style={{ height: '100vh' }} verticalAlign='middle'text style={{ marginLeft: '3em'}}>
      <Grid.Row>
       <Grid.Column style={{ maxWidth: 600}} >
        <Form size='large'>
        <Segment>     

         <Dropdown
          fluid
          selection 
          label="KYC Document Type"
          options={options}
          width={24} 
          />
          <Dropdown
           fluid
           selection
           label="Verifying Authority"
           options={options2}
           width={24} 
          />
       <DropzoneComponent config={config}
                 eventHandlers={eventHandlers} 
                 djsConfig={djsConfig} />
       <button onClick={this.handlePost.bind(this)}>Submit KYC Document</button>

       {/* <Dropdown
           fluid
           selection
          label="Choose KYC Type"
          options={options}
          width={24} 
          />
     <DropzoneComponent config={config}
        eventHandlers={eventHandlers} 
        djsConfig={djsConfig} />
      <button onClick={this.handlePost.bind(this)}>Upload</button> */}
        </Segment>
      </Form>
   </Grid.Column>
    </Grid.Row>
    </Grid>
    </Container>

  </div>
)
  }
}


export default reduxForm({
  form: 'uploadFile'
})(UploadDocuments)