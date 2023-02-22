import User from '../../../models/user.js'
import { seedUsers } from '../seeds/user.js';

const repository = {

    async seedUsers() {
        await seedUsers()
    },

    async createUser(user) {
        // Single insert
        return await user.save()
            .then(data => {
                data.fullName = data.fullName
                console.log(data.fullName)
                return data
            })
            .catch(err => console.error(`ERRRRRR ${err} `));
    },

    async updateUser(
        { id, user }
    ) {
        const userUpd = await User.findByIdAndUpdate(id, user, { new: true, runValidators: true })
            .then(data => data)
            .catch(err => console.error(err))
        return userUpd
    },

    async addAddress(
        { id, user }
    ) {
        const userUpd = await User.findById(id)
        userUpd.address.push(
            user.address
        )
        .then(data => data)
        .catch(err => console.error(err))
        return userUpd
    },

    async getUsers() {
        const users = await User.find({ __v: 0 })
            .then(data => data)
            .catch(err => console.error(err))

        return users
    },

    async getUser(id) {
        const user = await User.findById(id, { _id: 0, __v: 0 })
            .then(data => data)
            .catch(err => console.error(err))

        return user
    },

    async deleteUser(id) {
        return await User.deleteOne({ _id: id }).catch(err => console.error(err))
    },
}

export default repository
