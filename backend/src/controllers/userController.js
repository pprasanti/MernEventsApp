import UserDTO from '../dto/userDTO.js'
import AppError from '../utils/AppErrors.js'
import { wrapAsyncErrors } from '../utils/AsyncErrorHandle.js';
import {seedUsers,
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser} from './../interfaces/userInterface.js'

const userController = {

    seedUsers: wrapAsyncErrors({ seedUsers }, async (req, res) => {
        console.log("kkk")
        const result = await seedUsers()
        res.status(200).json(result)
    }),

    createUser: wrapAsyncErrors({ createUser }, async (req, res) => {
        const User = new UserDTO(req.body)
        User.validate();

        const result = await createUser(User)
        return res.status(200).json(result);
    }),

    updateUser: wrapAsyncErrors({ updateUser }, async (req, res) => {
        const { id } = req.params;
        const User = new UserDTO(req.body)
        User.validate();

        const userUpd = await updateUser(id, User)
        return res.status(201).json(userUpd);
    }),

    getUsers: wrapAsyncErrors({ getUsers }, async (req, res) => {
        const users = await getUsers()
        if (!users) {
            // throw new AppError(404, 'Users Not Found!')
            res.status(200).json('Users Not Found!')
        }

        res.status(200).json(users)
    }),

    showUser: wrapAsyncErrors({ getUserById }, async (req, res) => {
        const { id } = req.params
        const user = await getUserById(id)
        if (!user) {
            return next(new AppError(404, 'User Not Found!'))
        }
        res.status(200).json(user)
    }),

    deleteUser: wrapAsyncErrors({ deleteUser }, async (req, res) => {
        //get new data from req.body
        const { id } = req.params;
        const result = await deleteUser(id)

        res.status(200).send("User Deleted!!!")
    }),
}

export default userController 
