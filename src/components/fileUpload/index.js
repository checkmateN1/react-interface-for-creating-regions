// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import './style.scss';

class FileUpload extends Component {
  state = {
    fileName: 'Upload table image',
    imgSrc: '',
  };

  tablesCountHandler = (e) => {
    const value = e.target.value;

    console.log(value);
    this.props.setTablesCount(value);
  }

  regionTypeHandler = (e) => {
    const value = e.target.value;

    console.log(value);

    this.props.setImageType(value);

    console.log(value === '4k' ? '4k' : 'table');
  }

  zoomHandler = (e) => {
    const el = document.getElementById('upload-wrapper');
    const value = e.target.value;

    let zoomX = this.props.zoomX;

    if (value === '+') {
      console.log('zoom+')
      zoomX *= 2;
    } else {
      zoomX /= 2;
    }

    this.props.setZoomX(zoomX);

    el.style.backgroundSize = `${100 * zoomX}%`
    // el.style.backgroundPositionX = `${img.width}px`;
    // el.style.backgroundPositionY = `${img.height}px`;
    // el.style.width = `${this.props.width * zoomX}px`;
    // el.style.height = `${this.props.height * zoomX}px`;
  }

  zoomNavigation = (e) => {
    const el = document.getElementById('upload-wrapper');
    const value = e.target.value;
    const isShift = e.shiftKey;

    let { offsetZoomTop, offsetZoomLeft, zoomX, setZoomOffsetTop, setZoomOffsetLeft } = this.props;


    if (value === 'top') {
      console.log('top+');
      const offset = offsetZoomTop + (isShift ? 20 : 1);
      el.style.backgroundPositionY = `${offset}px`;
      setZoomOffsetTop(offset);
    } else if (value === 'left') {
      console.log('left+');
      const offset = offsetZoomLeft + (isShift ? 20 : 1);
      el.style.backgroundPositionX = `${offset}px`;
      setZoomOffsetLeft(offset)
    } else if (value === 'right') {
      console.log('bottom+');
      const offset = offsetZoomLeft - (isShift ? 20 : 1);
      el.style.backgroundPositionX = `${offset}px`;
      setZoomOffsetLeft(offset);
    } else if (value === 'bottom') {
      console.log('bottom+');
      const offset = offsetZoomTop - (isShift ? 20 : 1);
      el.style.backgroundPositionY = `${offset}px`;
      setZoomOffsetTop(offset);
    }

    // this.props.setZoomX(zoomX);
    // el.style.backgroundSize = `${100 * zoomX}%`
    // el.style.backgroundPositionX = `${img.width}px`;
    // el.style.backgroundPositionY = `${img.height}px`;
    // el.style.width = `${this.props.width * zoomX}px`;
    // el.style.height = `${this.props.height * zoomX}px`;
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
    const zoomX = this.props.zoomX;
    const is4k = this.props.is4k;
    const tableCount = this.props.tableCount;

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
            <input type="radio" value="4k" name="imageType" defaultChecked={is4k}/> 4k
            <input type="radio" value="table" name="imageType" defaultChecked={!is4k}/> table
          </div>
          {/*<div onChange={this.tablesCountHandler}>*/}
          {/*  <input type="radio" value="6" name="tablesCount" defaultChecked={tableCount === '6'}/> 6 tables*/}
          {/*  <input type="radio" value="9" name="tablesCount" defaultChecked={tableCount === '9'}/> 9 tables*/}
          {/*</div>*/}
          <div onClick={this.zoomHandler}>
            <label htmlFor="zoom">{zoomX + 'x'}</label>
            <input type='button' className='zoomPlus' value="+" name="zoom"/>
            <input type='button' className='zoomMinus' value="-" name="zoom"/>
            <label htmlFor="zoom">zoom</label>
          </div>
          <div onClick={this.zoomNavigation}>
            <label htmlFor="zoomNavigation">{}</label>
            <input type='button' className='zoomNavigation' value="top" name="zoomNavigation"/>
            <input type='button' className='zoomNavigation' value="left" name="zoomNavigation"/>
            <input type='button' className='zoomNavigation' value="right" name="zoomNavigation"/>
            <input type='button' className='zoomNavigation' value="bottom" name="zoomNavigation"/>
            <label htmlFor="zoom">zoom</label>
          </div>
        </div>
    );
  }
}

FileUpload.propTypes = {
  setPhoto: PropTypes.func,
  setWidth: PropTypes.func,
  setHeight: PropTypes.func,
  setImageType: PropTypes.func,
  setZoomX: PropTypes.func,
  setTablesCount: PropTypes.func,
  setZoomOffsetTop: PropTypes.func,
  setZoomOffsetLeft: PropTypes.func,
};

export default FileUpload;

