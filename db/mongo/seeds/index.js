import { dbConnect } from './../mongoConnections.js'
import Event from './../../../models/event.js'
import seedEvents from './event.js'
import { loadConfig } from '../../../config/index.js'

export const seedDB = async () => {
    loadConfig()
    dbConnect()

    await Event.deleteMany({})
        .then(data => console.log("Deleted all Events successfuly!!"))
        .catch(err => console.error("Failed while Deleting all."))

    await Event.insertMany(seedEvents)
        .then(data => console.log("Seed Events successfuly!!"))
        .catch(err => console.error("Failed while running seed."))

}

// seedDB()