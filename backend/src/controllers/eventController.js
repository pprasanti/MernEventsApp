import EventDTO from '../dto/eventDTO.js'
import AppError from '../utils/AppErrors.js'
import {
    seedEvents,
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent
} from './../interfaces/eventInterface.js'


const eventController = {

    seedEventsData: ({ seedEvents }, async (req, res, next) => {
        const result = await seedEvents()
        res.json({ status: 200, message: "Events seeds successfully!", data: result })
    }),

    createEvent: ({ createEvent }, async (req, res, next) => {
        const Event = new EventDTO(req.body)
        Event.validate();

        const result = await createEvent(Event)
        return res.json([{ data: result }, { status: 200 }]);
    }),

    updateEvent: ({ updateEvent }, async (req, res) => {
        const { id } = req.params;
        const Event = new EventDTO(req.body)
        Event.validate();

        const eventUpd = await updateEvent(id, new EventDTO(req.body))
        return res.status(201).json(eventUpd);
    }),

    getEvents: (({ getEvents }, async (req, res, next) => {
        const events = await getEvents()
        if (!events) {
            return next(new AppError(404, 'Events Not Found!'))
        }

        res.status(200).json({ data: events, status: 200 })
    })),

    showEvent: ({ getEventById }, async (req, res, next) => {
        const { id } = req.params
        const event = await getEventById(id)
        if (!event) {
            return next(new AppError(404, 'Event Not Found!'))
        }
        res.status(200).json(event)
    }),


    deleteEvent: ({ deleteEvent }, async (req, res) => {
        //get new data from req.body
        const { id } = req.params;
        const result = deleteEvent(id)

        res.status(200).send("Event Deleted!!!")
    })
}

export default eventController
