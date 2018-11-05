import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './habitForm.scss';
import { connect } from 'react-redux';
import { updateHabits} from '../../ducks/reducer';

class HabitForm extends Component {
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
      axios.post('/api/habit', {title: title, goal: goal, date: date}).then(() => this.getAllHabits())
    }
    
    getAllHabits = () => {
      axios.get('api/habit').then( res => {
        this.props.updateHabits( res.data )
      })
    }


  render() {
      const { title, goal } = this.state;
    return (
      <div className='form'>
        <input type="text" placeholder='Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>

        <input type="number" placeholder='Goal' value={this.state.goal} onChange={e => this.setState({goal: e.target.value})}/>

        <button onClick={() => this.createHabit( title, goal )}>Add</button>
      </div>
    )
  }
}

export default connect( null, {updateHabits} )(HabitForm)