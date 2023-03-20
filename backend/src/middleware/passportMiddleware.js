import AppError from "./../utils/AppErrors.js";
import User from './../db/mongo/models/userModel.js'

const userAuthenticate = async (req, res, next) => {
    User.authenticate()
    // if (!req.session.userId) {
    //     next(new AppError(401, 'Unauthorized User'))
    // }
    // next()

}
export default userAuthenticate;
