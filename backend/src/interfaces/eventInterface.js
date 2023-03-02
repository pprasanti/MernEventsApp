import {
    seedEvents,
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent
} from './../db/mongo/services/eventService.js'

import { getEvents as mysqlGetEvents } from './../db/mysql/services/eventService.js'

export {
    seedEvents,
    createEvent,
    updateEvent,
    getEvents,
    getEventById,
    deleteEvent,
    mysqlGetEvents
}


