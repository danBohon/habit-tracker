import React, { Component } from 'react';
import './App.css';
import routes from './routes';
// import { Link } from 'react-router-dom';
import Nav from './components/nav/Nav'
import 'reset-css';
// import { updateHabits } from './ducks/reducer';
// import axios from 'axios';
// import { connect } from 'react-redux'

export default class App extends Component {
  // componentDidMount() {
  //   this.getAllHabits();
  // }

  // getAllHabits = () => {
  //   axios.get('api/habit').then( res => {
  //     this.props.updateHabits( res.data )
  //   })
  // }

  render(props) {
    console.log('this.props APP JS', this.props);
    return (
      <div className="App">
        <Nav></Nav>
        {routes}
      </div>
    );
  }
}

// export default connect(null, {updateHabits} )(App)
