import express from 'express'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import methodOverride from 'method-override'
import eventRouter from './routes/event.js'
import commentRouter from './routes/comment.js'
import userRouter from './routes/user.js'
import { seedDB } from './db/mongo/seeds/index.js';
import ejsMate from 'ejs-mate'

// Inject DB Provider type & connect to DB
import { loadConfig } from './config/loadConfig.js';
import { connectDB } from './db/connection.js';
// import morgan from 'morgan';
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

console.log("Path : server.js");

// app.use(morgan('tiny'))
app.use((req, res, next) => {
    console.log(`Method : ${req.method}`);
    req.user = 'Prasanti'
    req.query = { password: 123456 }

    next()
})

const authUser = (req, res, next) => {
    console.log("Path : server.js router middleware");
    const { password } = req.query

    if (password == '123456') {
        next()
    } else {
        res.status(400).send("UNAUTHORIZED")
    }
}

app.use('/events', authUser, eventRouter)
app.use('/events/comments', authUser, commentRouter)
app.use('/users', authUser, userRouter)

app.get('/', (req, res) => {
    res.render('index')
    // res.json({ msg: `${req.user} Welcome to Node JS App!!!` })
})

app.get('/seed', authUser, async (req, res) => {
    await seedDB()
    res.render('index')
})

app.use((req, res, next) => {
    res.status(400).json({ "message": "Data not found" })

})

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`)
})
