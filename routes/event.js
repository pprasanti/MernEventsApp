import express from 'express';
import eventService from '../services/event.js';
import Event from './../models/event.js';
import eventRepository from '../db/mongo/repositories/event.js';
import Comment from '../models/comment.js';
import commentService from '../services/comment.js';
import commentRepository from '../db/mongo/repositories/comment.js';

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
        res.render('event/index', { events })
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
    res.render('event/new')
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
        res.render('event/show', { event })
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
        res.render('event/edit', { id, event })
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

// =================================
//  Comment Router Starts here
// =================================

// **********************************
// INDEX - renders multiple comments
// **********************************
router.get('/:eid/comments/', async (req, res) => {
    try {
        const { eid } = req.params
        const {name, comments} = await commentService.getComments({ commentRepository}, {eid})

        // res.status(200).json(comments)
        res.render('comment/index', { eid, name, comments })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// **********************************
// NEW - renders a form
// **********************************
router.get('/:eid/comments/new', async (req, res) => {
    const { eid } = req.params
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    res.render('comment/new', { eid, name })
})

// **********************************
// CREATE - creates a new comment
// **********************************
router.post('/:eid/comments/', async (req, res) => {
    try {
        const { eid } = req.params
        const { text, rating } = req.body;
        const { name } = await eventService.getEvent({ eventRepository }, eid)
        const comment = new Comment({ text, rating });

        const newComment = await commentService.createComment({ commentRepository }, { eid, comment })
        // res.json(newComment)
        res.redirect(`/events/${eid}/comments`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message)
    }
})

// *******************************************
// SHOW - details about one particular comment
// *******************************************
router.get('/:eid/comments/:id', async (req, res) => {
    const { eid, id } = req.params
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    try {
        const comment = await commentService.getComment({ commentRepository }, id)

        // res.json(comment)
        res.render('comment/show', { eid, name, id, comment })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// EDIT - renders a form to edit an comment
// *******************************************
router.get('/:eid/comments/:id/edit', async (req, res) => {
    const { eid, id } = req.params
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    try {
        const comment = await commentService.getComment({ commentRepository }, id)

        // res.json(comment)
        res.render('comment/edit', { eid, name, id, comment })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// UPDATE - updates a particular comment
// *******************************************
router.patch('/:eid/comments/:id', async (req, res) => {
    const { eid, id } = req.params;
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    const { text, rating } = req.body;
    const comment = new Comment({ text, rating }, { _id: 0 });

    try {
        const commentUpd = await commentService.updateComment({ commentRepository }, { id, comment })
        // res.json(commentUpd)
        //redirect back to index (or wherever you want)
        res.redirect(`/events/${eid}/comments`);
    } catch (err) {
        console.log(err)
        // res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
router.delete('/:eid/comments/:id', async (req, res) => {
    //get new data from req.body
    const { eid, id } = req.params;
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    try {
        const newComment = await commentService.deleteComment({ commentRepository }, id)

        //redirect back to index (or wherever you want)
        // res.status(200).send("Comment Deleted!!!")
        res.redirect(`/events/${eid}/comments`);
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

export default router