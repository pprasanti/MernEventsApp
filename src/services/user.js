const userService = {

    async seedUsers({ userRepository }) {
        return await userRepository.seedUsers()
    },

    async createUser({ userRepository }, user) {
        return await userRepository.createUser(user)
    },

    async updateUser({ userRepository }, { id, user }) {
        return await userRepository.updateUser({ id, user })
    },

    async getUsers({ userRepository }) {
        return await userRepository.getUsers()
    },

    async getUser({ userRepository }, id) {
        return await userRepository.getUser(id)
    },

    async deleteUser({ userRepository }, id) {
        return await userRepository.deleteUser(id)
    },
}

export default userService
