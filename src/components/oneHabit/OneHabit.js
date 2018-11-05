import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { connect } from 'react-redux';
import { updateHabit } from '../../ducks/reducer';
import './oneHabit.scss';

class OneHabit extends Component {
  render(props) {
    // console.log('onehabit props', this.props);
    
    const { habit } = this.props
    return (
     <Link to={{pathname:`/calendar${habit.id}`, state: {habit}}} onClick={() => this.props.updateHabit(habit.goal, habit.start_date)}> <div className='card'>
        <h3>{habit.title}</h3>
        <div className='text'>Start Date: {moment(habit.start_date).format('LL')}</div>
        <div>Goal: {habit.goal} </div>
      </div></Link>
    )
  }
}

export default connect(null, {updateHabit} )(OneHabit)
