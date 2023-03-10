
class AppError extends Error {
    constructor(errorCode, message) {
        super()
        this.errorCode = errorCode
        this.message = message
    }
}

export default AppError