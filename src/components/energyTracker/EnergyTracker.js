import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import EnergyChart from '../energyChart/EnergyChart';

export default class EnergyTracker extends Component {
    constructor() {
        super();
        this.state = {
            energyData: [],
            selectedOption: 'option1'
        }
    }

    componentDidMount() {
        this.getEnergyData();
    }

    getEnergyData = () => {
        axios.get('/api/energy').then((res) => this.setState( {energyData: res.data }));
    }

    trackEnergy = (energy) => {
        const date = moment().format('MMDDYY');
        const hour = moment().format('H');
        
        axios.post('/api/energy', {energy, date, hour} ).then()
        this.setState( {energyData: [...this.state.energyData, {hour, energy, date}]} );
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    }
    
    handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    this.trackEnergy(parseInt(this.state.selectedOption));
}


render() {
    console.log('energyData:', this.state.energyData);
    return (
      <div>
            <form onSubmit={this.handleFormSubmit}>
              <div className="radio">
                <label>
                  <input type="radio" value="1" checked={this.state.selectedOption === '1'} onChange={this.handleOptionChange} />
                  Option 1
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="2" checked={this.state.selectedOption === '2'} onChange={this.handleOptionChange}/>
                  Option 2
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="3" checked={this.state.selectedOption === '3'} onChange={this.handleOptionChange}/>
                  Option 3
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="4" checked={this.state.selectedOption === '4'} onChange={this.handleOptionChange}/>
                  Option 4
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="5" checked={this.state.selectedOption === '5'} onChange={this.handleOptionChange}/>
                  Option 5
                </label>
              </div>
              <button className="btn btn-default" type="submit">Save</button>
            </form>

            <EnergyChart />
      </div>
    )
  }
}
