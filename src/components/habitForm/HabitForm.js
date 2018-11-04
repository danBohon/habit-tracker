import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default class HabitForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            goal: "",
        }
    }

    createHabit( title, goal ) {
      const date = moment()
      console.log('date', date);
      
      axios.post('/api/habit', {title: title, goal: goal, date: date}).then()
    }


  render() {
      const { title, goal } = this.state;
    return (
      <div>
        <input type="text" placeholder='Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>

        <input type="number" placeholder='Goal' value={this.state.goal} onChange={e => this.setState({goal: e.target.value})}/>

        <button onClick={() => this.createHabit( title, goal )}>Add</button>
      </div>
    )
  }
}
