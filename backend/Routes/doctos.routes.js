const express = require('express');
const { getDoctors, addDoctor, updateDoctor, DeleteDoctor, getAppointments } = require('../Controller/doctor.controller');
const DoctorRouter = express.Router()

//------->/doctor/

DoctorRouter.get("/", getDoctors)
DoctorRouter.post("/add", addDoctor)
DoctorRouter.patch("/update/:id", updateDoctor)
DoctorRouter.delete("/delete/:id", DeleteDoctor)

//--------> Appointments

DoctorRouter.get("/appoint/:id", getAppointments)



module.exports = { DoctorRouter }