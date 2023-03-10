import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js';
import wrapAsyncErrors from './../utils/AsyncErrorHandle.js'

const router = express.Router()

router.get('/seed', wrapAsyncErrors(userController.seedUsersData))

router.route('/')
  .get(wrapAsyncErrors(userController.getUsers))
  .post(wrapAsyncErrors(userController.createUser))

router.route('/:id')
  .patch(wrapAsyncErrors(userController.updateUser))
  .get(wrapAsyncErrors(userController.showUser))
  .delete(wrapAsyncErrors(userController.deleteUser))

router.get('/greet', wrapAsyncErrors(userController.greet))

export default router