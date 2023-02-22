import {
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent
} from './../mongo/modules/event.js'

const eventDb = {
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent
}

export default  eventDb


