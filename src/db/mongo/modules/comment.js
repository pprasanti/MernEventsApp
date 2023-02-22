import Comment from '../../../models/comment.js'
import Event from '../../../models/event.js';

// Add a new Comment
export async function createComment({ eid, comment }) {
    // Single insert
    const event = await Event.findById(eid)
    event.comments.push(comment)

    await event.save()
    return await comment.save()
        .then(data => {
            data.fullName = data.fullName
            console.log(data.fullName)
        })
}

// Update Comment
export async function updateComment(
    { id, comment }
) {
    return await Comment.findByIdAndUpdate(id, comment, { new: true, runValidators: true })
        .then(data => data)
        .catch(err => console.error(err))
}

// Get All Comments By EventId
export async function getCommentsByEventId(id) {
    return await Event.findById(id, { __v: 0 }).populate('comments')
}

// Get Comments By id
export async function getCommentById(id) {
    return await Comment.findById(id, { _id: 0, __v: 0 })
}

// Delete a Comment
export async function deleteComment(id) {
    return await Comment.deleteOne({ _id: id }).catch(err => console.error(err))
}
