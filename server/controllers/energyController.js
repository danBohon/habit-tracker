module.exports = {
    createEnergyLog: (req,res) => {
        const dbInstance = req.app.get('db');

        const { energy, hour, date } = req.body;
        const { id } = req.session.user;

        dbInstance.log_energy( { energy, hour, date, user_id: id}).then( log => {
            res.status(200).json(log[0]);
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in CREATE ENERGY LOG"});
        console.log("ERROR-----💥---->", error);
        })
    },

    getEnergyData: (req, res) => {
        const dbInstance = req.app.get('db');

        const { id } = req.session.user;

        dbInstance.get_all_energy_data( { user_id: id} ).then( log => res.status(200).json(log)).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in GET ALL ENERGY DATA"});
        console.log("ERROR-----💥---->", error);
        })
    }
}
