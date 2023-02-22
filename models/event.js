import mongoose, { Schema } from "mongoose";

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
        phone:  {
            type: Number,
            length: [10, 'Phone No. must be 10 digi']
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    }
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
.get(function() {
    return `${this.name} , DESC - ${this.description}`
})
.set(function() {
    return `${this.name} , DESC - ${this.description}`
})

eventSchema.pre('save', async function(){
    console.log("Pre Save!!")
})

eventSchema.post('save', async function(){
    console.log("Post Save!!")
})

const Event = mongoose.model('Event', eventSchema);

export default Event

