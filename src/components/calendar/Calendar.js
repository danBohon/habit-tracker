import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';



class Calendar extends Component {
  constructor() {
  super();
    this.state = {
      counter: 0,
      daysArr: [],
      calendar: []
    }
  }

  componentDidMount () {
    this.getCalendar();
  }

  getCalendar = () => {
    const { id } = this.props.location.state.habit;
    axios.post('/api/calendar', {habit_id: id} ).then((res) => this.setState( {calendar: res.data} )).then(() => this.initiateDays());
  }

  initiateDays = () => {
    const {calendar} = this.state;
    // map over calendar to format days
    const result = calendar.map((item, index) => moment(item.date));

    // filter to only show previous days and today
    const today = moment().add(5, 'd');
    const beforeToday = (value) => moment(value).isSameOrBefore(today)
    const filteredArr = result.filter(beforeToday)

    // push to array with checked value from calendar
    const weekArr = [];
    for (let i = 0; i < filteredArr.length; i++) {
      weekArr[i] = calendar[i]
    } 
    // console.log('weekArr', weekArr);

    this.setState({daysArr: weekArr})

    // const { habit } = this.props.location.state;
    // // Set beginning and end of habit
    // let startOfHabit = moment(habit.start_date);
    // let endOfHabit = moment().add(habit.goal -1, 'day');
    // let days = [];
    // let day = startOfHabit;
    
    // create array of days for goal
    // while (day <= endOfHabit) {
    //   days.push(day);
    //   day = day.clone().add(1, 'd');
    // }
    
    // filter to only show habits before today
    // const today = moment();
    // const beforeToday = (value) => value.isSameOrBefore(today)
    // const filteredArr = days.filter(beforeToday)
    // this.setState({filteredArr: filteredArr})

    // push all dates into object of arrays with checked boolean
    // const weekArr = [];
    // for (let i = 0; i < filteredArr.length; i++) {
    //   weekArr[i] = {date: filteredArr[i], checked: false}
    // }
    // this.setState({daysArr: weekArr});
  }
  
  handleCheckChange = (index) => {
    // change the value of checked in object when checkbox is checked
    let newArr = this.state.daysArr
    newArr[index].checked = !newArr[index].checked    
    this.setState( {daysArr: newArr})

    // do the same with calendar
    // let newCal = this.state.calendar
    // newCal[index].checked = newArr[index].checked
    // this.setState( {calendar: newCal } )
    // console.log('newCal', newCal);
    console.log(this.state.daysArr[index]);
    
    axios.put('/api/calendar', {day: this.state.daysArr[index]}).then()
    
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
    console.log('calendar', this.state.calendar);
    console.log('daysArr', this.state.daysArr);

    const { habit } = this.props.location.state;
    const aWeek = this.state.daysArr.map(
      (item, index) => {
        return (
          <div className="week" key={item.date}>
            <div>{item.date}</div>
            <input type="checkbox" checked={item.checked} onChange={ () => this.handleCheckChange(index)}></input>
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