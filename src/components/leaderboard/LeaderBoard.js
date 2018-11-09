import React, { Component } from 'react';
import axios from 'axios';

export default class LeaderBoard extends Component {
    constructor() {
        super();
        this.state = {
            leaderBoardData: []
        } 
    }

    componentDidMount() {
        this.getLeaderBoardData();
    }

    getLeaderBoardData = () => {
        axios.get('/api/leaderboard').then(res => this.setState({leaderBoardData: res.data}))
    }

  render() {
      const {leaderBoardData} = this.state
      const leaderBoard = leaderBoardData.map(
          item  => {
              return (
                  <div key={leaderBoardData.indexOf(item)}>Username: {item.name} Points: {item.count} </div>
              )
          }
      )
    return (
      <div>
        {leaderBoard}
      </div>
    )
  }
}
