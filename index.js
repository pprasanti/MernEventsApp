import express from 'express'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import methodOverride from 'method-override'
import eventRouter from './routes/event.js'
import userRouter from './routes/user.js'
import { seedDB } from './db/mongo/seeds/index.js';

// Inject DB Provider type & connect to DB
import { loadConfig } from './config/index.js';
import { connectDB } from './db/connection.js';

const app = new express();

loadConfig()
connectDB(process.env.DB_PROVIDER_MONGO)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'))
app.set('view engine', 'ejs')

app.use('/events', eventRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.render('index')
    // res.json({ "Welcome to Node JS App!!!" })
})

app.get('/seed', (req, res) => {
    seedDB()
})

app.listen(3000, () => {
    console.log('Listen to port 3000')
})
