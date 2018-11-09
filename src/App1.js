import React, { Component } from 'react';
import './App.css';
import routes from './routes';
// import { Link } from 'react-router-dom';
import Nav from './components/nav/Nav'
import 'reset-css';
import { updateHabits } from './ducks/reducer';
// import axios from 'axios';
import { connect } from 'react-redux'
// import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import { withRouter } from 'react-router';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true
    }
  }

  // componentDidMount() {
  //   this.getAllHabits();
  // }

  // getAllHabits = () => {
  //   axios.get('api/habit').then( res => {
  //     this.props.updateHabits( res.data )
  //   })
  // }

  render() {
    return(
      !this.state.loggedIn ?
      <div>
      <Profile/>
      </div>
      :
      <div className="App">
      <Nav/>
      {routes}
      </div>
    )
  }
}

export default withRouter(connect(null, {updateHabits} )(App))
