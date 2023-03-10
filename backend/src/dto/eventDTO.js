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
            throw new AppError(401,'title required');
        }

        if (validateEmpty(this.description)) {
            throw new AppError(401, 'description required');
        }

        if (validateEmpty(this.date)) {
            throw new AppError(401, 'date required');
        }
    }

}

export default EventDTO

