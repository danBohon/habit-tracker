import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import EnergyChart from '../energyChart/EnergyChart';
import _ from 'lodash';
import './energyTracker.scss';

export default class EnergyTracker extends Component {
    constructor() {
        super();
        this.state = {
            energyData: [],
            selectedOption: '1',
            arrayForChart: [],
            series: [
                {
                  name: "series-1",
                  data: []
                }
              ],
            disabled: false,
            nextTime: null,
        }
    }

    componentDidMount() {
        this.getEnergyData();
        this.enableButton();
    }

    getEnergyData = (fromDate) => {
        axios.get(`/api/energy?date=${fromDate}`).then((res) => {
        this.setState( {energyData: res.data })}).then(() => this.createArrayForChart());
    }

    trackEnergy = (energy) => {
        const date = moment().format('MMDDYY');
        const hour = parseInt(moment().format('H'));
        
        axios.post('/api/energy', {energy, date, hour} ).then()
        this.setState( {energyData: [...this.state.energyData, {energy, hour}]} );
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    }

    enableButton = () => {
      const currentTime = moment().format('lll');
      axios.get('/api/nextTime').then((res) => {
        this.setState({ nextTime: res.data });
        if (res.data < currentTime) {
          this.setState({ disabled: false })
        } else this.setState({ disabled: true })
      })
    }
    
    handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    this.trackEnergy(parseInt(this.state.selectedOption));
    this.createArrayForChart();

    this.setState({disabled: true})
    const nextTime = moment().add(1, 'h').format('lll');
    this.setState({nextTime: nextTime})
    axios.put('/api/nextTime', {time: nextTime})
    }

    createArrayForChart = () => {
        const {energyData} = this.state

        let object = _.chain(energyData)
            .groupBy("hour")
            .map((entries, hour) => [hour, _.meanBy(entries, entry => entry.energy)])
            .fromPairs()
            .value();
    
        const arrayForChart = [];
        for (let i = 0; i <= 23; i++){
        if(!object[i]) {
            arrayForChart.push(null)
        } else arrayForChart.push(object[i])
        };

        this.setState({arrayForChart: arrayForChart, series: [
            {
              name: "series-1",
              data: arrayForChart
            }
          ]})
    }
    
    
    render() {
      console.log('this.state.energyData------------->', this.state.energyData);
    return (
      <div className="page">
            <form onSubmit={this.handleFormSubmit}>
              <div className="radio">
                <label>
                  <input type="radio" value="1" checked={this.state.selectedOption === '1'} onChange={this.handleOptionChange} />
                  1: Terrible
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="2" checked={this.state.selectedOption === '2'} onChange={this.handleOptionChange}/>
                  2: Kinda Lazy
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="3" checked={this.state.selectedOption === '3'} onChange={this.handleOptionChange}/>
                  3: Feeling Alright
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="4" checked={this.state.selectedOption === '4'} onChange={this.handleOptionChange}/>
                  4: Pretty Good
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="5" checked={this.state.selectedOption === '5'} onChange={this.handleOptionChange}/>
                  5: Awesome
                </label>
              </div>
              <button className={this.state.disabled? "btn btn-default button disabled" : "btn btn-default button"} type="submit" disabled={this.state.disabled}>{this.state.disabled ? <p> Come back at {moment(this.state.nextTime).format('hh:mm')} </p> : <p> save </p>}</button>
            </form>

            <EnergyChart 
                arrayForChart={this.state.arrayForChart}
                series={this.state.series}
                />
            {/* <button className="button" onClick={() => this.getEnergyData(moment().format('MMDDYY'))}>week</button> */}
      </div>
    )
  }
}
