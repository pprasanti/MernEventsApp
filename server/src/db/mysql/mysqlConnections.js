import mongoose from 'mongoose'

const state = {
    db: null
}

export function dbConnect() {
    if (!state.db) {
        mongoose.set('strictQuery', false);
        const uri = 'mongodb+srv://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD
            + '@' + process.env.MONGODB_CLUSTER + '/' + process.env.MONGODB_DB + '?retryWrites=true&w=majority'

        // To handle initial connection errorscusing promises
        mongoose.connect(
            uri,
            { useNewURLParser: true, useUnifiedTopology: true },
        )
            .then((data) => {
                /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
                console.log('Successfully connected to MongoDB Atlas!')
                state.db = true
            })
            .catch(error => {
                console.log('Unable to connect to MongoDB Atlas!');
                console.log(`ERROR Connecting DB : ${error}`)
                state.db = false
            });
    }

}
