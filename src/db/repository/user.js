import {
    seedUsers,
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
} from './../mongo/modules/user.js'

const userDb = {
    seedUsers,
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
}

export default  userDb


