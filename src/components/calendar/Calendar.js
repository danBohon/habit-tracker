import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';



class Calendar extends Component {
  constructor() {
  super();
    this.state = {
      counter: 0,
      daysArr: [],
      filteredArr: []
    }
  }

  componentDidMount () {
    this.initiateDays();
  }

  initiateDays = () => {
    const { habit } = this.props.location.state;
    // Set beginning and end of habit
    let startOfHabit = moment(habit.start_date);
    let endOfHabit = moment().add(habit.goal -1, 'day');
    let days = [];
    let day = startOfHabit;
    
    // create array of days for goal
    while (day <= endOfHabit) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }
    
    // filter to only show habits before today
    const today = moment();
    const beforeToday = (value) => value.isSameOrBefore(today)
    const filteredArr = days.filter(beforeToday)
    this.setState({filteredArr: filteredArr})

    // push all dates into object of arrays with checked boolean
    const weekArr = [];
    for (let i = 0; i < filteredArr.length; i++) {
      weekArr[i] = {date: filteredArr[i], checked: false}
    }
    this.setState({daysArr: weekArr});
  }
  
  handleCheckChange = (index) => {
    // change the value of checked in object when checkbox is checked
    let newArr = this.state.daysArr
    newArr[index].checked = !newArr[index].checked    
    this.setState( {daysArr: newArr})
    
    // add to counter for each check
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
    console.log('daysArr', this.state.daysArr);
    console.log(this.props);
    
    const { habit } = this.props.location.state;
    const aWeek = this.state.daysArr.map(
      (item, index) => {
        return (
          <div className="week" key={item.date.format('LLLL')}>
            <div>{item.date.format('LLLL')}</div>
            <input type="checkbox" checked={this
              .checked} onChange={ () => this.handleCheckChange(index)}></input>
          </div>
        )
      }
    )
    return (
      <div>
        {aWeek}
        <h1>{this.state.counter}/
        {/* {this.props.goal} */}
        {this.state.daysArr.length}
        </h1>
        <h2>Goal: {habit.goal}</h2>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { goal, start_date } = state

  return {
    goal,
    start_date
  }
}

export default connect(mapStateToProps, {})( Calendar )