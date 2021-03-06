const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AppointmentsSchema = mongoose.Schema({
    who:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // when: Date, 
    date:"",
    time:"",
});

const Appointments = mongoose.model('Appointments', AppointmentsSchema)
module.exports = Appointments;