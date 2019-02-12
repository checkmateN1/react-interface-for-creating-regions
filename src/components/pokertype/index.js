// Core
import React, { Component } from 'react';


class Pokertype extends Component {

  updateGameType = (e) => {
    const val = e.target.value;

    this.props.setGameType(val);
  };

  render() {

    return (
        <select
            name="room"
            id="select-room"
            defaultValue={0}
            onChange={this.updateGameType}
        >
          <option value="0" disabled hidden>Select poker type</option>
          <option value="1">Spin&Go</option>
          <option value="2">Cash</option>
          <option value="3">HA</option>
          <option value="4">MTT</option>
        </select>
    );
  }
}

export default Pokertype;

