import express from 'express'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import methodOverride from 'method-override'
import eventRouter from './routes/events.js'
import dotenv from 'dotenv'
// Connect to DB
// import { connect } from './db/mongoConnections.js'
// connect()

// Inject DB Provider type & connect to DB
import {connectDB} from './db/connection.js';

dotenv.config()
connectDB(process.env.DB_PROVIDER_MONGO)

const app = new express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'))
app.set('view engine', 'ejs')

app.use('/events', eventRouter)

app.get('/', (req, res) => {
    res.json({ kk: "Welcome to Node JS App!!!" })
})

app.listen(3000, () => {
    console.log('Listen to port 3000')
})
