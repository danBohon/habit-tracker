const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const habitsController = require('./controllers/habitsController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
require('dotenv').config();

const app = express();

app.use( bodyParser.json() );

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
}).catch( error => {
    console.error('Error connecting to database', error)
});


// app.use(express.static(__dirname + '/../build'));

app.get('/api/user', userController.getUserData);
app.post('/api/logout', authController.logout);
app.get('/auth/callback', authController.handleCallback);

app.post('/api/habit', habitsController.createHabit);
app.get('/api/habit', habitsController.getHabits);
app.post('/api/days', habitsController.createCalendar);
app.post('/api/calendar', habitsController.getCalendar);
app.put('/api/calendar', habitsController.updateChecks);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT} 🎃 💀 🎃`);
})
