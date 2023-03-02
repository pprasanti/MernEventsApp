import express from 'express'
import cors from 'cors';
import methodOverride from 'method-override'

import eventRouter from './routes/eventRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import userRouter from './routes/userRoutes.js'

// import authMiddleware from './middleware/authMiddleware.js';

// Inject DB Provider type & connect to DB
import { loadConfig } from './config/loadConfig.js';
import { connectDB } from './db/connection.js';
import AppError from './utils/AppErrors.js';

const app = new express();

loadConfig()
connectDB(process.env.DB_PROVIDER)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(cors());

// authMiddleware()

app.use('/events', eventRouter)
app.use('/events/:eid/comments', commentRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.status(200).json({message: `Welcome to Nodejs APP ${process.env.APP_ENV} Environment !`})
})

app.all('*', (req, res, next) => {
    next(new AppError(404, 'Page Not Found'))
})

app.use((err, req, res, next) => {
    const {
        status = 500,
        message = "Something went wrong!"
    } = err
    res.status(status).send(message)
})

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`)
})
