const db = require('../models');

const createAppointment = (req, res) => {
    const appointmentData = {...req.body, who: req.session.currentUser.id};
    console.log(appointmentData);
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

const showAll = (req, res) => {
    db.Appointments.find({}, (err, allAppts) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        return res.json({ data: allAppts })
    })
}

const editAppointment = (req,res) => {
    db.Appointments.findByIdAndUpdate(req.params.uid, req.body, {new:true}, (err, updatedAppt) =>{
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        return res.json({
            statusu: 200,
            data: updatedAppt
        })
    })
}

const deleteAppointment = (req,res) => {
    db.Appointments.findByIdAndDelete(req.params.uid, (err, deletedAppt)=>{
    if (err) return res.status(500).json({
        status: 500,
        message: err,
    });
    return res.json({
        status: 200,
        message:"Deleted!",
        data: deletedAppt
        })
    })
}

module.exports={
    createAppointment,
    showBooked,
    showAll,
    editAppointment,
    deleteAppointment
}
