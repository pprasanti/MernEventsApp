import mongoose from 'mongoose'

mongoose.set('strictQuery', false);

const state = {
    db: null

}

export function connect() {
    const url = "mongodb://localhost:27017/"
    const dbName = "eventivesys"

    // To handle initial connection errorscusing promises
    mongoose.connect(`${url}${dbName}`, { useNewURLParser: true, useUnifiedTopology: true, connectTimeoutMS: 100 })
        .then(() => {
                /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
                console.log('Promise Success!!!!!!!!')
            },
        )
        .catch(error => console.log('ERROR 222 !!!'));


    // // To handle errors after initial connection was established, you should listen for error events on the connection.
    // state.db = mongoose.connection;
    // state.db.on('error', err => console.log('Error while connecting!'))
    // state.db.once('open', () => console.log('someone connected!'))

}

export function get() {
    return state.db
}