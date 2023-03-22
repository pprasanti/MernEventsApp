import User from '../db/mongo/models/userModel.js'
import UserDTO from '../dto/userDTO.js'
import {
    createUser,
    loginUser
} from './../interfaces/userInterface.js'

const authController = {

    // JWT Bcrypt Authentication
    register: ({ createUser }, async (req, res) => {
        const User = new UserDTO(req.body)
        await User.validate(true)
        console.log("I'm in Register")

        const result = await createUser(User)
        return res.status(200).json(result);
    }),

    login: ({ loginUser }, async (req, res) => {
        console.log("I'm in Login")
        const { email, password } = req.body

        const user = await loginUser(email, password)
            .then((data) => {
                return res.json({ status: 200, message: 'User Logged in successfully', user: data });
            })
            .catch((error) => {
                return res.json(error)
            });
    }),

    logout: (async (req, res) => {
        req.session.userId = null
        return res.json({ status: 200, message: 'User Logged out successfully' });
    }),

    // Passport
    passportRegister: ({ loginUser }, async (req, res, next) => {
        // user username & password to register & login
        const { firstName, email, username, password } = req.body
        const user = new User({ firstName, email, username, password })
        const newUser = await User.register(user, password)

        req.login(newUser, err => {
            if (err) return next(err)
            res.json({ status: 200, message: `User  ${newUser.email} registered successfully !`, data: newUser })
        })
    }),

    passportLogin: ({ loginUser }, async (req, res, next) => {
        // user username & password to register & login
        console.log("dsdfdfsd")
        const { email, username, password } = req.body

        console.log("dsdfdfsd")
        req.login(err => {
            if (err) { console.log(`err : ${err}`); return next(err) }
            res.json({ status: 200, message: `User  ${username} registered successfully !`, data: { username, password } })
        })
        // res.json({ status: 200, message: `User  ${username} logged in successfully !` })
    }),

    passportLogout: ({ loginUser }, async (req, res, next) => {
        // user username & password to register & login
        req.logout(function (err) {
            if (err) { return next(err); }
            res.json({ status: 200, message: `User logged out successfully !` })
        });
    }),

}

export default authController