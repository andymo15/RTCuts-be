const db = require('../models');

const getProfile = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
    });
    
    db.User.findById(req.session.currentUser.id, (err,  foundUser) =>{
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again.'
        });
        return res.status(200).json({
            status: 200,
            data: foundUser,
        });
    });
};

module.exports = {
    getProfile,
}