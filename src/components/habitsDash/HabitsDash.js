import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import HabitForm from '../habitForm/HabitForm';
import OneHabit from '../oneHabit/OneHabit';
// import axios from 'axios';
import { connect } from 'react-redux'
// import moment from 'moment';

class HabitsDash extends Component {
    constructor() {
        super();
        this.state = {
            habits: []
        }
    }

    // componentDidMount() {
    //   this.getAllHabits();
    // }

    // getAllHabits = () => {
    //   axios.get('api/habit').then( res => {
    //     this.setState({ habits: res.data })
    //   })
    // }

  render() {
    
    const result = this.state.habits.map( habit => {
      return (
        <div key={habit.id}>
          <OneHabit 
          habit={habit}/>
        </div>
      )
    })

    return (
      <div>
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
