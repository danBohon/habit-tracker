import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import HabitForm from '../habitForm/HabitForm';
import OneHabit from '../oneHabit/OneHabit';
// import axios from 'axios';
import { connect } from 'react-redux'
// import moment from 'moment';
import './habitDash.scss'

class HabitsDash extends Component {
  render() {
    const result = this.props.habits.map( habit => {
      return (
        <div key={habit.id}>
          <OneHabit 
          habit={habit}/>
        </div>
      )
    })
    return (
      <div className='dash'>
        <HabitForm />
        {result}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { habits } = state

  return {
    habits
  }
}

export default connect(mapStateToProps, {})( HabitsDash )
