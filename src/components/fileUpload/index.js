// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';


class FileUpload extends Component {

  state = {
    fileName: 'Upload table image',
    imgSrc: '',
  };

  fileSelectedHandler = event => {
    // check size
    let input = event.target;
    let el = document.getElementById('upload-wrapper');

    if (input.files[0] === undefined) return false;

    let img;
    let _URL = window.URL || window.webkitURL;

    img = new Image();
    img.src = _URL.createObjectURL(input.files[0]);
    if ((input.files[0])) {
      img.onload = () => {
        // alert(img.width);
        // alert(img.height);

        this.setState({
          fileName: '',
          imgSrc: '',
        });

        this.props.setPhoto(input.files[0]);
        this.setState({
          fileName: input.files[0].name,
          imgSrc: img.src,
        });
        el.style.backgroundImage = `url(${img.src})`;
        el.style.position = 'absolute';
        el.style.width = `${img.width}px`;
        el.style.height = `${img.height}px`;
        el.style.top = '50px';
        el.style.left = '10px';
      };
    }
  };

  render() {

    return (
        <div className='upload-wrapper'>
          <label
              id='upload-label'
              htmlFor='file-upload'
              className='custom-file-upload'
              style={this.props.isReady ? {display: 'block'} : {display: 'none'}}
          >
            {this.state.fileName}
          </label>
          <input
              id='file-upload'
              type='file'
              onChange={this.fileSelectedHandler}
              accept='.jpg, .jpeg, .png'
          />
        </div>
    );
  }
}

export default FileUpload;

