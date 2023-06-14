const mongoose = require('mongoose');

const DoctorsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        about: { type: String, required: true },
        qualification: { type: String, required: true },
        experience: { type: String, required: true },
        language: { type: String, required: true },
        licenceNumber: { type: String, required: true },
        charge: { type: String, required: true },
        timings: { type: String, required: true },

    },
    { versionKey: false }
)
const DoctorModel = mongoose.model("doctor", DoctorsSchema)

module.exports = { DoctorModel }