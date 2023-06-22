const {hashPassword} = require("./../../utility/hashPassword")
const createHttpError = require('http-errors');
const User = require("./../../models/User")
const sendMail = require("./../../utility/sendMail")
const loginController = async (req, res, next) => {
    try {
        const {firstName, lastName, username, email, password} = req.body

        //hash password
        const hashPass = await hashPassword(password);

        //create user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashPass
        });

        const user = await newUser.save();

        //Sent verification link when user registration
        if (user._id && typeof user === 'object') {
            const mailInfo = {
                receiver: [user?.email],
                emailSubject: "Verify Account",
                template: `Verification link:-  http://localhost:5000/api/v1/emailVerify/${user?._id}`
            };

            const sentVerificationLink = await sendMail(mailInfo);

            if(sentVerificationLink.messageId){
                res.status(200).json({
                    status:'success',
                    data:user,
                    msg:`We have sent mail to a ${user.email} Please verify your email address`
                })
            }else{
                next(createHttpError(500, "User registration failed! Please try to again registration"))
            }
        } else {
            next(createHttpError(500, "Internal server error!"))
        }

    } catch (err) {
        if(err.message.includes("E11000 duplicate key error collection")){
            next(createHttpError(409,"User already exists!"))
        }
        next(err)
    }
}
module.exports = loginController