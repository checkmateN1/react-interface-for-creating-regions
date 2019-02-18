// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

class MovementInterface extends Component {
    updateRegion = (e) => {
        let el = e.target;
        e.stopPropagation();
        const { updateRegionProperties, regPropertie } = this.props;

        switch (el.id) {
            case 'move-left':
                regPropertie.left -= e.shiftKey ? 20 : 1;
                updateRegionProperties(regPropertie);
                break;
            case 'move-right':
                regPropertie.left += e.shiftKey ? 20 : 1;
                updateRegionProperties(regPropertie);
                break;
            case 'move-up':
                regPropertie.top -= e.shiftKey ? 20 : 1;
                updateRegionProperties(regPropertie);
                break;
            case 'move-down':
                regPropertie.top += e.shiftKey ? 20 : 1;
                updateRegionProperties(regPropertie);
                break;
            case 'enlarge-x':
                regPropertie.width += e.shiftKey ? 10 : 1;
                updateRegionProperties(regPropertie);
                break;
            case 'enlarge-y':
                regPropertie.height += e.shiftKey ? 10 : 1;
                updateRegionProperties(regPropertie);
                break;
            case 'decrease-x':
                regPropertie.width -= e.shiftKey ? 10 : 1;
                updateRegionProperties(regPropertie);
                break;
            case 'decrease-y':
                regPropertie.height -= e.shiftKey ? 10 : 1;
                updateRegionProperties(regPropertie);
                break;
            default:
                return false
        }
    };

    render() {
        const { activeRegion } = this.props;

        return (
            <section className='MovementInterface' onClick={this.updateRegion}>
                <div className='region-id'>{activeRegion}</div>
                <fieldset>
                    <legend>move</legend>
                    <div className='region-move'>
                        <div className='move-x'>
                            <button id='move-left'>{'<'}</button>
                            <button id='move-right'>{'>'}</button>
                        </div>
                        <div className='move-y'>
                            <button id='move-up'>{'>'}</button>
                            <button id='move-down'>{'>'}</button>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>resize</legend>
                    <div className='region-resize'>
                        <div className='resize-x'>
                            <button id='enlarge-x'>{'< >'}</button>
                            <button id='decrease-x'>{'> <'}</button>
                        </div>
                        <div className='resize-y'>
                            <button id='enlarge-y'>{'< >'}</button>
                            <button id='decrease-y'>{'> <'}</button>
                        </div>
                    </div>
                </fieldset>
                <span className='shift-x10'>shift key x10</span>
            </section>
        );
    }
}

export default MovementInterface;

