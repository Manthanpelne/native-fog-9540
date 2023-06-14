const express = require('express');
const { getDoctors, addDoctor, updateDoctor, DeleteDoctor, getAppointments, GetDoctorByID } = require('../Controller/doctor.controller');
const DoctorRouter = express.Router()

//------->/doctor/

DoctorRouter.get("/", getDoctors)
DoctorRouter.post("/add/:id", addDoctor)
DoctorRouter.patch("/update/:id", updateDoctor)
DoctorRouter.delete("/delete/:id", DeleteDoctor)
DoctorRouter.get("/:id", GetDoctorByID)


//--------> Appointments

DoctorRouter.get("/appoint/:id", getAppointments)



module.exports = { DoctorRouter }