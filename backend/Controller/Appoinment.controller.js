const { AppointmentModel } = require("../Model/Appointment.model")
const { UserModel } = require("../Model/User.model")
const { DoctorModel } = require("../Model/doctors.model")


const AddAppointment = async (req, res) => {
    try {
        const doctorid = req.params.doctorid

        const { date, duration, status } = req.body
        const user = await UserModel.findOne({ _id: req.body.UserId })

        if (!user) {
            return res.status(400).send('user not found or Login first');
        }
        const existingAppointment = await AppointmentModel.findOne({
            user: req.body.UserId,
            doctor: doctorid,
            date: date,
        });

        if (existingAppointment && existingAppointment.status !== "canceled") {
            return res
                .status(400)
                .send({ "msg": "You already have an appointment with this doctor on the same day" });
        }


        const appointment = new AppointmentModel({ user: req.body.UserId, doctor: doctorid, date, duration, status })
        await appointment.save()

        const updateddoctor = await DoctorModel.findOne({ _id: doctorid });

        if (!updateddoctor.appointments.includes(appointment._id)) {
            updateddoctor.appointments.push(appointment._id)
        }

        await updateddoctor.save()

        if (!user.appointments.includes(appointment._id)) {
            user.appointments.push(appointment._id)
        }

        await user.save()

        res.status(200).send({ "msg": "Appointment", appointment })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

// get appointment by id

const getAppointmentbyID = async (req, res) => {
    try {
        const id = req.params.id

        const appointment = await AppointmentModel.findOne({ _id: id })

        if (!appointment) return res.status(400).send({ "msg": "No appointment" })

        res.status(200).send({ "appointment": appointment })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

// get all appointment

const getallAppointment = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find()
        res.status(200).send({ "msg": "all appointment", appointments })
    } catch (error) {
        console.log("hello")
        res.status(400).send({ "msg": error.message })
    }
}


// all the appointments of the user 

const getuserAppointment = async (req, res) => {
    try {
        console.log(req.body.UserId)
        const user = await UserModel.findOne({ _id: req.body.UserId }).populate("appointments");
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ data: user.appointments });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// all the appointment of the doctor

const getdoctorAppointment = async (req, res) => {
    try {
        const id = req.params.id
        const user = await DoctorModel.findOne({ _id: id }).populate("appointments");
        if (!user) {
            return res.status(404).send({ message: "Doctor not found" });
        }
        res.status(200).send({ data: user.appointments });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// update the appointment

const updateAppointment = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            { _id: id },
            { $set: { status } },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).send({ message: "Appointment not found" });
        }

        res.status(200).send({ "msg": "Appointment Updated", updatedAppointment });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
}

module.exports = { AddAppointment, getAppointmentbyID, getallAppointment, getuserAppointment, getdoctorAppointment, updateAppointment }