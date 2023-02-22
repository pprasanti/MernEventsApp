import express from 'express';
import userService from '../services/user.js';
import User from './../models/user.js';
import userRepository from '../db/mongo/repositories/user.js';

const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// **********************************
// INDEX - renders multiple users
// **********************************
router.get('/', async (req, res) => {
    try {
        const users = await userService.getUsers({ userRepository })

        // res.status(200).json(users)
        res.render('user/index', { users })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})


// **********************************
// INDEX - renders multiple users
// **********************************
router.get('/seed', async (req, res) => {
    try {
        const users = await userService.seedUsers({ userRepository })

        // res.status(200).json(users)
        res.redirect('/users')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// **********************************
// NEW - renders a form
// **********************************
router.get('/new', (req, res) => {
    res.render('user/new')
})

// **********************************
// CREATE - creates a new user
// **********************************
router.post('/', async (req, res) => {
    try {
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
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// SHOW - details about one particular user
// *******************************************
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userService.getUser({ userRepository }, id)

        // res.json(user)
        res.render('user/show', { user })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// EDIT - renders a form to edit an user
// *******************************************
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userService.getUser({ userRepository }, id)

        // res.json(user)
        res.render('user/edit', { id, user })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// UPDATE - updates a particular user
// *******************************************
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    //get new data from req.body
    const user = req.body;

    try {
        const userUpd = await userService.updateUser({ userRepository }, { id, user })
        // res.json(userUpd)
        //redirect back to index (or wherever you want)
        res.redirect('/users');
    } catch (err) {
        console.log(err)
        // res.status(500).send('Internal Server Error!!!')
    }
})

// *******************************************
// DELETE/DESTROY- removes a single user
// *******************************************
router.delete('/:id', async (req, res) => {
    //get new data from req.body
    const { id } = req.params;
    try {
        const newUser = await userService.deleteUser({ userRepository }, id)

        //redirect back to index (or wherever you want)
        // res.status(200).send("User Deleted!!!")
        res.redirect('/users');
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error!!!')
    }
})

export default router