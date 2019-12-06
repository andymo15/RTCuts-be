const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// /ap1/v1/appts

router.post('/', ctrl.appointment.createAppointment);
router.get('/', ctrl.appointment.index);
router.get('/:uid', ctrl.appointment.showBooked);


module.exports= router;