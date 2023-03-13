import Comment from '../../../db/mongo/models/comment.js'
import Event from '../../../db/mongo/models/event.js';

// Add a new Comment
async function createComment(eid, commentDTO) {
    const comment = new Comment(commentDTO)
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
async function updateComment(id, commentDTO) {
    return await Comment.findByIdAndUpdate(id, commentDTO, { new: true, runValidators: true })
}

// Get All Comments By EventId
async function getCommentsByEventId(id) {
    return await Event.findById(id, { __v: 0 }).populate('comments')
}

// Get Comments By id
async function getCommentById(id) {
    return await Comment.findById(id, { _id: 0, __v: 0 })
}

// Delete a Comment
async function deleteComment(id) {
    return await Comment.findByIdAndDelete(id).catch(err => console.error(err))
}

export {
    createComment,
    updateComment,
    getCommentsByEventId,
    getCommentById,
    deleteComment
}