import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes';
import { Link } from 'react-router-dom';
import { updateHabits } from './ducks/reducer';
// import axios from 'axios';
import { connect } from 'react-redux'

export default class App extends Component {
  

  // componentDidUpdate() {

  // }

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
        <header className="App-header">
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        </header>
        {routes}
      </div>
    );
  }
}

// export default connect(null, {updateHabits} )(App)
