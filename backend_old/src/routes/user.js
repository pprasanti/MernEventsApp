import express from 'express';
import userController from '../controllers/user.js';
import User from '../db/mongo/models/user.js';
import userService from '../services/user.js';
import { wrapAsyncErrors } from '../utils/AsyncErrorHandle.js';

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// **********************************
// INDEX - Seed users
// **********************************
router.get('/seed', wrapAsyncErrors(userController.seedUsers))

// **********************************
// CREATE - creates a new user
// **********************************
router.post('/', wrapAsyncErrors(userController.createUser))

// **********************************
// NEW - renders a form
// **********************************
router.get('/new', wrapAsyncErrors(userController.newUser))

// *******************************************
// UPDATE - updates a particular user
// *******************************************
router.patch('/:id', wrapAsyncErrors(userController.updateUser))

// **********************************
// INDEX - renders multiple users
// **********************************
router.get('/', wrapAsyncErrors(userController.getUsers))

// *******************************************
// SHOW - details about one particular user
// *******************************************
router.get('/:id', wrapAsyncErrors(userController.showUser))

// *******************************************
// EDIT - renders a form to edit an user
// *******************************************
router.get('/:id/edit', wrapAsyncErrors(userController.editUser))

// *******************************************
// DELETE/DESTROY- removes a single user
// *******************************************
router.delete('/:id', wrapAsyncErrors(userController.deleteUser))


export default router