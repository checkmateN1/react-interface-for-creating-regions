// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

class Regions extends Component {

  state = {
    list: [1,2,3,4,5,6,7,8,9],
    active: '',
    activeRegion: '',
    regions: {},
    wasCreated: false,
  };

  static getDerivedStateFromProps(nextProps, prevState){
    const { photo, gameType, selectedRoom, payersCount, width, height } = nextProps;
    let { regions, wasCreated } = prevState;

    if (!wasCreated && width > 0 && height > 0) {
      if (photo && gameType && selectedRoom) {
        regions[selectedRoom] = {};
        regions[selectedRoom][gameType] = {};
        regions[selectedRoom][gameType]['width'] = width;
        regions[selectedRoom][gameType]['height'] = height;
        regions[selectedRoom][gameType]['regions'] = {};

        let reg = {};

        reg['width'] = 0;
        reg['height'] = 0;
        reg['top'] = 0;
        reg['left'] = 0;
        reg['recognitionType'] = null;
        reg['responseType'] = null;

        let obj = {};

        // players
        for(let i = 0; i < payersCount; i++) {
          obj[`Player${i}_balance`] = Object.create(reg);
          obj[`Player${i}_name`] = Object.create(reg);
          obj[`Player${i}_isActive`] = Object.create(reg);
          obj[`Player${i}_isDealer`] = Object.create(reg);
          obj[`Player${i}_bet`] = Object.create(reg);
          obj[`Player${i}_hole1`] = Object.create(reg);
          obj[`Player${i}_hole2`] = Object.create(reg);
        }

        //table
        obj['Pot'] = Object.create(reg);
        obj['Card1'] = Object.create(reg);
        obj['Card2'] = Object.create(reg);
        obj['Card3'] = Object.create(reg);
        obj['Card4'] = Object.create(reg);
        obj['Card5'] = Object.create(reg);

        //buttons
        obj['isBet'] = Object.create(reg);
        obj['isRaise'] = Object.create(reg);
        obj['isCall'] = Object.create(reg);
        obj['isCheck'] = Object.create(reg);
        obj['isFold'] = Object.create(reg);

        regions[selectedRoom][gameType]['regions'] = obj;
      }

      return { regions, wasCreated: true };
    }
    return null;
  }

  setActive = (e) => {
    let el = e.target;

    if (el.classList.contains('recognitionType') || el.parentNode.classList.contains('recognitionType')) {
      return false;
    }

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
        this.setState({active: ''});

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

    if (!el.parentNode.classList.contains('regions')) {
      for(let i = 0; i < list.length; i++) {
        if (list[i] !== el) {
          list[i].classList.remove('active');
        }
      }
      el.classList.toggle('active');
      this.setState({active: el.classList.contains('active') ? el.id : ''});
      this.setState({activeRegion : ''});
    } else {
      let regions = document.querySelectorAll('.all-regions ul.regions li');
      for(let i = 0; i < regions.length; i++) {
        if (regions[i] !== el) {
          regions[i].classList.remove('active');
        }
      }
      el.classList.toggle('active');
      if (el.classList.contains('active')) {
        this.setState({activeRegion : el.id});
      } else {this.setState({activeRegion : ''})}
      this.setRegionType(el.id);
    }
  };

  updateRecognizion = () => {

  };

  setRegionType = (id) => {
    const { regions, active } = this.state;
    const { payersCount, selectedRoom, gameType }= this.props;
    let el = document.getElementById(id);

    //regions[selectedRoom][gameType]['regions'][id]['recognitionType'] = 'string';


    //el.appendChild(select);

    console.log(id);
    console.log(regions[selectedRoom][gameType]['regions'][id]['recognitionType']);
  };


  render() {
    const { regions, active } = this.state;
    const { payersCount, selectedRoom, gameType }= this.props;
    const playersList = this.state.list
                          .map((el, index) => <li id={`Player${index}`} key={index}>{`Player${index}`}</li>)
                          .slice(0, payersCount);
    const playerRegions = regions.hasOwnProperty(selectedRoom) &&
                          regions[selectedRoom].hasOwnProperty(gameType) &&
                          regions[selectedRoom][gameType].hasOwnProperty('regions') &&
                          active ?
                          Object.keys(regions[selectedRoom][gameType]['regions'])
                              .filter(key => key.match(new RegExp(active, 'i')) && key.match(/player/i))
                              .map((el, index) => <li id={el} key={index}>{el}</li>) : null;

    const selectRecognition = <select
                              name="recognitionType"
                              className="recognitionType"
                              defaultValue={0}
                              onChange={this.updateRecognizion}
                              >
                                <option value="0" disabled hidden>Select recognition type</option>
                                <option value="string">string</option>
                                <option value="money">money</option>
                                <option value="number">number</option>
                                <option value="suit">suit</option>
                                <option value="active">active</option>
                                <option value="dealer">dealer</option>
                              </select>;

    return (
      <div className='all-regions' onClick={this.setActive}>
        {selectRecognition}
        <ul className='regions-menu'>
          <li className='active'>Players</li>
          <li>Table</li>
          <li>Buttons</li>
        </ul>
        <ul className='players-list'>
          {playersList}
        </ul>
        <ul className='playerRegions regions'>
          {playerRegions}
        </ul>
        <ul className='table-list regions' style={{display: 'none'}}>
          <li id={'Pot'}>Pot</li>
          <li id={'Card1'}>Card1</li>
          <li id={'Card2'}>Card2</li>
          <li id={'Card3'}>Card3</li>
          <li id={'Card4'}>Card4</li>
          <li id={'Card5'}>Card5</li>
        </ul>
        <ul className='buttons-list regions' style={{display: 'none'}}>
            <li id={'isFold'}>isFold</li>
            <li id={'isCheck'}>isCheck</li>
            <li id={'isCall'}>isCall</li>
            <li id={'isRaise'}>isRaise</li>
            <li id={'isBet'}>isBet</li>
        </ul>
      </div>
    );
  }
}

export default Regions;

