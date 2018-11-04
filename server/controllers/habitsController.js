module.exports = {
    createHabit: (req, res) => {
        const dbInstance = req.app.get('db');
        console.log('req.session------->', req.session);
        
        const { title, goal, date } = req.body;
        const { id } = req.session.user; 

        dbInstance.create_habit({ title: title, goal: goal, id: id, date: date } ).then( habit => {
            res.status(200).json(habit);
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

    }
}