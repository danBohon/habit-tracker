module.exports = {
    createHabit: (req, res) => {
        const dbInstance = req.app.get('db');

        const { title, goal } = req.body;
        // const { user_id } = req.sessions;

        dbInstance.create_habit({ title: title, goal: goal }).then( habit => {
            res.status(200).json(habit);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in CREATE HABIT"});
        console.log("ERROR-----💥---->", error);
        })

    },

    getHabits: (req, res) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_habits().then( habits => {
            res.status(200).json(habits);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in GET HABITS"});
        console.log("ERROR-----💥---->", error);
        })

    }
}