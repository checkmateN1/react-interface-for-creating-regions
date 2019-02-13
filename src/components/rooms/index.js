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
        default:
          return 0;
      }
    this.setState({gameType})
  };
  setPhoto = (photo) => {this.setState({photo})};

  render() {
    const { selectedRoom, gameType, payersCount } = this.state;
    const isReady = selectedRoom && gameType;

    return (
      <>
        <div className='rooms-wrapper'>
          <Pokerroom setSelectedRoom={this.setSelectedRoom}/>
          <Pokertype setGameType={this.setGameType}/>
          <FileUpload
              isReady={isReady}
              setPhoto={this.setPhoto}
              imgName={selectedRoom + '_' + gameType}
          />
          <div id='upload-wrapper'></div>
        </div>
        <Regions payersCount={payersCount}/>
      </>
    );
  }
}

export default Rooms;

