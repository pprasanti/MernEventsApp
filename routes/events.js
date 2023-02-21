import express from 'express';
import eventService from '../services/event.js';
import Event from './../models/event.js';
import eventRepository from '../db/mongo/repositories/event.js';

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// **********************************
// INDEX - renders multiple events
// **********************************
router.get('/', async (req, res) => {
    try {
        const events = await eventService.getEvents({ eventRepository })

        // res.status(200).json(events)
        res.render('events/index', { events })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})


// **********************************
// INDEX - renders multiple events
// **********************************
router.get('/seed', async (req, res) => {
    try {
        const events = await eventService.seedEvents({ eventRepository })

        // res.status(200).json(events)
        res.redirect('/events')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// **********************************
// NEW - renders a form
// **********************************
router.get('/new', (req, res) => {
    res.render('events/new')
})

// **********************************
// CREATE - creates a new event
// **********************************
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);

        const newEvent = await eventService.createEvent({ eventRepository }, event)
        // res.json(newEvent)
        res.redirect('/events');
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// SHOW - details about one particular event
// *******************************************
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const event = await eventService.getEvent({ eventRepository }, id)

        // res.json(event)
        res.render('events/show', { event })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// EDIT - renders a form to edit an event
// *******************************************
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    try {
        const event = await eventService.getEvent({ eventRepository }, id)

        // res.json(event)
        res.render('events/edit', { id, event })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// UPDATE - updates a particular event
// *******************************************
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    //get new data from req.body
    const event = req.body;

    try {
        const eventUpd = await eventService.updateEvent({ eventRepository }, { id, event })
        // res.json(eventUpd)
        //redirect back to index (or wherever you want)
        res.redirect('/events');
    } catch (err) {
        console.log(err)
        // res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// DELETE/DESTROY- removes a single event
// *******************************************
router.delete('/:id', async (req, res) => {
    //get new data from req.body
    const { id } = req.params;
    try {
        const newEvent = await eventService.deleteEvent({ eventRepository }, id)

        //redirect back to index (or wherever you want)
        // res.status(200).send("Event Deleted!!!")
        res.redirect('/events');
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

export default router