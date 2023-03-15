import { dbConnect as mongoConnection } from "./mongo/mongoConnections.js"

// provider: String,
export function connectDB(provider) {
    if ('mongo' == provider) {
        console.log("Connecting to Mongo DB Providers......")
        mongoConnection()
    } else {
        console.log("No Other DB Providers available!!!")
    }
}
