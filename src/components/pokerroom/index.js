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
          <option value="Pokerstars">Pokerstars</option>
          <option value="Partypoker">Partypoker</option>
          <option value="Winamax">Winamax</option>
        </select>
    );
  }
}

export default Pokerroom;

