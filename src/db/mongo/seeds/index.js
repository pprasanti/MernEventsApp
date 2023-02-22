import { dbConnect } from './../mongoConnections.js'
import { loadConfig } from '../../../config/index.js'
import { seedEventsDb } from './event.js'
import { seedUsersDb } from './user.js'

export const seedDB = async () => {
    loadConfig()
    dbConnect()

    seedUsersDb()
    seedEventsDb()

}
