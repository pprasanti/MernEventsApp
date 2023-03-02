import express from 'express';
import eventController from '../controllers/eventController.js';
import { saveValidation, checkBodyAndQuery, validateData } from './../validations/event.js'

const router = express.Router()

router.get("/seed", eventController.seedEvents)

router.get("/", eventController.getEvents)

router.get('/:id', checkBodyAndQuery('id').isUUID(), eventController.showEvent)

router.post("/", saveValidation, eventController.createEvent)

router.patch('/:id', saveValidation, checkBodyAndQuery('id').isUUID(), eventController.updateEvent)

router.delete('/:id', checkBodyAndQuery('id').isUUID(), eventController.deleteEvent)


export default router