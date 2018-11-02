import React from "react";
import {Switch, Route} from 'react-router-dom';
import Calendar from "./components/calendar/Calendar";
import OneHabit from "./components/oneHabit/OneHabit";
import HabitsDash from "./components/habitsDash/HabitsDash";

export default

<Switch>
    <Route path='/calendar' component={Calendar}/> 
    <Route path='/habit' component={OneHabit}/> 
    <Route path='/' component={HabitsDash}/> 
    {/* <Route path='/' component={Auth}/>  */}
</Switch>