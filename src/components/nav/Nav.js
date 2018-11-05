import React, { Component } from 'react';
import { updateHabits} from '../../ducks/reducer';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './nav.scss'

class Nav extends Component {
  constructor(){
    super();
    this.state = {
        toggleNav: false
    }
}
  toggle = () => {
      this.setState((prevState) => {
          return {
              toggleNav: !prevState.toggleNav
          }
    })
  }

  componentDidMount() {
    this.getAllHabits();

    axios.get('/api/user').then(response => {
      this.props.userLogin(response.data);
    }).catch(error => {
      this.setState({ error });
    }).then(() => {
      this.setState({ loading: false });
    })
  }

  getAllHabits = () => {
    axios.get('api/habit').then( res => {
      this.props.updateHabits( res.data )
    })
  }
  render() {
    console.log('this.props.user', this.props);
    
    return (
      <header className="header">
        <div className="logo">
            <Link to='/'>66 DAYS</Link>
        </div>
        <div>{this.props.user.name}</div>
        <nav className={this.state.toggleNav ? 'show' : ''}>
            <ul onClick={this.toggle}>
                <li><Link to='/profile'>Profile</Link></li>
                <li>Goals</li>
                <li>Friends</li>
            </ul>
        </nav>
        <div className='menu' onClick={this.toggle}>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const {user} = state;
  return { user };
}

export default connect(mapStateToProps, {updateHabits} )(Nav)
