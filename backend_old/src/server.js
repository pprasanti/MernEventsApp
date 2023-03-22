import express from 'express'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import methodOverride from 'method-override'
import eventRouter from './routes/event.js'
import commentRouter from './routes/comment.js'
import userRouter from './routes/user.js'
import { seedDB } from './db/mongo/seeds/index.js';
import ejsMate from 'ejs-mate'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash'

// Inject DB Provider type & connect to DB
import { loadConfig } from './config/loadConfig.js';
import { connectDB } from './db/connection.js';
import AppError from './utils/AppErrors.js';
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
app.use(express.static('src/public'))

app.use(cookieParser('mySecret'))
const sessionOptions = {
    secret: 'appsecret',
    reSave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionOptions))
app.use(flash())


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'))

console.log("Path : server.js");

// app.use(morgan('tiny'))
app.use((req, res, next) => {
    console.log(`Method : ${req.method}`);
    req.user = 'Prasanti'
    req.query.password = 123456

    // locals
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')

    next()
})

const authUser = (req, res, next) => {
    console.log("Path : server.js router middleware");
    const { password } = req.query

    if (password == '123456') {
        next()
    } else {
        // res.status(400).send("UNAUTHORIZED")
        throw new AppError(400, "Password Required!")
    }
}

app.use('/events', authUser, eventRouter)
app.use('/events/:eid/comments', authUser, commentRouter)
app.use('/users', authUser, userRouter)

app.get('/getsignedcookies', (req, res) => {
    // Signed Cookies
    res.cookie('fruit', 'apple', { signed: true })
    res.send({ msg: `Signed Cookies : ` })

})
app.get('/verifycookies', (req, res) => {
    // Signed Cookies
    // res.cookie('fruit', 'apple', {signed: true})
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send({ msg: `Signed Cookies : ` })

})

app.get('/setSession', (req, res) => {
    // res.cookie('fruit', 'apple', {signed: true})
    // const count = 1
    res.send({ msg: `You have viewed this page ${req.session.count} count!!` })

})

app.get('/verifySession', (req, res) => {
    req.session.count = req.session.count ? req.session.count += 1 : 1

    console.log(req.session.count)
    // console.log(req.signedCookies)
    res.send({ msg: `You have viewed this page ${req.session.count} count!!` })

})

// app.get('/register', (req, res) => {
//     const { username = 'Anonymous' } = req.query
//     req.session.username = username
//     console.log(req.query)
//     console.log(req.session.username)
//     // console.log(req.signedCookies)
//     res.redirect('/greet')
//     // res.send({ msg: `Hello Mr. ${req.session.username}!!!` })

// })

// app.get('/greet', (req, res) => {
//     console.log(req.session.username)
//     // console.log(req.signedCookies)
//     res.send({ msg: `Hello Mr. ${req.session.username}!!!` })

// })

app.get('/', (req, res) => {
    res.render('index')
    // res.json({ msg: `${req.user} Welcome to Node JS App!!!` })
})

app.get('/seed', authUser, async (req, res) => {
    await seedDB()
    res.render('index')
})

// const handleValidationErr = err => {
//     return new AppError(400, `Validation Failed...${err.message}`)
// }

app.all('*', (req, res, next) => {
    next(new AppError(404, 'Page Not Found'))
})

// app.use((err, req, res, next) => {
//     if (err.name === 'ValidationError') err = (err);
//     next(err)
// })

app.use((err, req, res, next) => {
    const {
        status = 500,
        message = "Something went wrong!"
    } = err
    // res.status(status).send(message)
    res.status(status).render('error', { err })
    // next(err)
    // res.status(400).json({ "message": "Data not found" })
})

app.listen(process.env.PORT, () => {
    console.log(`Listen to port ${process.env.PORT}`)
})
