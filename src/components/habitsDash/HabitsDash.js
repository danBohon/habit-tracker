import React, { Component } from 'react';
import HabitForm from '../habitForm/HabitForm';
import OneHabit from '../oneHabit/OneHabit';
import { connect } from 'react-redux'
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
        <div className="results">{result}</div>
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
