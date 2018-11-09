import React from "react";
import {Switch, Route} from 'react-router-dom';
import Calendar from "./components/calendar/Calendar";
import OneHabit from "./components/oneHabit/OneHabit";
import HabitsDash from "./components/habitsDash/HabitsDash";
import Profile from "./components/profile/Profile";
import EnergyTracker from "./components/energyTracker/EnergyTracker";
import LeaderBoard from "./components/leaderboard/LeaderBoard";

export default

<Switch>
    <Route path='/board' component={LeaderBoard}/>
    <Route path='/energy' component={EnergyTracker}/>
    <Route path='/calendar:id' component={Calendar}/> 
    <Route path='/habit' component={OneHabit}/> 
    <Route path='/profile' component={Profile}/>
    <Route path='/' component={HabitsDash}/> 
</Switch>