import {
    createComment,
    updateComment,
    getCommentsByEventId,
    getCommentById,
    deleteComment
} from './../mongo/modules/comment.js' // Inject incase db is changed

const commentDb = {
    createComment,
    updateComment,
    getCommentsByEventId,
    getCommentById,
    deleteComment
}

export default  commentDb


