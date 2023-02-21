import mongoose from 'mongoose'

export function connect() {
    mongoose.set('strictQuery', false);
    const url = 'mongodb+srv://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD
        + '@' + process.env.MONGODB_CLUSTER + '/' + process.env.MONGODB_DB + '?retryWrites=true&w=majority'

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