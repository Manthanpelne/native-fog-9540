const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Doctor'],
        default: 'User'
    },
    appointments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Appointment'
        }]
});

const UserModel = mongoose.model("User", userSchema)

module.exports = { UserModel }