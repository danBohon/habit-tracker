import React, { Component } from 'react'
import moment from 'moment';


export default class Calendar extends Component {
  constructor() {
  super();
    this.state = {
      counter: 0,
      daysArr: [],
      filteredArr: [],
      goal: 10
    }
  }

  componentDidMount () {
    this.initiateDays();
  }

  initiateDays = () => {
    const today = moment().add(4, 'd');

    // Set beginning and end of habit
    let startOfHabit = moment().startOf(today, 'd');
    let endOfHabit = moment().add(this.state.goal, 'day');
    let days = [];
    let day = startOfHabit;
    
    // create array of days for goal
    while (day <= endOfHabit) {
        days.push(day);
        day = day.clone().add(1, 'd');
    }
    
    const beforeToday = (value) => value.isSameOrBefore(today)
    const filteredArr = days.filter(beforeToday)

    this.setState({filteredArr: filteredArr})

    const weekArr = [];
    for (let i = 0; i < filteredArr.length; i++) {
      weekArr[i] = {date: filteredArr[i], checked: false}
    }
   
    this.setState({daysArr: weekArr});
  }
  
  handleCheckChange = (index) => {
    
    let newArr = this.state.daysArr
    newArr[index].checked = !newArr[index].checked    
    this.setState( {daysArr: newArr})
    
    let count = 0
    
    this.state.daysArr.map(
      (day, index) => {
        if (day.checked) {
          count ++
          return count;
        } else return count;
      }
    )
    
    this.setState({ counter: count})
    
  }
  
  render() {
    
    console.log('filteredArr---------->(in return)', this.state.filteredArr);
    console.log('counter', this.state.counter);
    console.log('daysArr----->', this.state.daysArr);

    const aWeek = this.state.daysArr.map(
      (item, index) => {
        
        console.log('item', item.checked);
        
        return (
          <div className="week" key={item.date.format('LLLL')}>
            <div>{item.date.format('LLLL')}</div>
            <input type="checkbox" checked={this.state.daysArr[index].checked} onChange={ () => this.handleCheckChange(index)}></input>
          </div>
        )
      }
    )
    console.log(this.state.checkedArr);
    
    
    return (
      <div>
        {aWeek}
        <h1>{this.state.counter}/
        {this.state.daysArr.length}
        </h1>
        <h2>Goal: {this.state.goal}</h2>
      </div>
    )
  }
}
