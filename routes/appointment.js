const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// /ap1/v1/appts

router.post('/', ctrl.appointment.createAppointment);
router.get('/', ctrl.appointment.showAll);
router.get('/show/:uid', ctrl.appointment.showBooked);
router.put('/:uid', ctrl.appointment.editAppointment);
router.delete('/delete', ctrl.appointment.deleteAppointment);



module.exports= router;