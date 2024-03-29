// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

//Components
import MovementInterface from '../movementInterface';
import ConfigUpload from '../configUpload';


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

        let obj = {};
        let createEl = (name, recognitionType) => {
          obj[name] = {};
          obj[name].recognitionType = recognitionType;
          obj[name].width = 0;
          obj[name].height = 0;
          obj[name].top = 0;
          obj[name].left = 0;
        };

        // players
        for(let i = 0; i < payersCount; i++) {      // создаем регионы для каждого из игроков
          createEl(`Player${i}_balance`, 'number');
          createEl(`Player${i}_name`, 'nickname');
          createEl(`Player${i}_isActive`, 'color');
          createEl(`Player${i}_isDealer`, 'color');
          createEl(`Player${i}_bet`, 'number');
          createEl(`Player${i}_hole1_value`, 'card');   // карты игрока(2 штуки)
          createEl(`Player${i}_hole1_suit`, 'color');
          createEl(`Player${i}_hole2_value`, 'card');
          createEl(`Player${i}_hole2_suit`, 'color');
          createEl(`Player${i}_isThinking1`, 'color');
          createEl(`Player${i}_isThinking2`, 'color');
          createEl(`Player${i}_isWin1`, 'color');
          createEl(`Player${i}_isWin2`, 'color');
        }

        //table
          createEl('Pot', 'number');
          createEl('Prepot', 'number');
          createEl('Card1_value', 'card');    // Общие карты борда(5 штук)
          createEl('Card1_suit', 'color');
          createEl('Card2_value', 'card');
          createEl('Card2_suit', 'color');
          createEl('Card3_value', 'card');
          createEl('Card3_suit', 'color');
          createEl('Card4_value', 'card');
          createEl('Card4_suit', 'color');
          createEl('Card5_value', 'card');
          createEl('Card5_suit', 'color');
          createEl('Limit', 'similarity');
          createEl('TournamentX', 'similarity');

        //buttons
          createEl('isFold', 'color');
          createEl('isRaise', 'color');
          createEl('isCall', 'color');

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
        const { selectedRoom, gameType }= this.props;

        this.setState({activeRegion : el.id});
        selectRec.style.top = this.getCoords(el).top + 'px';
        selectRec.style.left = this.getCoords(el).left + 20 + 'px';
        selectRec.value = this.state.regions[selectedRoom][gameType]['regions'][el.id].recognitionType;
      } else {
        this.setState({activeRegion : ''});
      }
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

  loadConfig = (config) => {
    const { rooms } = config;
    this.setState({ regions: rooms });
  };

  saveConfig = () => {
    console.log(this.state.regions);
    this.download('json_config', JSON.stringify({rooms: this.state.regions}));
  };

  download = (filename, text) => {
    console.log(text);
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
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
                                <option value="card">card</option>
                                <option value="number">number</option>
                                <option value="color">color</option>
                                <option value="similarity">similarity</option>
                                <option value="nickname">nickname</option>
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
                                              key={index}> </div>) : null;

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
              <li id={'Prepot'}>Prepot</li>
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
              <li id={'Limit'}>Limit</li>
              <li id={'TournamentX'}>TournamentX</li>
          </ul>
          <ul className='buttons-list regions' style={{display: 'none'}}>
              <li id={'isFold'}>isFold</li>
              {/*<li id={'isCheck'}>isCheck</li>*/}
              <li id={'isCall'}>isCall</li>
              <li id={'isRaise'}>isRaise</li>
              {/*<li id={'isBet'}>isBet</li>*/}
              {/*<li id={'betAmount'}>betAmount</li>*/}
          </ul>
          {selectRecognition}
        </div>
        {regionsDiv}
        {activeRegion ? <MovementInterface
                            activeRegion={activeRegion}
                            updateRegionProperties={this.updateRegionProperties}
                            regPropertie={regions[selectedRoom][gameType]['regions'][activeRegion]}
                        /> : null}
        <div className='config-wrapper'>
          <ConfigUpload loadConfig={this.loadConfig}/>
          <button onClick={this.saveConfig} id='download-config'>download json_config.txt</button>
        </div>
      </>
    );
  }
}

export default Regions;

