import {
    seedEvents,
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent
} from './../db/mongo/repositories/event.js'

import { getEvents as mysqlGetEvents } from './../db/mysql/repositories/event.js'

const eventService  = {
    seedEvents,
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent,
    mysqlGetEvents
}

export default  eventService 


