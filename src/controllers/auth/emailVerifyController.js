const User = require("./../../models/User")
const createHttpError = require("http-errors")
const emailVerifyController = async (req, res, next) => {
    try {
        const _id = req.params.id;

        const user = await User.findOne({_id}, {isVerified: 1});

        if (user?.isVerified === "verified") {
            res.status(200).json({
                status: "success",
                msg: "User already verified, Please login!"
            })
        } else {
            const isVerifiedUser = await User.findOneAndUpdate({_id}, {$set: {isVerified: 'verified'}}, {new: true});

            if (isVerifiedUser) {
                res.status(200).json({
                    status: "success",
                    msg: "User verification successfully",
                    data: isVerifiedUser
                })
            } else {
                next(createHttpError(500, "User verification failed! Please try again"))
            }
        }

    } catch (err) {
        next(err)
    }
}
module.exports = emailVerifyController