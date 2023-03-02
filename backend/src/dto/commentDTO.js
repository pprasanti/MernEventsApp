class CommentDTO {
    text
    rating

    constructor(data) {
        this.text = data.text
        this.rating = data.rating
    }

}

export default CommentDTO

