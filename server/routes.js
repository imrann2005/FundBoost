const express = require('express');

const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');
const test =  require('./controllers/testController');
//Setup the router
const router = express.Router();

router.get('/',test);
router.post('/signup',signupController);

module.exports = router;