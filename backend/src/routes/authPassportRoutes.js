import express from 'express';
import passport from 'passport';
import authController from '../controllers/authController.js';
import wrapAsyncErrors from './../utils/AsyncErrorHandle.js'

const router = express.Router()

console.log(`process.env.AUTH_TYPE : ${process.env.AUTH_TYPE}`)

router.post('/register', wrapAsyncErrors(authController.passportRegister))
router.post('/login', passport.authenticate('local', { failWithError: 'kkkk' }), wrapAsyncErrors(authController.passportLogin))
router.post('/logout', passport.authenticate('local', { failWithError: 'kkkk' }), wrapAsyncErrors(authController.passportLogout))


export default router