import Comment from '../../../models/comment.js'
import Event from '../../../models/event.js';

const repository = {

    async createComment({ eid, comment }) {
        // Single insert
        const event = await Event.findById(eid)
        event.comments.push(comment)

        await event.save()
        return await comment.save()
            .then(data => {
                data.fullName = data.fullName
                console.log(data.fullName)
            })
        // .catch(err => {
        //     console.error(`ERRRRRR ${err} `)
        //     return err
        // })
    },

    async updateComment(
        { id, comment }
    ) {
        const commentUpd = await Comment.findByIdAndUpdate(id, comment, { new: true, runValidators: true })
            .then(data => data)
            .catch(err => console.error(err))
        return commentUpd
    },

    async getComments({ eid }) {
        const event = await Event.findById(eid, { __v: 0 })
        const comments = await event.populate('comments')
            // .then(data => data)
            // .catch(err => console.error(err))

        return comments
    },

    async getComment(id) {
        const comment = await Comment.findById(id, { _id: 0, __v: 0 })
            .then(data => data)
            .catch(err => console.error(err))

        return comment
    },

    async deleteComment(id) {
        return await Comment.deleteOne({ _id: id }).catch(err => console.error(err))
    },

    async addAddress(
        { id, comment }
    ) {
        const commentUpd = await Comment.findById(id)
        commentUpd.address.push(
            comment.address
        )
            .then(data => data)
            .catch(err => console.error(err))
        return commentUpd
    },
}

export default repository
