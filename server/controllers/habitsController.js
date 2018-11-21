module.exports = {
    createHabit: (req, res) => {
        const dbInstance = req.app.get('db');
        
        const { title, goal, date } = req.body;
        const { id } = req.session.user; 

        dbInstance.create_habit({ title: title, goal: goal, id: id, date: date } ).then( habit => {
            res.status(200).json(habit[0]);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in CREATE HABIT"});
        console.log("ERROR-----💥---->", error);
        })

    },

    getHabits: (req, res) => {
        const dbInstance = req.app.get('db');

        const {auth0_id} = req.session.user
 
        dbInstance.get_habits( {auth0_id} ).then( habits => {
            res.status(200).json(habits);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in GET HABITS"});
        console.log("ERROR-----💥---->", error);
        })
    },

    deleteHabit: (req, res) => {
        const dbInstance = req.app.get('db');

        const { id } = req.params

        dbInstance.delete_habit( {habit_id: id} ).then( habits => {
            res.status(200).json(habits);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in DELETE HABIT"});
        console.log("ERROR-----💥---->", error);
        })
    },

    createCalendar: (req, res) => {
        const dbInstance = req.app.get('db');

        const { id } = req.session.user;
        const { habit_id, days } = req.body;

        
        for (let i = 0; i < days.length; i++) {
            const date = days[i].date;
            const checked = days[i].checked;
            dbInstance.create_dates( {user_id: id, habit_id, date, checked} ).then( habits => {
                res.status(200).json(habits);
            }).catch(error => { 
                res.status(500).send({errorMessage: "Something went wrong in CREATE CALENDAR"});
                console.log("ERROR-----💥---->", error);
            })
        }
    },
    
    getCalendar: (req, res) => {
        const dbInstance = req.app.get('db');
        
        const { habit_id } = req.body;

        dbInstance.get_calendar( {habit_id} ).then( days => {
            res.status(200).json(days);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in GET CALENDAR"});
        console.log("ERROR-----💥---->", error);
        })
    },

    updateChecks: (req, res) => {
        const dbInstance = req.app.get('db');

        const { day } = req.body;

            const id = day.id;
            const habit_id = day.habit_id;
            const checked = day.checked;
            dbInstance.update_checks( {id, habit_id, checked} ).then( habits => {
                res.status(200).json(habits);
            }).catch(error => { 
                res.status(500).send({errorMessage: "Something went wrong in UPDATE CHECKS"});
                console.log("ERROR-----💥---->", error);
            })
    },

    getPoints: (req, res) => {
        const dbInstance = req.app.get('db');

        const { id } = req.session.user;

        dbInstance.get_points( {user_id: id} ).then( points => {
            res.status(200).send(points[0].count);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in GET POINTS"});
            console.log("ERROR-----💥---->", error);
        })
    },

    getLeaderBoard: (req, res) => {
        const dbInstance  = req.app.get('db');

        dbInstance.get_leaderboard_data().then( info => {
            res.status(200).json(info);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in GET LEADER BOARD"});
            console.log("ERROR-----💥---->", error);
        })
    }
}