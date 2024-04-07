import  express  from 'express';

import signupController from './controllers/signupController.js';
import test from './controllers/testController.js';
import loginController from './controllers/loginController.js';
//Setup the router
const router = express.Router();

router.get('/',test);
router.post('/signup',signupController);
router.post('/signin',loginController);

export default router;