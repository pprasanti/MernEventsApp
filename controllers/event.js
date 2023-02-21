
import Event from "../models/event.js";
import seedEvents from "../db/seeds/event.js";

const eventController = {

    async seedEvents() {
        await Event.insertMany(seedEvents)
            .then(data => console.log("Seed Events successfuly!!"))
            .catch(err => console.error("Failed while running seed."))
    },

    async createEvent(event) {
        // Single insert
        return await event.save()
            .then(data => {
                data.fullName = data.fullName
                console.log(data.fullName)
                return data
            })
            .catch(err => console.error(`ERRRRRR ${err} `));
    },

    async updateEvent(
        { id, event }
    ) {
        const eventUpd = await Event.findByIdAndUpdate(id, event, { new: true, runValidators: true })
            .then(data => data)
            .catch(err => console.error(err))
        return eventUpd
    },

    async getEvents() {
        const events = await Event.find({ __v: 0 })
            .then(data => data)
            .catch(err => console.error(err))

        return events
    },

    async getEvent(id) {
        const event = await Event.findById(id, { _id: 0, __v: 0 })
            .then(data => data)
            .catch(err => console.error(err))

        return event
    },

    async deleteEvent(id) {
        return await Event.deleteOne({ _id: id }).catch(err => console.error(err))
    },
}

export default eventController
