// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

class FileUpload extends Component {
  state = {
    fileName: 'Upload table image',
    imgSrc: '',
    imgWidth: 0,
    imgHeight: 0,
    is4k: '',
  };

  tablesCountHandler = (e) => {
    const value = e.currentTarget.value;

    this.props.setImageType(value);
    this.setState({
      is4k: value === '4k'
    })
  }

  regionTypeHandler = (e) => {
    const value = e.currentTarget.value;

    this.props.setImageType(value);
    this.setState({
      is4k: value === '4k'
    })
  }

  zoomHandler = (e) => {
    let el = document.getElementById('upload-wrapper');
    const value = e.currentTarget.value;

    el.style.width = `${img.width}px`;
    el.style.height = `${img.height}px`;
  }



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
        this.props.setPhoto(input.files[0].name);
        this.props.setWidth(img.width);
        this.props.setHeight(img.height);
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
    } else {
      this.setState({
        fileName: '',
        imgSrc: '',
      });
    }
  };

  loadDefaultPic = () => {
    let el = document.getElementById('upload-wrapper');
    let img = new Image();

    img.src = `img/${this.props.imgName}.png`;
    img.onload = () => {
      el.style.backgroundImage = `url(${img.src})`;
      el.style.position = 'absolute';
      el.style.width = `${img.width}px`;
      el.style.height = `${img.height}px`;
      el.style.top = '50px';
      el.style.left = '10px';

      this.props.setPhoto(`${this.props.imgName}.png`);
      this.props.setWidth(img.width);
      this.props.setHeight(img.height);
    };
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
          <button
              onClick={this.loadDefaultPic}
              style={this.props.isReady ? {display: 'block'} : {display: 'none'}}
          >Load default table img</button>
          <div onChange={this.regionTypeHandler}>
            <input type="radio" value="4k" name="imageType"/> 4k
            <input type="radio" value="table" name="imageType"/> table
          </div>
          <div onChange={this.tablesCountHandler}>
            <input type="radio" value="6" name="tablesCount"/> 6 tables
            <input type="radio" value="9" name="tablesCount"/> 9 tables
          </div>
        </div>
    );
  }
}

export default FileUpload;

