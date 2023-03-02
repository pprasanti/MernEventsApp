
const authUser = (req, res, next) => {
    console.log("Path : server.js router middleware");
    const { password } = req.query

    if (password == '123456') {
        next()
    } else {
        // res.status(400).send("UNAUTHORIZED")
        throw new AppError(400, "Password Required!")
    }
}

export default authUser