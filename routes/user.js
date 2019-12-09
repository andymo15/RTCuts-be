const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// PATH = /api/v1/users


router.get('/:uid',ctrl.user.getProfile);


module.exports = router;