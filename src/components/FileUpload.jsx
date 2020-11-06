import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'
export default class FileUpload extends React.Component {
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

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded.bind(this)
        }

        return (
            <div>
                <DropzoneComponent config={config}
                 eventHandlers={eventHandlers} 
                 djsConfig={djsConfig} />
                <button onClick={this.handlePost.bind(this)}>Upload</button>
            </div>
        );
    }
}