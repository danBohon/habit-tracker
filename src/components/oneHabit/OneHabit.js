import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { connect } from 'react-redux';
import { updateHabit } from '../../ducks/reducer'

class OneHabit extends Component {
  render(props) {
    const { habit } = this.props
    return (
      <div>
        <h3>{habit.title}</h3>
        <div>Start Date: {moment(habit.start_date).format('LL')}</div>
        <div>Goal: {habit.goal} </div>
        <Link to='/calendar'><button onClick={() => this.props.updateHabit(habit.goal, habit.start_date)}>Calendar</button></Link>
      </div>
    )
  }
}

export default connect(null, {updateHabit} )(OneHabit)
