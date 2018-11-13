module.exports = {
    getUserData: (req, res) => {
        res.status(200).json(req.session.user);
    },

    makeUserPrivate: (req, res) => {

        const { id } = req.session.user;

        console.log('req.session.user', req.session.user);
        

        req.app.get('db').make_user_private( { user_id: id} ).then( user => {
            res.status(200).json(user)
        }).catch(error => { 
            res.status(500).send({errorMessage: "Something went wrong in MAKE USER PRIVATE"});
            console.log("ERROR-----💥---->", error);
        })
    }
};