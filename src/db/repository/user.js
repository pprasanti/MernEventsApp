import {
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
} from './../mongo/modules/user.js'

const userDb = {
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
}

export default  userDb


