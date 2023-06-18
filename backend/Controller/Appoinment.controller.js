const { AppointmentModel } = require("../Model/Appointment.model")
const { UserModel } = require("../Model/User.model")
const { DoctorModel } = require("../Model/doctors.model")
const { sendEmail } = require("../Services/mail")

const AddAppointment = async (req, res) => {
    try {
        const doctorid = req.params.doctorid

        const { date, time, status } = req.body
        const user = await UserModel.findOne({ _id: req.body.UserId })

        if (!user) {
            return res.status(400).send({ "msg": 'user not found or Login first' });
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


        const appointment = new AppointmentModel({ user: req.body.UserId, doctor: doctorid, date, time, status })
        await appointment.save()
        console.log(appointment);
        const updateddoctor = await DoctorModel.findOne({ _id: doctorid });

        if (!updateddoctor.appointments.includes(appointment._id)) {
            updateddoctor.appointments.push(appointment._id)
        }

        await updateddoctor.save()
        console.log(updateddoctor);
        if (!user.appointments.includes(appointment._id)) {
            user.appointments.push(appointment._id)
        }

        await user.save()
        console.log(user);
        const formattedDate = appointment.date.toLocaleDateString('en-GB');
        sendEmail({
            email: `${user.email}`,
            subject: 'Your Appointment is Scheduled',
            body: `Dear ${user.name} ,<br> 
          
          Thank you for booking an appointment with our dentist. This email is to confirm that your appointment with our experienced doctor, <b> ${updateddoctor.name} </b>, has been successfully scheduled  on <b> ${formattedDate} </b> at <b>${appointment.time} </b>. <br>
          
          Please note that the appointment is currently in the scheduled state and will be confirmed by our staff shortly. Once confirmed, you will receive another email with the confirmed details.<br>
          
          If you have any questions or concerns, please do not hesitate to contact us at dentdesks@gmail.com.<br>
          
          We look forward to seeing you soon! <br>
          
          Best regards,<br>
          DENTDESK`
        });



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

// const getuserAppointment = async (req, res) => {
//     try {
//         console.log(req.body.UserId)
//         const user = await UserModel.findOne({ _id: req.body.UserId }).populate("appointments");
//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         res.status(200).send({ data: user.appointments });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// }
const getuserAppointment = async (req, res) => {
    try {
        console.log(req.body.UserId);
        const user = await UserModel.findOne({ _id: req.body.UserId })
            .populate({
                path: 'appointments',
                populate: {
                    path: 'doctor',
                    model: 'Doctor'
                }
            })
            .populate({
                path: 'appointments',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ data: user.appointments });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


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
        const formattedDate = updatedAppointment.date.toLocaleDateString('en-GB');
        // Send email notifications based on the updated status
        const user = await UserModel.findOne({ _id: updatedAppointment.user })
        const doctor = await DoctorModel.findOne({ _id: updatedAppointment.doctor })
        switch (status) {
            case 'confirmed':
                sendEmail({
                    email: `${user.email}`,
                    subject: 'Your Appointment is Confirmed',
                    body: `Dear ${user.name}, <br>
  
  We are pleased to inform you that your appointment with our dentist, <b>${doctor.name}</b>, has been confirmed. The details of your appointment are as follows:<br>
  
  <b> Date: ${formattedDate}</b><br>
  <b>Time: ${updatedAppointment.time}</b><br>
  
  Please make sure to arrive on time for your appointment to ensure that we can provide you with the best possible service. If you need to cancel or reschedule your appointment, please notify us at least 24 hours in advance.<br>
  
  If you have any questions or concerns, please do not hesitate to contact us at dentdesks@gmail.com.<br>
  
  We look forward to seeing you soon!<br>
  
  Best regards,<br>
  DENTCARE`
                });
                break;

            case 'completed':
                sendEmail({
                    email: `${user.email}`,
                    subject: 'Your Appointment is Completed',
                    body: `Dear ${user.name},<br>
  
  We hope this email finds you well. We wanted to inform you that your appointment with our dentist,<b> ${doctor.name}</b>, has been successfully completed. We appreciate your visit and hope you had a positive experience.<br>
  
  If you have any feedback or further questions, please feel free to reach out to us at dentdesks@gmail.com.<br>
  
  Thank you for choosing our dental services!<br>
  
  Best regards,<br>
  DENTCARE`
                });
                break;

            case 'canceled':
                sendEmail({
                    email: `${user.email}`,
                    subject: 'Your Appointment is Canceled',
                    body: `Dear ${user.name},<br>
  
  We regret to inform you that your appointment with our dentist, <b>${doctor.name}</b>, has been canceled. We apologize for any inconvenience caused.<br>
  
  If you would like to reschedule your appointment or have any further questions, please contact us at dentdesks@gmail.com.<br>
  
  Thank you for your understanding.<br>
  
  Best regards,<br>
  DENTCARE`
                });
                break;

            default:
                break;
        }

        res.status(200).send({ "msg": "Appointment Updated", updatedAppointment });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};


module.exports = { AddAppointment, getAppointmentbyID, getallAppointment, getuserAppointment, getdoctorAppointment, updateAppointment }