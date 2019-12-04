const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Path = /api/vi/auth

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.put('/edit/:uid', ctrl.auth.updateProfile);
router.delete('/logout', ctrl.auth.logout);



module.exports = router;