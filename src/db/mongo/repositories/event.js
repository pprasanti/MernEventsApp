import Event from '../../../db/mongo/models/event.js'
import EventDTO from '../../../dto/event.js';
import { seedEventsDb } from '../seeds/event.js';

// Seed Events
export async function seedEvents() {
    await seedEventsDb()
}

// Add a new Event
export async function createEvent(eventDTO) {
    console.log("Path : db/mongo/repositories - Called from Services");
    console.log("Path : db/mongo/models - Initialize the model-schema From the DTO object & process the DB Operation");
    const event = new Event(eventDTO)
    return await event.save()
}

// Update Event
export async function updateEvent(id, eventDTO) {
    return await Event.findByIdAndUpdate(id, eventDTO, { new: true, runValidators: true })
}

// Get All Events
export async function getEvents() {
    return await Event.find({}, { __v: 0 })
}

// Get Events By id
export async function getEventById(id) {
    return await Event.findById(id, { __v: 0 }).populate('comments')
}

// Delete a Event
export async function deleteEvent(id) {
    // Implement middleware to delete all relevant comments
    return await Event.findByIdAndDelete(id)
}
