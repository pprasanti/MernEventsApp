import { connect } from './db/mongoConnections.js'
import dotenv from 'dotenv'
import Event from './../../models/event.js'
import seedEvents from './event.js'

// Connect to DB
dotenv.config({path: './env/mongo.env'})
connect()

const seedDB = async () => {
    await Event.deleteMany({})
    .then(data => console.log("Deleted all Events successfuly!!"))
    .catch(err => console.error("Failed while Deleting all."))

    await Event.insertMany(seedEvents)
    .then(data => console.log("Seed Events successfuly!!"))
    .catch(err => console.error("Failed while running seed."))

}

seedDB()