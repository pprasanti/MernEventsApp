import express from 'express';
import userService from '../services/user.js';
import User from './../models/user.js';
import userRepository from '../db/repository/user.js';
import wrapAsynch from '../utils/AsynchErrorHandle.js';

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// **********************************
// INDEX - renders multiple users
// **********************************
router.get('/', wrapAsynch(async (req, res) => {
    const users = await userService.getUsers({ userRepository })

    // res.status(200).json(users)
    res.render('user/index', { users })
})
)

// **********************************
// INDEX - renders multiple users
// **********************************
router.get('/seed', wrapAsynch(async (req, res) => {
    const users = await userService.seedUsers({ userRepository })

    // res.status(200).json(users)
    res.redirect('/users')
})
)

// **********************************
// NEW - renders a form
// **********************************
router.get('/new', (req, res) => {
    res.render('user/new')
})

// **********************************
// CREATE - creates a new user
// **********************************
router.post('/', wrapAsynch(async (req, res) => {
    const user = new User(req.body);
    const { street, city, state, country } = req.body;
    user.address.push = [{
        street: street,
        city: city,
        state: state,
        country: country
    }]

    const newUser = await userService.createUser({ userRepository }, user)
    // res.json(newUser)
    res.redirect('/users');
})
)

// *******************************************
// SHOW - details about one particular user
// *******************************************
router.get('/:id', wrapAsynch(async (req, res) => {
    const { id } = req.params
    const user = await userService.getUser({ userRepository }, id)

    // res.json(user)
    res.render('user/show', { user })
})
)

// *******************************************
// EDIT - renders a form to edit an user
// *******************************************
router.get('/:id/edit', wrapAsynch(async (req, res) => {
    const { id } = req.params
    const user = await userService.getUser({ userRepository }, id)

    // res.json(user)
    res.render('user/edit', { id, user })
})
)

// *******************************************
// UPDATE - updates a particular user
// *******************************************
router.patch('/:id', wrapAsynch(async (req, res) => {
    const { id } = req.params;
    //get new data from req.body
    const user = req.body;

    const userUpd = await userService.updateUser({ userRepository }, { id, user })
    // res.json(userUpd)
    //redirect back to index (or wherever you want)
    res.redirect('/users');
})
)

// *******************************************
// DELETE/DESTROY- removes a single user
// *******************************************
router.delete('/:id', wrapAsynch(async (req, res) => {
    //get new data from req.body
    const { id } = req.params;
    const newUser = await userService.deleteUser({ userRepository }, id)

    //redirect back to index (or wherever you want)
    // res.status(200).send("User Deleted!!!")
    res.redirect('/users');
})
)

export default router