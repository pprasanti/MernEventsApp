import mongoose, { Schema } from "mongoose";
import Comment from "./commentModel.js";

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],

        },
        description: {
            type: String,
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        website: {
            type: String,
        },
        priceStarts: {
            type: Number,
            default: 5000,
            min: [5000, 'Should not be less than 5000!']
        },
        img: {
            type: String,
        },
        phone: {
            type: Number,
            length: [10, 'Phone No. must be 10 digi']
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    },
    { timestamps: true }
)

eventSchema.methods
    .getEventsByType = ((cb) => {
        return mongoose.model('Event').find({ type: this.type }, cb)
    })
        .createEvent = ((event) => {
            return mongoose.model('Event').insertMany([{ event }])
        })

eventSchema.statics.findByType = (type) => {
    return this.find({ type: new RegExp(type, 'i') })
}

eventSchema.virtual("fullName")
    .get(function () {
        return `${this.name} , DESC - ${this.description}`
    })
    .set(function () {
        return `${this.name} , DESC - ${this.description}`
    })

// Middleware
eventSchema.post('findOneAndDelete', async function (event) {
    console.log("Path - db/mongo/models - Post Delete Middleware to delete all relevant data")

    // Delete all comments belongs to the Event
    if (event.comments.length > 0) {
        await Comment.deleteMany({ _id: { $in: event.comments } })
            .catch(err => console.error(err))
    }
})

eventSchema.pre('save', async function () {
    console.log("Pre Save Middleware!!")
})

eventSchema.post('save', async function () {
    console.log("Post Save Middleware!!")
    console.log("Path - db/mongo/models - Post Save Middleware to process/save all relevant data")
})

const Event = mongoose.model('Event', eventSchema);

export default Event

