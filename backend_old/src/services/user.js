import {
    seedUsers,
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
} from './../db/mongo/repositories/user.js'

const userService  = {
    seedUsers,
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
}

export default  userService 


