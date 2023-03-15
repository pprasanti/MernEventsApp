import bcrypt from 'bcrypt'

const getHashPassword = async (password) => {
    return await bcrypt.hash(password, 12)
}

export default getHashPassword