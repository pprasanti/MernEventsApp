import AppError from '../utils/AppErrors.js';
import getHashPassword from '../utils/encodePassword.js';
import validateEmpty from './../utils/validateEmpty.js';

class UserDTO {
    firstName
    lastName
    email
    username
    roles
    password
    phone
    address
    img
    status

    constructor(data) {
        this.firstName = data.firstName ?? ''
        this.lastName = data.lastName ?? ''
        this.email = data.email ?? ''
        this.username = data.username ?? ''
        this.roles = data.roles ?? ''
        this.password = data.password ?? ''
        this.phone = data.phone ?? ''
        this.address = {
            street: data.street ?? '',
            city: data.city ?? '',
            state: data.state ?? '',
            country: data.country ?? ''
        }
        this.img = data.img ?? ''
        this.status = data.status ?? ''
    }

    validate = (isNewUser) => {
        let err = []
        if (validateEmpty(this.firstName)) {
            // err.firstName = 'FirstName required'
            err.push({firstName: 'FirstName required'})
        }

        if (validateEmpty(this.email)) {
            // err.email = 'FirstName required'
            err.push({email: 'Email required'})
        }

        if (isNewUser && validateEmpty(this.password)) {
            // err.password = 'FirstName required'
            err.push({password: 'Password required'})
        }

        if (validateEmpty(this.phone)) {
            // err.phone = 'FirstName required'
            err.push({phone: 'Phone required'})
        }

        if (err.length > 0) {
            throw new AppError(401, JSON.stringify(err));
        }
    }
}

export default UserDTO

