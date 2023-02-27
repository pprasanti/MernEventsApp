import CommentDTO from '../dto/comment.js'
import eventService from '../services/event.js'
import commentService from '../services/comment.js'

const commentController = {

    createComment: async (req, res) => {
        const { eid } = req.params
        const result = await commentService.createComment(eid, new CommentDTO(req.body))
        req.flash('success', 'Comment Added Successfully!')

        // return res.status(200).json(result);
        res.redirect(`/events/${eid}`)
    },

    newComment: async (req, res) => {
        const { eid } = req.params
        const event = await eventService.getEventById(eid)
        console.log(event)

        // return res.status(200).json(event);
        res.render('comment/new', { event })
    },

    updateComment: async (req, res) => {
        const { eid, id } = req.params;
        const commentUpd = await commentService.updateComment(id, new CommentDTO(req.body))
        req.flash('success', 'Comment Updated Successfully!')

        // return res.status(201).json(commentUpd);
        res.redirect(`/events/${eid}`);
    },

    getCommentsByEventId: async (req, res) => {
        const { eid } = req.params
        const { name, comments } = await commentService.getCommentsByEventId(eid)

        // res.status(200).json(comments)
        res.render('comment/index', { eid, name, comments })
    },

    showComment: async (req, res) => {
        const { eid, id } = req.params
        const { name } = await eventService.getEventById(eid)
        const comment = await commentService.getCommentById(id)

        // res.json(comment)
        res.render('comment/show', { eid, name, id, comment })
    },

    editComment: async (req, res) => {
        const { eid, id } = req.params
        const { name } = await eventService.getEventById(eid)
        const comment = await commentService.getCommentById(id)

        // res.status(200).json(comment)
        res.render('comment/edit', { eid, name, id, comment })
    },

    deleteComment: async (req, res) => {
        const { eid, id } = req.params;
        const result = await commentService.deleteComment(id)
        req.flash('success', 'Comment Deleted Successfully!')

        // res.status(200).send("Comment Deleted!!!")
        res.redirect(`/events/${eid}`);
    },
}

export default commentController 
