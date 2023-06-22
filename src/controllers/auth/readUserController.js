const User = require("./../../models/User")
const createHttpError = require("http-errors")
const readUserController = async (req, res, next) => {
    try {
        //query
        const username = req.username

        //projection
        const projection = {password: 0, createdAt: 0, updatedAt: 0,__v:0}
        const user = await User.findOne({username}, projection);

        if (user?.username) {
            res.status(200).json({
                status: "success",
                data: user
            })
        } else {
            next(createHttpError(404, "User not Found!"))
        }
    } catch (err) {
        next(createHttpError(404, err.message))
    }
}
module.exports = readUserController