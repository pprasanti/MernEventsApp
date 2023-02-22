import { dbConnect } from './../mongoConnections.js'
import { loadConfig } from '../../../config/index.js'
import { seedEvents } from './event.js'
import { seedUsers } from './user.js'

export const seedDB = async () => {
    loadConfig()
    dbConnect()

    seedUsers()
    seedEvents()

}
