class UserDTO {
    firstName
    lastName
    address
    email
    img
    phone

    constructor(data) {
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.address = data.address
        this.address.push = [{
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country
        }]
        this.email = data.email
        this.img = data.img
        this.phone = data.phone
    }
}

export default UserDTO

