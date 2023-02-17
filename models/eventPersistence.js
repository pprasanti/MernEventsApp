
// import db from 'mysql'
import { v4 as uuid } from 'uuid'

const eventPersistent = {

    events:
        [
            {
                id: 1,
                name: "Event 1",
                address: "Address 1"
            },
            {
                id: 2,
                name: "Event 2",
                address: "Address 2"
            },
            {
                id: 3,
                name: "Event 3",
                address: "Address 3"
            },
            {
                id: 4,
                name: "Event 4",
                address: "Address 4"
            },
            {
                id: 5,
                name: "Event 5",
                address: "Address 5"
            }
        ],

    createEvent(event) {
        console.log(event)
        event.id = uuid();
        this.events.push(event)

        // const connection = db.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: '',
        //     database: 'test'
        // })

        // connection.connect()

        // connection.query(
        //     `INSERT INTO events (name, address) VALUES (${name}, ${address}) `,
        //     (err, result, fields) => {
        //         if(err){
        //             console.log(err)
        //             res.status(500).send('Internal Server Error!!!')
        //         } else {
        //             res.status(201).send('User Created!')
        //         }
        //     }
        // )

        // connection.end()

        return event

    },

    updateEvent(event) {
        const eventFind = this.events.find(c => c.id == event.id);

        //update the data with the data from req.body:
        eventFind.name = event.name
        eventFind.address = event.address

        return true
        
    },

    getEvents() {
        return this.events;
    },

    getEvent(id) {
        return this.events.find(e => e.id == id)
    },

    deleteEvent(id) {
        this.events.splice(this.events.findIndex(e => e.id == id), 1)
        return true;
    }
}

export default eventPersistent
