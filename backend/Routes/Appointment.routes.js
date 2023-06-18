const express = require("express")

const { auth } = require("../Middleware/Auth.middleware")
const { role } = require("../Middleware/Role.middleware")
const { AddAppointment, getAppointmentbyID, getallAppointment, getuserAppointment, getdoctorAppointment, updateAppointment } = require("../Controller/Appoinment.controller")
const AppointmentRoute = express.Router()

AppointmentRoute.post("/Book/:doctorid", auth, AddAppointment)


AppointmentRoute.get("/appoint/:id", getAppointmentbyID)

AppointmentRoute.get("/all", getallAppointment)

// all the appointments of the user 
AppointmentRoute.get("/userAppointment", auth, getuserAppointment);

// all the appointments of the doctor
AppointmentRoute.get("/doctorAppointment/:id", auth, role(["Doctor"]), getdoctorAppointment);
// update the appointment
AppointmentRoute.patch("/doctorAppointment/:id", auth, role(["Doctor"]), updateAppointment);

module.exports = { AppointmentRoute }