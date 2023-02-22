import {
    seedEvents,
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent
} from './../mongo/modules/event.js'

const eventDb = {
    seedEvents,
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent
}

export default  eventDb


