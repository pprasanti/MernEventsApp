import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Name is required'],

        },
        lastName: {
            type: String,
        },
        address: [{
            _id: { id: false },
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
        }],
        email: {
            type: String,
        },
        img: {
            type: String,
        },
        phone: {
            type: Number,
            length: [10, 'Phone No. must be 10 digi']
        }
    }
)

userSchema.methods
    .getUsersByType = ((cb) => {
        return mongoose.model('User').find({ type: this.type }, cb)
    })
        .createUser = ((user) => {
            return mongoose.model('User').insertMany([{ user }])
        })

userSchema.statics.findByType = (type) => {
    return this.find({ type: new RegExp(type, 'i') })
}

userSchema.virtual("fullName")
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })
    .set(function () {
        return `${this.firstName} ${this.lastName}`
    })

userSchema.pre('save', async function () {
    console.log("Pre Save!!")
})

userSchema.post('save', async function () {
    console.log("Post Save!!")
})

const User = mongoose.model('User', userSchema);

export default User

