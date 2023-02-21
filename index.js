import express from 'express'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import methodOverride from 'method-override'
import eventRouter from './routes/events.js'
import { connect } from './config/mongoConnections.js'

// Connect to DB
connect()

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
