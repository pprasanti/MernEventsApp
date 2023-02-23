import express from 'express';
import eventService from '../controller/event.js';
import Event from './../models/event.js';
import eventRepository from '../db/injectable/event.js';
import Comment from '../models/comment.js';
import commentService from '../controller/comment.js';
import commentRepository from '../db/injectable/comment.js';
import wrapAsynch from '../utils/AsynchErrorHandle.js';

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// **********************************
// INDEX - renders multiple events
// **********************************
router.get(
    '/',
    wrapAsynch(async (req, res) => {
        const events = await eventService.getEvents({ eventRepository })

        // res.status(200).json(events)
        res.render('event/index', { events })
    })
)


// **********************************
// INDEX - renders multiple events
// **********************************
router.get('/seed', wrapAsynch(async (req, res) => {
    const events = await eventService.seedEvents({ eventRepository })

    // res.status(200).json(events)
    res.redirect('/events')
})
)

// **********************************
// NEW - renders a form
// **********************************
router.get('/new', (req, res) => {
    res.render('event/new')
})

// **********************************
// CREATE - creates a new event
// **********************************
router.post('/', wrapAsynch(async (req, res) => {
    const event = new Event(req.body);

    const newEvent = await eventService.createEvent({ eventRepository }, event)
    // res.json(newEvent)
    res.redirect('/events');
})
)

// *******************************************
// SHOW - details about one particular event
// *******************************************
router.get('/:id', wrapAsynch(async (req, res) => {
    const { id } = req.params
    // const event = await eventService.getEvent({ eventRepository }, id)
    const event = await commentService.getCommentsByEventId({ commentRepository }, id)

    // res.json(event)
    res.render('event/show', { event })
})
)

// *******************************************
// EDIT - renders a form to edit an event
// *******************************************
router.get('/:id/edit', wrapAsynch(async (req, res) => {
    const { id } = req.params
    // const event = await eventService.getEvent({ eventRepository }, id)
    const event = await commentService.getCommentsByEventId({ commentRepository }, id)

    // res.json(event)
    res.render('event/edit', { event })
})
)

// *******************************************
// UPDATE - updates a particular event
// *******************************************
router.patch('/:id', wrapAsynch(async (req, res) => {
    const { id } = req.params;
    //get new data from req.body
    const event = req.body;

    const eventUpd = await eventService.updateEvent({ eventRepository }, { id, event })
    // res.json(eventUpd)
    //redirect back to index (or wherever you want)
    res.redirect('/events');
})
)

// *******************************************
// DELETE/DESTROY- removes a single event
// *******************************************
router.delete('/:id', wrapAsynch(async (req, res) => {
    //get new data from req.body
    const { id } = req.params;
    const newEvent = await eventService.deleteEvent({ eventRepository }, id)

    //redirect back to index (or wherever you want)
    // res.status(200).send("Event Deleted!!!")
    res.redirect('/events');
})
)

// =================================
//  Comment Router Starts here
// =================================

// **********************************
// INDEX - renders multiple comments
// **********************************
router.get(
    '/:eid/comments/',
    wrapAsynch(async (req, res) => {
        const { eid } = req.params
        const { name, comments } = await commentService.getCommentsByEventId({ commentRepository }, eid)

        // res.status(200).json(comments)
        res.render('comment/index', { eid, name, comments })
    })
)

// **********************************
// NEW - renders a form
// **********************************
router.get('/:eid/comments/new', wrapAsynch(async (req, res) => {
    const { eid } = req.params
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    res.render('comment/new', { eid, name })
})
)

// **********************************
// CREATE - creates a new comment
// **********************************
router.post('/:eid/comments/', wrapAsynch(async (req, res) => {
    const { eid } = req.params
    const { text, rating } = req.body;
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    const comment = new Comment({ text, rating });

    const newComment = await commentService.createComment({ commentRepository }, { eid, comment })
    // res.json(newComment)
    res.redirect(`/events/${eid}/comments`);
})
)

// *******************************************
// SHOW - details about one particular comment
// *******************************************
router.get('/:eid/comments/:id', wrapAsynch(async (req, res) => {
    const { eid, id } = req.params
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    const comment = await commentService.getComment({ commentRepository }, id)

    // res.json(comment)
    res.render('comment/show', { eid, name, id, comment })
})
)

// *******************************************
// EDIT - renders a form to edit an comment
// *******************************************
router.get('/:eid/comments/:id/edit', wrapAsynch(async (req, res) => {
    const { eid, id } = req.params
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    const comment = await commentService.getComment({ commentRepository }, id)

    // res.json(comment)
    res.render('comment/edit', { eid, name, id, comment })
})
)

// *******************************************
// UPDATE - updates a particular comment
// *******************************************
router.patch('/:eid/comments/:id', wrapAsynch(async (req, res) => {
    const { eid, id } = req.params;
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    const { text, rating } = req.body;
    const comment = new Comment({ text, rating }, { _id: 0 });

    const commentUpd = await commentService.updateComment({ commentRepository }, { id, comment })
    // res.json(commentUpd)
    //redirect back to index (or wherever you want)
    res.redirect(`/events/${eid}/comments`);
})
)

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
router.delete('/:eid/comments/:id', wrapAsynch(async (req, res) => {
    //get new data from req.body
    const { eid, id } = req.params;
    const { name } = await eventService.getEvent({ eventRepository }, eid)
    const newComment = await commentService.deleteComment({ commentRepository }, id)

    //redirect back to index (or wherever you want)
    // res.status(200).send("Comment Deleted!!!")
    res.redirect(`/events/${eid}/comments`);
})
)

export default router