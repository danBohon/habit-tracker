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
  
  countChecks = () => {
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

  initiateDays = () => {
    const {calendar} = this.state;
    // map over calendar to format days
    const result = calendar.map((item, index) => moment(item.date));

    // filter to only show previous days and today
    const today = moment();
    const beforeToday = (value) => moment(value).isSameOrBefore(today)
    const filteredArr = result.filter(beforeToday)

    // push to array with checked value from calendar
    const weekArr = [];
    for (let i = 0; i < filteredArr.length; i++) {
      weekArr[i] = calendar[i]
    } 

    this.setState({daysArr: weekArr})

    this.countChecks();
  }

  handleCheckChange = (index) => {
    // change the value of checked in object when checkbox is checked
    let newArr = this.state.daysArr
    newArr[index].checked = !newArr[index].checked    
    this.setState( {daysArr: newArr})
    
    axios.put('/api/calendar', {day: this.state.daysArr[index]}).then()

    this.countChecks();
  }

  deleteHabit = () => {
    const { habit } = this.props.location.state;

    axios.delete(`/api/habit/${habit.id}`).then(() => this.props.history.push('/'))
  }
  
  render() {

    const { habit } = this.props.location.state;
    const aWeek = this.state.daysArr.map(
      (item, index) => {
        return (
          <div className="week" key={item.date}>
            <div>{moment(item.date).format('ddd, MMMDD, YYYY')}</div>
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
        <button onClick={ () => this.deleteHabit()}>Delete</button>
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