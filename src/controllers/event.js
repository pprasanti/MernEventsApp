import EventDTO from '../dto/event.js'
import eventService from '../services/event.js'
import AppError from '../utils/AppErrors.js'

const eventController = {

    seedEvents: async (req, res) => {
        const result = await eventService.seedEvents()

        // res.status(200).json(result)
        res.redirect('/events')
    },

    createEvent: async (req, res, next) => {
        console.log("Path : controller - callback from router after validation");
        console.log("Path : DTO - Initialize DTO inside the controller from the request object");
        console.log("Path : Services - inside the controller use Services to process the DTO Object");
        // if (!req.body.name) throw new AppError(400, 'Invalid Event data')
        const result = await eventService.createEvent(new EventDTO(req.body))
        // return res.status(200).json(result);
        res.redirect(`/events/${result._id}`);
    },

    newEvent: async (req, res) => {
        res.render('event/new')
    },

    updateEvent: async (req, res) => {
        const { id } = req.params;
        const eventUpd = await eventService.updateEvent(id, new EventDTO(req.body))
        // return res.status(201).json(eventUpd);
        res.redirect('/events');
    },

    getEvents: async (req, res, next) => {
        console.log("Path : controller");
        const events = await eventService.getEvents()
        if (!events) {
            return next(new AppError(404, 'Product Not Found!'))
        }
        // res.status(200).json(events)
        res.render('event/index', { events })
    },

    showEvent: async (req, res, next) => {
        const { id } = req.params
        const event = await eventService.getEventById(id)
        if (!event) {
            return next(new AppError(404, 'Product Not Found!'))
        }
        // res.status(200).json(event)
        res.render('event/show', { event })
    },

    editEvent: async (req, res, next) => {
            const { id } = req.params
            const event = await eventService.getEventById(id)
            if (!event) {
                // return next(new AppError(404, 'Product Not Found!'))
                throw new AppError(404, 'Product Not Found!')
            }
            // res.status(200).json(event)
            res.render('event/edit', { event })
        
    },

    deleteEvent: async (req, res) => {
        //get new data from req.body
        const { id } = req.params;
        const result = eventService.deleteEvent(id)

        // res.status(200).send("Event Deleted!!!")
        res.redirect('/events');
    }
}

// function wrapAsync(fn) {
//     return function (req, res, next) {
//         fn(req, res, next).catch(e => next(e))
//     }

// }

export default eventController
