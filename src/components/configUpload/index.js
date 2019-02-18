// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';


class ConfigUpload extends Component {

  state = {
    fileName: 'Upload config .txt',
    imgSrc: '',
  };

  fileSelectedHandler = event => {
    // check size
    let input = event.target;
    if (input.files[0] === undefined) return false;

      //console.log(input.files[0]);

      function readSingleFile() {
          //Retrieve the first (and only!) File from the FileList object
          var f = input.files[0];

          if (f) {
              var r = new FileReader();
              r.onload = function(e) {
                  var contents = e.target.result;
                  console.log(contents);
                  // alert(contents);
              };
              r.readAsText(f);
          } else {
              alert("Failed to load file");
          }
      }
      readSingleFile();
  };


  render() {

    return (
        <div className='upload-txt-wrapper'>
          <label
              id='upload-label'
              htmlFor='file-upload'
              className='custom-file-upload'
              style={true ? {display: 'block'} : {display: 'none'}}
          >
            {this.state.fileName}
          </label>
          <input
              id='file-upload'
              type='file'
              onChange={this.fileSelectedHandler}
              accept='.txt'
          />
        </div>
    );
  }
}

export default ConfigUpload;

