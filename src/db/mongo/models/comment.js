import mongoose, { Schema } from "mongoose";

const commentsSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Text is required'],
        },
        rating: {
            type: Number,
            min: [1, 'Rating should be between 1 to 5'],
            max: [5, 'Rating should be between 1 to 5']
        },
    }
)


const Comment = mongoose.model('Comment', commentsSchema);


export default Comment

