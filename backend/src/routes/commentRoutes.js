import express from 'express';
import commentController from '../controllers/commentController.js';
import { saveValidation, checkBodyAndQuery, validateData } from './../validations/comment.js'

const router = express.Router({ mergeParams: true })

router.get('/', commentController.getCommentsByEventId)

router.post('/', saveValidation, commentController.createComment)

router.get('/:id', checkBodyAndQuery('id'), commentController.showComment)

router.patch('/:id', saveValidation, checkBodyAndQuery('id'), commentController.updateComment)

router.delete('/:id', checkBodyAndQuery('id'), commentController.deleteComment)


export default router