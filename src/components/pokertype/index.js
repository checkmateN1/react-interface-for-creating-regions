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
          <option value="Spin&Go">Spin&Go</option>
          <option value="Cash 6max">Cash 6max</option>
          <option value="Cash 9max">Cash 9max</option>
          <option value="HA">HA</option>
          <option value="MTT">MTT</option>
          <option value="Omaha">Omaha</option>
        </select>
    );
  }
}

export default Pokertype;

