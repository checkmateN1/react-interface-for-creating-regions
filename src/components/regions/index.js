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

    if (el.parentNode.classList.contains('regions-menu')) {
        let list = document.querySelectorAll('.regions-menu li');
        let listAll = document.querySelectorAll('.all-regions ul:not(:first-child) li');

        for(let i = 0; i < list.length; i++) {
            if (list[i] !== el) {
                list[i].classList.remove('active');
            }
        }

        el.classList.add('active');

        for(let i = 0; i < listAll.length; i++) {
          listAll[i].classList.remove('active');
        }

        switch (el.innerText) {
          case 'Players':
            document.querySelector('.players-list').style.display = 'block';
            document.querySelector('.table-list').style.display = 'none';
            document.querySelector('.buttons-list').style.display = 'none';
            break;
          case 'Table':
            document.querySelector('.players-list').style.display = 'none';
            document.querySelector('.table-list').style.display = 'block';
            document.querySelector('.buttons-list').style.display = 'none';
            break;
          case 'Buttons':
            document.querySelector('.players-list').style.display = 'none';
            document.querySelector('.table-list').style.display = 'none';
            document.querySelector('.buttons-list').style.display = 'block';
            break;
          default:
            break;
      }
      return false;
    }

    let list = document.querySelectorAll('.all-regions ul:not(:first-child) li');

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
    const playersList = this.state.list.map((el, index) => <li id={`Player_${index}`} key={index}>{`Player_${index}`}</li>).slice(0, payersCount);

    return (
      <div className='all-regions' onClick={this.setActive}>
        <ul className='regions-menu'>
          <li className='active'>Players</li>
          <li>Table</li>
          <li>Buttons</li>
        </ul>
        <ul className='players-list'>
          {playersList}
        </ul>
        <ul className='table-list' style={{display: 'none'}}>
          <li id={'pot'}>Pot</li>
          <li id={'Card_1'}>Card_1</li>
          <li id={'Card_2'}>Card_2</li>
          <li id={'Card_3'}>Card_3</li>
          <li id={'Card_4'}>Card_4</li>
          <li id={'Card_5'}>Card_5</li>
        </ul>
        <ul className='buttons-list' style={{display: 'none'}}>
            <li id={'pot'}>isFold</li>
            <li id={'Card_1'}>isCheck</li>
            <li id={'Card_2'}>isCall</li>
            <li id={'Card_3'}>isRaise</li>
            <li id={'Card_4'}>isBet</li>
        </ul>
      </div>
    );
  }
}

export default Regions;

