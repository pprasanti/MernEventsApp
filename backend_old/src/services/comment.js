import {
    createComment,
    updateComment,
    getCommentsByEventId,
    getCommentById,
    deleteComment
} from './../db/mongo/repositories/comment.js' // Inject incase db is changed


const commentService  = {
    createComment,
    updateComment,
    getCommentsByEventId,
    getCommentById,
    deleteComment
}

export default  commentService


