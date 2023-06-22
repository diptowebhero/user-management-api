const {Schema, model} = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: function (value) {
                // Regular expression for email validation
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: 'Invalid email address'
        },
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: {
        type: String,
        enum: ['verified', 'unverified'],
        default: "unverified"
    },
});

//Export the model
module.exports = model("User", userSchema);