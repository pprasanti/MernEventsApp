import express from 'express';
import eventController from '../controllers/event.js';
import { wrapAsyncErrors } from '../utils/AsyncErrorHandle.js';
import { saveValidation, checkBodyAndQuery, validateData } from './../validations/event.js'

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("========= Start from Route =========");
    console.log("Path : event router");
    console.log("Path : event router middleware");
    next()
})

// **********************************
// INDEX - Seed multiple events
// **********************************
router.get("/seed", eventController.seedEvents)

// **********************************
// INDEX - renders multiple events
// **********************************
router.get("/", wrapAsyncErrors(eventController.getEvents))

// **********************************
// NEW - renders a form
// **********************************
router.get('/new', wrapAsyncErrors(eventController.newEvent))

// **********************************
// CREATE - creates a new event
// **********************************
router.post("/", saveValidation, wrapAsyncErrors(eventController.createEvent))

// *******************************************
// SHOW - details about one particular event
// *******************************************
router.get('/:id', checkBodyAndQuery('id').isUUID(), eventController.showEvent)

// *******************************************
// EDIT - renders a form to edit an event
// *******************************************
router.get('/:id/edit', checkBodyAndQuery('id').isUUID(), eventController.editEvent)

// *******************************************
// UPDATE - updates a particular event
// *******************************************
router.patch('/:id', saveValidation, checkBodyAndQuery('id').isUUID(), eventController.updateEvent)

// *******************************************
// DELETE/DESTROY- removes a single event
// *******************************************
router.delete('/:id', checkBodyAndQuery('id').isUUID(), eventController.deleteEvent)


export default router