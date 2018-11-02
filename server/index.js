const express = require('express');
const bodyParser = require('body-parser');
const habitsController = require('./controllers/habitsController');
const massive = require('massive');
require('dotenv').config();

const app = express();

app.use( bodyParser.json() );

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
}).catch( error => {
    console.error('Error connecting to database', error)
});

// app.use(express.static(__dirname + '/../build'));

app.post('/api/habit', habitsController.createHabit);
app.get('/api/habit', habitsController.getHabits);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT} 🎃 💀 🎃`);
})
