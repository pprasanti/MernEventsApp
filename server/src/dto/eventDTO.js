import AppError from '../utils/AppErrors.js';
import validateEmpty from './../utils/validateEmpty.js';

class EventDTO {
    name
    description
    address
    website
    city
    priceStarts
    img
    phone
    comments

    constructor(data) {
        this.name = data.name
        this.description = data.description
        this.address = data.address
        this.website = data.website
        this.city = data.city
        this.priceStarts = data.priceStarts
        this.img = data.img
        this.phone = data.phone
        this.comments = data.comments
    }

    validate() {
        if (validateEmpty(this.name)) {
            throw new AppError(401,'name required');
        }

        if (validateEmpty(this.description)) {
            throw new AppError(401, 'description required');
        }

        if (validateEmpty(this.city)) {
            throw new AppError(401, 'city required');
        }
    }

}

export default EventDTO

