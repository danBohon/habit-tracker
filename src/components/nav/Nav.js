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
        toggleNav: false,
        points: null
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
    this.getPoints();

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

  getPoints = () => {
    axios.get('/api/points').then( res => this.setState({points: res.data}))
  }


  render() {
    return (
      <header className="header">
        <div className="logo">
            <Link to='/'><h1 className="logo"><span>66</span>days</h1></Link>
        </div>
        <Link to='/profile' className="username"><div>{this.props.user.name}</div></Link>
        <div>{this.state.points}</div>
        <nav className={this.state.toggleNav ? 'show' : ''}>
            <ul onClick={this.toggle}>
                <Link to='/'><li>Home</li></Link>
                <Link to='/energy'><li>Energy</li></Link>
                <Link to='/profile'><li>Profile</li></Link>
                <Link  to='/board' className="board"><li>Leader Board</li></Link>
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
