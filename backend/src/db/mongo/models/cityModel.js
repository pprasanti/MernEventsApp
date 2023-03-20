import mongoose, { Schema } from "mongoose";

const citySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
    }
)

citySchema.pre('save', async function () {
    console.log("Pre Save Middleware!!")
})

citySchema.post('save', async function () {
    console.log("Post Save Middleware!!")
    console.log("Path - db/mongo/models - Post Save Middleware to process/save all relevant data")
})

const City = mongoose.model('City', citySchema);

export default City

