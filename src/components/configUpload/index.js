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
    let input = event.target;
    const { loadConfig } = this.props;

    if (input.files[0] === undefined) return false;
    let f = input.files[0];

    if (f) {
      let r = new FileReader();
      r.onload = function(e) {
        let contents = e.target.result;
        loadConfig(JSON.parse(contents));
      };
      r.readAsText(f);
      this.setState({ fileName: input.files[0].name });

    } else {
      alert("Failed to load file");
    }
  };


  render() {
    return (
      <div className='upload-txt-wrapper'>
        <label
          id='upload-txt-label'
          htmlFor='file-text-upload'
          className='custom-file-upload'
          style={true ? {display: 'block'} : {display: 'none'}}
        >
          {this.state.fileName}
        </label>
        <input
          id='file-text-upload'
          type='file'
          onChange={this.fileSelectedHandler}
          accept='.txt'
        />
      </div>
    );
  }
}

export default ConfigUpload;

