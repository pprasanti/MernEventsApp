import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router()

router.get('/seed', userController.seedUsers)

router.post('/', userController.createUser)

router.patch('/:id', userController.updateUser)

router.get('/', userController.getUsers)

router.get('/:id', userController.showUser)

router.delete('/:id', userController.deleteUser)

router.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query
    req.session.username = username
    console.log(req.query)
    console.log(req.session.username)
    // console.log(req.signedCookies)
    res.redirect('/greet')
    // res.send({ msg: `Hello Mr. ${req.session.username}!!!` })

})

router.get('/greet', (req, res) => {
    console.log(req.session.username)
    // console.log(req.signedCookies)
    res.send({ msg: `Hello Mr. ${req.session.username}!!!` })

})

export default router