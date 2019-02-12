// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

//Components
import Pokerroom from '../pokerroom';
import Pokertype from '../pokertype';
import FileUpload from '../fileUpload';


class Rooms extends Component {

  state = {
    rooms: {},
    selectedRoom: '',
    gameType: '',
    photo: '',
  };

  setSelectedRoom = (selectedRoom) => {this.setState({selectedRoom})};
  setGameType = (gameType) => {this.setState({gameType})};
  setPhoto = (photo) => {this.setState({photo})};

  render() {
    const { selectedRoom, gameType } = this.state;
    const isReady = selectedRoom && gameType;

    return (
      <div className='rooms-wrapper'>
        <Pokerroom setSelectedRoom={this.setSelectedRoom}/>
        <Pokertype setGameType={this.setGameType}/>
        <FileUpload isReady={isReady} setPhoto={this.setPhoto}/>
        <div id='upload-wrapper'></div>
      </div>
    );
  }
}

export default Rooms;

