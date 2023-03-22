import User from '../../../db/mongo/models/userModel.js'
import { seedUsersDb } from '../seeds/user.js';
import bcrypt from 'bcrypt';

// Seed Users
export async function seedUsers() {
    await seedUsersDb()
}

// Add a new User / Register User
export async function createUser(userDTO) {
    console.log("I'm in Register22")
    const user = new User(userDTO)
    return await user.save()
    // req.session.userId = user._id
}

// Login User
export async function loginUser(email, password) {
    return await User.findAndValidate(email, password)
}

// Update User
export async function updateUser(id, userDTO) {
    return await User.findByIdAndUpdate(id, userDTO, { new: true, runValidators: true })
}

// Add Address of the User
export async function addAddress(
    { id, userDTO }
) {
    const user = new Comment(userDTO)
    const userUpd = await User.findById(id)
    userUpd.address.push(
        user.address
    )
    return userUpd
}

// Get All Users
export async function getUsers() {
    return await User.find({ __v: 0 })
}

// Get Users By id
export async function getUserById(id) {
    return await User.findById(id, { _id: 0, __v: 0 })
}

// Delete a User
export async function deleteUser(id) {
    return await User.findByIdAndDelete(id)
}


