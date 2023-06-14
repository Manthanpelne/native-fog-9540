const mongoose = require('mongoose');

const DoctorsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        image: { type: String, required: true },
        about: { type: String, required: true },
        qualification: { type: String, required: true },
        experience: { type: String, required: true },
        language: { type: String, required: true },

        charge: { type: String, required: true },
        timings: { type: String, required: true },
        clinic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic"
        },
        appointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Appointment"
            }
        ]

    },
    { versionKey: false }
)
const DoctorModel = mongoose.model("Doctor", DoctorsSchema)

module.exports = { DoctorModel }