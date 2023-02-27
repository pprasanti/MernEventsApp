class EventDTO {
    name
    description
    address
    website
    priceStarts
    img
    phone
    comments

    constructor(data) {
        this.name = data.name
        this.description = data.description
        this.address = data.address
        this.website = data.website
        this.priceStarts = data.priceStarts
        this.img = data.img
        this.phone = data.phone
        this.comments = data.comments
    }

    validate() {
        if (validateEmpty(this.title)) {
            throw new AppError('title required', 401);
        }

        if (validateEmpty(this.description)) {
            throw new AppError('description required', 401);
        }

        if (validateEmpty(this.date)) {
            throw new AppError('date required', 401);
        }
    }

}

export default EventDTO

