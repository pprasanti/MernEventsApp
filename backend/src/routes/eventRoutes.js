import express from 'express';
import eventController from '../controllers/eventController.js';
import wrapAsyncErrors from '../utils/AsyncErrorHandle.js';
import { saveValidation, checkBodyAndQuery, validateData } from './../validations/event.js'

const router = express.Router()

console.log(`process.env.AUTH_TYPE : ${process.env.AUTH_TYPE}`)

router.get("/seed", wrapAsyncErrors(eventController.seedEventsData))

router.route('/')
    .get(wrapAsyncErrors(eventController.getEvents))
    .post(saveValidation, wrapAsyncErrors(eventController.createEvent))

router.route('/:id')
    .get(checkBodyAndQuery('id').isUUID(), wrapAsyncErrors(eventController.showEvent))
    .patch(saveValidation, checkBodyAndQuery('id').isUUID(), wrapAsyncErrors(eventController.updateEvent))
    .delete(checkBodyAndQuery('id').isUUID(), wrapAsyncErrors(eventController.deleteEvent))


export default router