import express from 'express'
import cors from 'cors';
import methodOverride from 'method-override'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'
// import MongoDBStore from 'connect-mongo'
import mongoSanitize from 'express-mongo-sanitize'

import eventRouter from './routes/eventRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
// import authPassportRoutes from './routes/authPassportRoutes.js'

import authMiddleware from './middleware/authMiddleware.js';

// Inject DB Provider type & connect to DB
import { loadConfig } from './config/loadConfig.js';
import { connectDB } from './db/connection.js';
import AppError from './utils/AppErrors.js';
import userAuthenticate from './middleware/passportMiddleware.js';
import User from './db/mongo/models/userModel.js';
import wrapAsyncErrors from './utils/AsyncErrorHandle.js';
import initializeData from './db/mongo/services/initializeData.js';

const app = new express();

loadConfig()
connectDB(process.env.DB_PROVIDER)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(cors());
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use(session({
    // store,
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 ^ 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // secure: true
    }
}));
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new LocalStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// authMiddleware()

app.use('/auth', authRouter);
app.use('/events', eventRouter)
// app.use('/events', authMiddleware, eventRouter)
app.use('/events/:eid/comments', commentRouter)
app.use('/users', userRouter)

app.post('/initializeData', (req, res) => {
    console.log('Initializing');
    initializeData()
})

app.get('/', (req, res) => {
    res.status(200).json({ message: `Welcome to Nodejs APP ${process.env.APP_ENV} Environment !` })
})

app.all('*', (req, res, next) => {
    next(new AppError(404, 'Page Not Found'))
})

app.use((err, req, res, next) => {
    const {
        errorCode = 500,
        message = "Something went wrong!"
    } = err
    res.json({ errorCode, message })
})

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`)
})
