const bcrypt = require('bcryptjs');
const db = require('../models');

const register = (req,res) => {
    if (!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json({status: 400, message:'Please enter your name, email address, and password.'});    
    }
    
    db.User.findOne({email: req.body.email }, (err, foundUser)=>{
        if (err) return res.status(500).json({ status: 500, message:'Something went wrong. Please try again.' });
        if (foundUser) return res.status(400).json({ status: 400, message:'Please try a different email address'});

        bcrypt.genSalt(10, (err, salt)=>{
            if (err) return res.status(500).json({status: 500, message:'Something went wrong. Please try again.'});
            bcrypt.hash(req.body.password, salt, (err, hash)=>{
                if(err) return res.status(500).json({status:500, message:'Something went wrong. Please try again.'});

                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    phoneNumber: req.body.phoneNumber,
                }

                db.User.create(newUser, (err, savedUser)=>{
                    if(err) return res.status(500).json({status:500, message:'Something went wrong. Please try again.'})
                    res.sendStatus(201);
                    console.log(savedUser)
                });
            });
        });
    });
};

const login = (req,res) =>{
    if (!req.body.email || !req.body.password){
        return res.status(400).json({status: 400, message: 'Please enter your email and/or your password'});
    }
    db.User.findOne({email: req.body.email}, (err, foundUser)=>{
        if (err) return res.status(500).json({status: 500, message: 'Something went wrong. Please try again.'});
        
        if (!foundUser) {
            return res.status(400).json({status: 400, message:"Email not found. Please try again"});
        }
        bcrypt.compare(req.body.password, foundUser.password, (err, matched) =>{
            if (err) return res.status(500).json({status:500, message:'Something went wrong. Please try again,'});
            if (matched) {
                req.session.currentUser = {id: foundUser._id};
                return res.status(200).json({status:200, message:'Success', data: foundUser._id});
            } else {
                return res.status(400).json({status:400, message:'Username or Password is incorrect.'})
            }
        });
    });
};

const updateProfile = (req,res) => {
    db.User.findByIdAndUpdate(req.params.uid, req.body, {new:true},(err, updatedProfile)=>{
        if(err) return res.status(500).json({status:500, message:'Something wrong. Please try again.'});
        res.json({
            status:200,
            data: updatedProfile,

        });
    });
};

const logout = (req,res) => {
    // if (!req.session.currentUser)
    //     return res.status(401).json({status: 401, message:'Unauthorized'});
    req.session.destroy(err=>{
        if (err)
            return res.status(500).json({
                status:500,
                message:"Something went wrong. Please try again."
            });
        res.json({
            status: 200,
            message:"hello",
        })
    });
};

module.exports = {
    register,
    login,
    updateProfile,
    logout,
}