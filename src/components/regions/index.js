// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

//Components
import MovementInterface from '../movementInterface';


class Regions extends Component {

  state = {
    list: [1,2,3,4,5,6,7,8,9],
    active: '',
    activeRegion: '',
    regions: {},
    wasCreated: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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
        reg['recognitionType'] = 0;
        reg['responseType'] = 0;

        let obj = {};
        let createEl = (name, recognitionType) => {
            obj[name] = Object.create(reg);
            obj[name].recognitionType = recognitionType;
        };

        // players
        for(let i = 0; i < payersCount; i++) {
            createEl(`Player${i}_balance`, 'money');
            createEl(`Player${i}_name`, 'string');
            createEl(`Player${i}_isActive`, 'active');
            createEl(`Player${i}_isDealer`, 'dealer');
            createEl(`Player${i}_bet`, 'money');
            createEl(`Player${i}_hole1_value`, 'string');
            createEl(`Player${i}_hole1_suit`, 'suit');
            createEl(`Player${i}_hole2_value`, 'string');
            createEl(`Player${i}_hole2_suit`, 'suit');
        }

        //table
          createEl('Pot', 'money');
          createEl('Card1_value', 'string');
          createEl('Card1_suit', 'suit');
          createEl('Card2_value', 'string');
          createEl('Card2_suit', 'suit');
          createEl('Card3_value', 'string');
          createEl('Card3_suit', 'suit');
          createEl('Card4_value', 'string');
          createEl('Card4_suit', 'suit');
          createEl('Card5_value', 'string');
          createEl('Card5_suit', 'suit');

        //buttons
          createEl('isBet', 'string');
          createEl('isRaise', 'string');
          createEl('isCall', 'string');
          createEl('isCheck', 'string');
          createEl('isFold', 'string');

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

        this.setState({activeRegion : ''});
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

      let selectRec = document.querySelector('.recognitionType');
      if (el.classList.contains('active')) {
        const { regions } = this.state;
        const { selectedRoom, gameType }= this.props;

        this.setState({activeRegion : el.id});
        selectRec.style.top = this.getCoords(el).top + 'px';
        selectRec.style.left = this.getCoords(el).left + 20 + 'px';
        selectRec.value = this.state.regions[selectedRoom][gameType]['regions'][el.id].recognitionType;
      } else {
        this.setState({activeRegion : ''});
      }
      this.setRegionType(el.id);
    }
  };

    getCoords = elem => {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top - 98,
            left: box.left + box.width
        }
    };

  updateRegionProperties = (properties) => {
      const { selectedRoom, gameType }= this.props;
      const { regions, activeRegion } = this.state;

      regions[selectedRoom][gameType]['regions'][activeRegion] = properties;
      this.setState({ regions });
  };


  render() {
    const { regions, active, activeRegion } = this.state;
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
                              style={{display: activeRegion ? 'initial' : 'none'}}
                              >
                                <option value="0" disabled hidden>Select recognition type</option>
                                <option value="string">string</option>
                                <option value="money">money</option>
                                <option value="number">number</option>
                                <option value="suit">suit</option>
                                <option value="active">active</option>
                                <option value="dealer">dealer</option>
                              </select>;

    const regionsDiv = regions.hasOwnProperty(selectedRoom) &&
                       regions[selectedRoom].hasOwnProperty(gameType) &&
                       regions[selectedRoom][gameType].hasOwnProperty('regions') ?
                        Object.keys(regions[selectedRoom][gameType]['regions'])
                        .filter(key => activeRegion ? key.match(new RegExp(activeRegion, 'i')) : active ? key.match(new RegExp(active, 'i')) : true)
                        .map((el, index) => <div
                                              className={`${el} region-div`}
                                              style={{width: regions[selectedRoom][gameType]['regions'][el].width,
                                                      height: regions[selectedRoom][gameType]['regions'][el].height,
                                                      top: regions[selectedRoom][gameType]['regions'][el].top,
                                                      left: regions[selectedRoom][gameType]['regions'][el].left}}
                                              key={index}></div>) : null;

    return (
      <>
          <div className='all-regions' onClick={this.setActive}>
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
                  <li id={'Card1_value'}>Card1_value</li>
                  <li id={'Card1_suit'}>Card1_suit</li>
                  <li id={'Card2_value'}>Card2_value</li>
                  <li id={'Card2_suit'}>Card2_suit</li>
                  <li id={'Card3_value'}>Card3_value</li>
                  <li id={'Card3_suit'}>Card3_suit</li>
                  <li id={'Card4_value'}>Card4_value</li>
                  <li id={'Card4_suit'}>Card4_suit</li>
                  <li id={'Card5_value'}>Card5_value</li>
                  <li id={'Card5_suit'}>Card5_suit</li>
              </ul>
              <ul className='buttons-list regions' style={{display: 'none'}}>
                  <li id={'isFold'}>isFold</li>
                  <li id={'isCheck'}>isCheck</li>
                  <li id={'isCall'}>isCall</li>
                  <li id={'isRaise'}>isRaise</li>
                  <li id={'isBet'}>isBet</li>
              </ul>
              {selectRecognition}
          </div>
          {regionsDiv}
          {activeRegion ? <MovementInterface
                              activeRegion={activeRegion}
                              updateRegionProperties={this.updateRegionProperties}
                              regPropertie={regions[selectedRoom][gameType]['regions'][activeRegion]}
                          /> : null}
      </>
    );
  }
}

export default Regions;

