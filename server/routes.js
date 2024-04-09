import  express  from 'express';

import signupController from './controllers/signupController.js';
import { getSingleUser } from './controllers/testController.js';
import test from './controllers/testController.js';
import loginController from './controllers/loginController.js';
//Setup the router
const router = express.Router();

//get routes for testing purpose created
router.get('/',test);
router.get("/:id",getSingleUser);

//post routes for data capturing of user
router.post('/signup',signupController);
router.post('/signin',loginController);

export default router;