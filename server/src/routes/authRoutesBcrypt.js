import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js';
import wrapAsyncErrors from './../utils/AsyncErrorHandle.js'

const router = express.Router()

router.post("/register", wrapAsyncErrors(userController.register))
router.post("/login", wrapAsyncErrors(userController.login))
router.post("/logout", wrapAsyncErrors(userController.logout))


export default router