import express from 'express'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import methodOverride from 'method-override'
import eventRouter from './routes/event.js'
import userRouter from './routes/user.js'
import { seedDB } from './db/mongo/seeds/index.js';
import ejsMate from 'ejs-mate'

// Inject DB Provider type & connect to DB
import { loadConfig } from './config/index.js';
import { connectDB } from './db/connection.js';
import morgan from 'morgan';
import { verify } from 'crypto';
/*
import cors from 'cors';
app.use(cors());
*/

const app = new express();

loadConfig()
connectDB(process.env.DB_PROVIDER_MONGO)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'))

app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.user = 'Prasanti'
    req.query = { password: 123456 }
    console.log(req.method, req.path)

    next()
})

const authUser = (req, res, next) => {
    const { password } = req.query
    console.log(req.query, password)

    if (password == '123456') {
        next()
    } else {
        res.status(400).send("UNAUTHORIZED")
    }
}

app.use('/events', authUser, eventRouter)
app.use('/users', authUser, userRouter)

app.get('/', (req, res) => {
    res.render('index')
    // res.json({ msg: `${req.user} Welcome to Node JS App!!!` })
})

app.get('/seed', authUser, (req, res) => {
    seedDB()
})

app.use((req, res, next) => {
    res.status(400).send("NOT FOUND")

})

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`)
})
