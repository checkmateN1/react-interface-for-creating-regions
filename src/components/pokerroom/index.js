// Core
import React, { Component } from 'react';


class Pokerroom extends Component {
  updateRoom = (e) => {
    const val = e.target.value;

    this.props.setSelectedRoom(val);
  };

  render() {
    return (
        <select
            name="room"
            id="select-room"
            defaultValue={0}
            onChange={this.updateRoom}
        >
          <option value="0" disabled hidden>Select room</option>
          <option value="1">Pokerstars</option>
          <option value="2">Patypoker</option>
          <option value="3">Winamax</option>
        </select>
    );
  }
}

export default Pokerroom;

