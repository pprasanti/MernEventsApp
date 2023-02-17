
import { EventEntity } from "./../entity/EventEntity.js";

const eventInteractor = {

    async createEvent(
        { eventPersistence, emailPersistence },
        { name, address }
    ) {

        const event = new EventEntity({ name, address });
        event.validate;

        const newUser = await eventPersistence.createEvent(event);

        // await emailPersistence.sendEmail({
        //     to: email,
        //     subject: 'Welcome!',
        //     body: 'Welcome to the application!!!'
        // })
        return newUser;
    },

    async updateEvent(
        { eventPersistence, emailPersistence },
        { id, name, address }
    ) {

        const event = new EventEntity({ id, name, address });
        event.validate;

        return await eventPersistence.updateEvent(event);

        // await emailPersistence.sendEmail({
        //     to: email,
        //     subject: 'Welcome!',
        //     body: 'Welcome to the application!!!'
        // })
        return event;
    },
    
    async getEvents({ eventPersistence }) {
        return await eventPersistence.getEvents()
    },

    async getEvent({ eventPersistence }, id) {
        return await eventPersistence.getEvent(id)
    },

    async deleteEvent({ eventPersistence }, id) {
        return await eventPersistence.deleteEvent(id)
    },
}

export default eventInteractor
