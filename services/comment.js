const commentService = {

    async seedComments({ commentRepository }) {
        return await commentRepository.seedComments()
    },

    async createComment({ commentRepository }, { eid, comment }) {
        return await commentRepository.createComment({ eid, comment })
    },

    async updateComment({ commentRepository }, { id, comment }) {
        return await commentRepository.updateComment({ id, comment })
    },

    async getCommentsByEventId({ commentRepository }, id) {
        return await commentRepository.getCommentsByEventId(id)
    },

    async getComment({ commentRepository }, id) {
        return await commentRepository.getComment(id)
    },

    async deleteComment({ commentRepository }, id) {
        return await commentRepository.deleteComment(id)
    },
}

export default commentService
