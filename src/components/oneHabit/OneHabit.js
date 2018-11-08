import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { connect } from 'react-redux';
import { updateHabit } from '../../ducks/reducer';
import axios from 'axios';
import './oneHabit.scss';
// import HabitChart from '../habitChart/HabitChart';
// import ProgressBar from '../progressBar/ProgressBar'

class OneHabit extends Component {
  constructor() {
    super();
    this.state = {
      calendar: [],
      counter: 0,
      checkedToday: false
    }
  }

  componentDidMount () {
    this.getCalendar();
    
  }

  getCalendar = () => {
    const { id } = this.props.habit;
    axios.post('/api/calendar', {habit_id: id} ).then((res) => this.setState( {calendar: res.data} )).then(() => this.countChecks()).then(() => this.isTodayChecked());
  }

  countChecks = () => {
    let count = 0
    this.state.calendar.map(
      (day) => {
        if (day.checked) {
          count ++
          return count;
        } else return count;
      }
    )
    this.setState({ counter: count})
  }

  isTodayChecked = () => {
    const {calendar} = this.state;
    // map over calendar to format days
    const result = calendar.map((item) => moment(item.date));
    // filter to only show today
    const today = moment();
    const isToday = (value) => moment(value).isSame(today, 'd');
    const filteredArr = result.filter(isToday);
    let todayDate = filteredArr[0];
    
    const newCal = calendar
    for (let i = 0; i < calendar.length; i++) {
      if (moment(newCal[i].date).isSame(todayDate, 'd')) {
        this.setState({checkedToday: calendar[i].checked})
      }
    }
  }

  completeToday = () => {
    const {calendar} = this.state;
    // map over calendar to format days
    const result = calendar.map((item) => moment(item.date));
    // filter to only show today
    const today = moment();
    const isToday = (value) => moment(value).isSame(today, 'd');
    const filteredArr = result.filter(isToday);
    let todayDate = filteredArr[0];
    
    const newCal = calendar
    for (let i = 0; i < calendar.length; i++) {
      if (moment(newCal[i].date).isSame(todayDate, 'd')) {
        newCal[i].checked = !newCal[i].checked
        axios.put('/api/calendar', {day: newCal[i]}).then()
        this.setState({checkedToday: calendar[i].checked})
        // .then(() => this.countChecks())
      }
    }
  }


  render(props) {
    const { habit } = this.props;
    const dan  = {
      background: 'red'
    }
    return (
      <div>
     <Link to={{pathname:`/calendar${habit.id}`, state: {habit}}} onClick={() => this.props.updateHabit(habit.goal, habit.start_date)}> <div className='card'>
        <h3>{habit.title} </h3>
        {/* <div className='text'>  Start Date: {moment(habit.start_date).format('LL')}</div> */}
        <div>Complete: {this.state.counter} </div>
        {/* <div>Goal: {habit.goal} </div> */}
        <progress value={this.state.counter} max={habit.goal} style={dan}></progress>
        {/* <meter value={this.state.counter} max={habit.goal}></meter> */}
      </div></Link>
      <div>Complete habit for today:</div>
      <input type="checkbox" checked={this.state.checkedToday} onChange={ () => this.completeToday()}></input>
      {/* <HabitChart/> */}
      </div>
    )
  }
}

export default connect(null, {updateHabit} )(OneHabit)
