const db = require('../models');

const createAppointment = (req, res) => {
    const appointmentData = {...req.body};
    // remember to use it
    // const appointmentData = {...req.body, who: req.session.currentUser.uid};
    db.Appointments.create(appointmentData, (err, createdAppt)=>{
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        return res.status(200).json({
            status: 200,
            data: createdAppt
        })
    })
}

const showBooked = (req,res) => {
    db.Appointments.find({who: req.params.uid})
    .populate('who')
    .exec((err, allAppointments)=>{
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        return res.status(200).json({
            status: 200,
            data: allAppointments
        })
    })
}

const index = (req, res) => {
    db.Appointments.find({}, (err, allAppts) => {
        res.json({ data: allAppts })
    })
}



module.exports={
    createAppointment,
    showBooked,
    index
}
