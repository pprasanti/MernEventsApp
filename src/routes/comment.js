import express from 'express';
import commentController from '../controllers/comment.js';
import { wrapAsyncErrors } from '../utils/AsyncErrorHandle.js';
import { saveValidation, checkBodyAndQuery, validateData } from './../validations/comment.js'

const router = express.Router({ mergeParams: true })

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("========= Start from Route =========");
    console.log("Path : Comment router");
    console.log("Path : Comment middleware");
    next()
})

// **********************************
// INDEX - renders multiple comments
// **********************************
router.get('/', wrapAsyncErrors(commentController.getCommentsByEventId))

// **********************************
// NEW - renders a form
// **********************************
router.get('/new', wrapAsyncErrors(commentController.newComment))

// **********************************
// CREATE - creates a new comment
// **********************************
router.post('/', saveValidation, wrapAsyncErrors(commentController.createComment))

// *******************************************
// SHOW - details about one particular comment
// *******************************************
router.get('/:id', checkBodyAndQuery('id'), wrapAsyncErrors(commentController.showComment))

// *******************************************
// EDIT - renders a form to edit an comment
// *******************************************
router.get('/:id/edit', checkBodyAndQuery('id'), wrapAsyncErrors(commentController.editComment))

// *******************************************
// UPDATE - updates a particular comment
// *******************************************
router.patch('/:id', saveValidation, checkBodyAndQuery('id'), wrapAsyncErrors(commentController.updateComment))

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
router.delete('/:id', checkBodyAndQuery('id'), wrapAsyncErrors(commentController.deleteComment))


export default router