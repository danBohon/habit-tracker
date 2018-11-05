import React from "react";
import {Switch, Route} from 'react-router-dom';
import Calendar from "./components/calendar/Calendar";
import OneHabit from "./components/oneHabit/OneHabit";
import HabitsDash from "./components/habitsDash/HabitsDash";
import Profile from "./components/profile/Profile";

export default

<Switch>
    <Route path='/calendar:id' component={Calendar}/> 
    <Route path='/habit' component={OneHabit}/> 
    <Route path='/profile' component={Profile}/>
    <Route path='/' component={HabitsDash}/> 
</Switch>