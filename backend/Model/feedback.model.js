const mongoose = require('mongoose');


const Feedbackschema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },

})
const FeedbackModel = mongoose.model("feedback", Feedbackschema)

module.exports = {FeedbackModel}