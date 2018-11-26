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
            date: null,
        }
    }

    componentDidMount() {
      this.getAllHabits();
    }

    createHabit( title, goal ) {
      const date = moment().format()
      this.setState( {date: date} )
      axios.post('/api/habit', {title: title, goal: goal, date: date}).then( (res) => this.createCalendar(res.data.id) ).then(() => this.getAllHabits())
      this.setState({title: "", goal: ""})
    }
    
    getAllHabits = () => {
      axios.get('/api/habit').then( res => {
        this.props.updateHabits( res.data )
      })
    }

    createCalendar = (habit_id) => {
      // Set beginning and end of habit
    let startOfHabit = moment(this.state.date);
    let endOfHabit = moment().add(this.state.goal -1, 'day');
    let days = [];
    let day = startOfHabit;
    
    // create array of days for goal
    while (day <= endOfHabit) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }

    // push all dates into object of arrays with checked boolean
    const weekArr = [];
    for (let i = 0; i < days.length; i++) {
      weekArr[i] = {date: days[i], checked: false}
    }
    // this.setState({daysArr: weekArr});
    // console.log('calendar', weekArr);
    
    axios.post('/api/days', {habit_id: habit_id, days: weekArr}).then()
  }
  



  render() {
      const { title, goal } = this.state;
    return (
      <div className='form'>
        <input className="title" type="text" placeholder='Title' value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>

        <input className="goal" type="number" placeholder='Goal' value={this.state.goal} onChange={e => this.setState({goal: e.target.value})}/>

        <button onClick={() => this.createHabit( title, goal )}>Add</button>
      </div>
    )
  }
}

export default connect( null, {updateHabits} )(HabitForm)