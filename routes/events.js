import express from 'express';
import eventInteractor from './../controllers/eventInteractor.js'
import eventPersistence from './../models/eventPersistence.js'
import emailPersistence from './../models/emailPersistence.js'

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

console.dir(eventInteractor)

// **********************************
// INDEX - renders multiple events
// **********************************
router.get('/', async (req, res) => {
    try {
        const events = await eventInteractor.getEvents({ eventPersistence })

        res.json(events)
        // res.render('events/index', { events })
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
        const event = await eventInteractor.getEvent({ eventPersistence }, id)

        res.json(event)
        // res.render('events/edit', { event })
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
    const { name, address } = req.body;
    try {
        const newEvent = await eventInteractor.createEvent(
            { eventPersistence, emailPersistence },
            { name, address }
        )
        res.json(newEvent)
        // res.render('/events');
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
        const event = await eventInteractor.getEvent({ eventPersistence }, id)

        res.json(event)
        // res.render('events/show', { event })
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
    const { name, address } = req.body;
    try {
        const event = await eventInteractor.updateEvent(
            { eventPersistence, emailPersistence },
            { id, name, address }
        )

        //redirect back to index (or wherever you want)
        res.json(event)
        // res.render('/events')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// DELETE/DESTROY- removes a single event
// *******************************************
router.delete('/:id', async (req, res) => {
    //get new data from req.body
    const { id } = req.params;
    try {
        const newEvent = await eventInteractor.deleteEvent(
            { eventPersistence },
            id
        )

        //redirect back to index (or wherever you want)
        res.status(200).send("Event Deleted!!!")
        // res.render('/events')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

export default router