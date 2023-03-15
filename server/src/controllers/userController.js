import User from '../db/mongo/models/userModel.js'
import UserDTO from '../dto/userDTO.js'
import AppError from '../utils/AppErrors.js'
import {
    seedUsers,
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser,
    loginUser
} from './../interfaces/userInterface.js'

const userController = {

    seedUsersData: ({ seedUsers }, async (req, res) => {
        const result = await seedUsers()
        return res.json(result);
    }),


    createUser: ({ createUser }, async (req, res) => {
        const User = new UserDTO(req.body)
        User.validate();

        const result = await createUser(User)
        return res.status(200).json(result);
    }),

    updateUser: ({ updateUser }, async (req, res) => {
        const { id } = req.params;
        const User = new UserDTO(req.body)
        User.validate();

        const userUpd = await updateUser(id, User)
        return res.status(201).json(userUpd);
    }),

    getUsers: ({ getUsers }, async (req, res) => {
        const users = await getUsers()
        if (!users) {
            throw new AppError(404, 'Users Not Found!')
        }

        res.status(200).json(users)
    }),

    showUser: ({ getUserById }, async (req, res, next) => {
        const { id } = req.params
        const user = await getUserById(id)
        if (!user) {
            return next(new AppError(404, 'User Not Found!'))
        }
        res.status(200).json(user)
    }),

    deleteUser: ({ deleteUser }, async (req, res) => {
        //get new data from req.body
        const { id } = req.params;
        const result = await deleteUser(id)

        res.status(200).send("User Deleted!!!")
    }),

    greet: ((req, res) => {
        console.log(req.session.username)
        // console.log(req.signedCookies)
        res.send({ msg: `Hello Mr. ${req.session.username}!!!` })

    }),

}


export default userController 
