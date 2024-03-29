// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

//Components
import Pokerroom from '../pokerroom';
import Pokertype from '../pokertype';
import FileUpload from '../fileUpload';
import Regions from '../regions';


class Rooms extends Component {
  state = {
    rooms: {},
    selectedRoom: '',
    gameType: '',
    payersCount: 0,
    photo: '',
    width: '',
    height: '',
    imageType: '',
    zoomX: 1,
    is4k: false,
    tableCount: '9',
    offsetZoomTop: 0,
    offsetZoomLeft: 0,
  };

  setSelectedRoom = (selectedRoom) => {this.setState({selectedRoom})};
  setGameType = (gameType) => {
      switch (gameType) {
        case 'Spin&Go':
          this.setState({ payersCount: 3 });
          break;
        case 'Cash 6max':
          this.setState({ payersCount: 6 });
          break;
        case 'Cash 9max':
          this.setState({ payersCount: 9 });
          break;
        case 'HA':
          this.setState({ payersCount: 2 });
          break;
        case 'MTT':
          this.setState({ payersCount: 6 });
          break;
        case 'Omaha':
          this.setState({ payersCount: 6 });
          break;
        default:
          return 0;
      }
    this.setState({gameType})
  };
  setPhoto = (photo) => {this.setState({photo})};
  setWidth = (width) => {this.setState({width})};
  setHeight = (height) => {this.setState({height})};
  setImageType = (imageType) => {this.setState({imageType})};
  setZoomX = (zoomX) => {this.setState({zoomX})};
  set4k = (is4k) => {this.setState({is4k})};
  setTablesCount = (tableCount) => {this.setState({tableCount})};
  setZoomOffsetTop = (offsetZoomTop) => {this.setState({offsetZoomTop})};
  setZoomOffsetLeft = (offsetZoomLeft) => {this.setState({offsetZoomLeft})};


  render() {
    const { selectedRoom, gameType, photo } = this.state;
    const isReady = selectedRoom && gameType;

    return (
      <>
        <div className='rooms-wrapper'>
          <Pokerroom setSelectedRoom={this.setSelectedRoom}/>
          <Pokertype setGameType={this.setGameType}/>
          <FileUpload
              isReady={isReady}
              setPhoto={this.setPhoto}
              setWidth={this.setWidth}
              setHeight={this.setHeight}
              setImageType={this.setImageType}
              setZoomX={this.setZoomX}
              setTablesCount={this.setTablesCount}
              setZoomOffsetTop={this.setZoomOffsetTop}
              setZoomOffsetLeft={this.setZoomOffsetLeft}
              imgName={selectedRoom + '_' + gameType}
              {...this.state}
          />
          <div id='upload-wrapper'>
            {isReady && photo ? <Regions {...this.state} /> : null}
          </div>
        </div>
      </>
    );
  }
}

export default Rooms;

