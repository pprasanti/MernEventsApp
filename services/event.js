const eventService = {

    async seedEvents({ eventRepository }) {
        return await eventRepository.seedEvents()
    },

    async createEvent({ eventRepository }, event) {
        return await eventRepository.createEvent(event)
    },

    async updateEvent({ eventRepository }, { id, event }) {
        return await eventRepository.updateEvent({ id, event })
    },

    async getEvents({ eventRepository }) {
        return await eventRepository.getEvents()
    },

    async getEvent({ eventRepository }, id) {
        return await eventRepository.getEvent(id)
    },

    async deleteEvent({ eventRepository }, id) {
        return await eventRepository.deleteEvent(id)
    },
}

export default eventService
