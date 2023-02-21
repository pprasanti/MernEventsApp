import mongoose from 'mongoose'


const state = {
    db: null
}

export function connect() {
    // const url = `mongodb://localhost:27017/${process.env.MONGODB_DB}`
    // const url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/${process.env.MONGODB_DB}?authSource=admin`
    mongoose.set('strictQuery', false);
    const url = 'mongodb+srv://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD
        + '@cluster0.x4li7l5.mongodb.net/' + process.env.MONGODB_DB + '?retryWrites=true&w=majority'

    // To handle initial connection errorscusing promises
    mongoose.connect(url,
        { useNewURLParser: true, useUnifiedTopology: true, connectTimeoutMS: 100 })
        .then(() => {
            /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
            console.log('Successfully connected to MongoDB Atlas!')
        })
        .catch(error => {
            console.log('Unable to connect to MongoDB Atlas!');
            console.log(`ERROR Connecting DB : ${error}`)
        });
}

export function get() {
    return state.db
}