import CommentDTO from '../dto/commentDTO.js'
import AppError from '../utils/AppErrors.js'
import { wrapAsyncErrors } from '../utils/AsyncErrorHandle.js';
import {createComment,
    updateComment,
    getCommentsByEventId,
    getCommentById,
    deleteComment} from './../interfaces/commentInterface.js'

const commentController = {

    createComment: wrapAsyncErrors({ createComment },  async (req, res) => {
        const { eid } = req.params
        const Comment = new CommentDTO(req.body)
        Comment.validate();

        const result = await createComment(eid, Comment)
        return res.status(200).json(result);
    }),

    updateComment: wrapAsyncErrors({ updateComment },  async (req, res) => {
        const { eid, id } = req.params;
        const Comment = new CommentDTO(req.body)
        Comment.validate();

        const commentUpd = await updateComment(id, Comment)
        return res.status(201).json(commentUpd);
    }),

    getCommentsByEventId: wrapAsyncErrors({ getCommentsByEventId },  async (req, res) => {
        const { eid } = req.params
        const { name, comments } = await getCommentsByEventId(eid)
        if (!comments) {
            return next(new AppError(404, 'Comments Not Found!'))
        }

        res.status(200).json(comments)
    }),

    showComment: wrapAsyncErrors({ getCommentById },  async (req, res) => {
        const { eid, id } = req.params
        const comment = await getCommentById(id)
        if (!comment) {
            return next(new AppError(404, 'Comments Not Found!'))
        }
        res.status(200).json(comment)
    }),

    deleteComment: wrapAsyncErrors({ deleteComment },  async (req, res) => {
        const { eid, id } = req.params;
        const result = await deleteComment(id)
        req.flash('success', 'Comment Deleted Successfully!')

        // res.status(200).send("Comment Deleted!!!")
        res.redirect(`/events/${eid}`);
    }),
}

export default commentController 
