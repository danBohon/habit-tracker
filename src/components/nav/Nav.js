import React, { Component } from 'react';
import { updateHabits } from './ducks/reducer';
import axios from 'axios';
import { connect } from 'react-redux'

export default class nav extends Component {

  componentDidMount() {
    this.getAllHabits();
  }

  getAllHabits = () => {
    axios.get('api/habit').then( res => {
      this.props.updateHabits( res.data )
    })
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default connect(null, {updateHabits} )(App)
