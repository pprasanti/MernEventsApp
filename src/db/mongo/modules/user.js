import User from '../../../models/user.js'
import { seedUsersDb } from '../seeds/user.js';

// Seed Users
export async function seedUsers() {
    await seedUsersDb()
}

// Add a new User
export async function createUser(user) {
    // Single insert
    return await user.save()
        .then(data => {
            data.fullName = data.fullName
        })
}

// Update User
export async function updateUser(
    { id, user }
) {
    return await User.findByIdAndUpdate(id, user, { new: true, runValidators: true })
}

// Add Address of the User
export async function addAddress(
    { id, user }
) {
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
