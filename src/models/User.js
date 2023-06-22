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
    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: {
        type: String,
        enum : ['verified','unverified'],
        default: "unverified"
    },
});

//Export the model
module.exports = model("User", userSchema);