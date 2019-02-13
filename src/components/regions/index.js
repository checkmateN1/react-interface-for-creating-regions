// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

class Regions extends Component {

  state = {
    list: [1,2,3,4,5,6,7,8,9],
    active: '',
  };

  setActive = (e) => {
    let el = e.target;
    let list = document.querySelectorAll('.players-list li');

    for(let i = 0; i < list.length; i++) {
      if (list[i] !== el) {
        list[i].classList.remove('active');
      }
    }

    el.classList.toggle('active');
    this.setState({active: el.classList.contains('active') ? el.id : ''})
  };

  render() {
    const { payersCount }= this.props;
    const playersList = this.state.list.map((el, index) => <li id={`Player_${index}`} onClick={this.setActive} key={index}>{`Player_${index}`}</li>).slice(0, payersCount);
    const tableList = this.state.list.map((el, index) => <li id={`Player_${index}`} onClick={this.setActive} key={index}>{`Player_${index}`}</li>).slice(0, payersCount);

    return (
      <>
        <ul className='players-list'>
          {playersList}
        </ul>
        <ul className='table-list'>
          <li id={'pot'}></li>
          <li id={'c1'}>Card_1</li>
          <li id={'c2'}>Card_2</li>
          <li id={'c3'}>Card_3</li>
          <li id={'c4'}>Card_4</li>
          <li id={'c5'}>Card_5</li>
          <li id={}></li>
        </ul>
      </>
    );
  }
}

export default Regions;

