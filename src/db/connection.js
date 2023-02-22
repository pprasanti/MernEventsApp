import { dbConnect as mongoConnection } from "./mongo/mongoConnections.js"

// provider: String,
export function connectDB(provider) {
    if (process.env.DB_PROVIDER_MONGO = provider) {
        console.log("Connecting to Mongo DB Providers......")
        mongoConnection()
    } else {
        console.log("No Other DB Providers available!!!")
    }
}
