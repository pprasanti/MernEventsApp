export const EventEntity = class EventEntity {
    constructor({
        id,
        name,
        address
    }) {
        this.id = id ? id : 0
        this.name = name
        this.address = address
    }

    validate = () => {
        if ('' == this.name || '' == this.address) {
            throw new Error('Invalid Data!')
        }
    }
}