import Event from '../../../models/event.js'
import { seedEventsDb } from '../seeds/event.js';


// Seed Events
export async function seedEvents() {
    await seedEventsDb()
}

// Add a new Event
export async function createEvent(event) {
    // Single insert
    return await event.save()
}

// Update Event
export async function updateEvent(
    { id, event }
) {
    return await Event.findByIdAndUpdate(id, event, { new: true, runValidators: true })
}

// Get All Events
export async function getEvents() {
    return await Event.find({}, { __v: 0 })
}

// Get Events By id
export async function getEventById(id) {
    return await Event.findById(id, { __v: 0 })
}

// Delete a Event
export async function deleteEvent(id) {
    // Implement middleware to delete all relevant comments
    return await Event.findByIdAndDelete(id)
}
