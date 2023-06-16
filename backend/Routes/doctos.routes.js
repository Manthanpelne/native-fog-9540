const express = require('express');
const { getDoctors, addDoctor, updateDoctor, DeleteDoctor, getAppointments, GetDoctorByID, getSearchedData, Doctorbyname } = require('../Controller/doctor.controller');
const { auth } = require('../Middleware/Auth.middleware');
const { role } = require('../Middleware/Role.middleware');
const DoctorRouter = express.Router()

//------->/doctor/

DoctorRouter.get("/", getDoctors)
DoctorRouter.post("/add/:ClinicId",  addDoctor)
DoctorRouter.patch("/update/:id", auth, role(["Admin"]), updateDoctor)
DoctorRouter.delete("/delete/:id", auth, role(["Admin"]), DeleteDoctor)
DoctorRouter.get("/byid/:id", GetDoctorByID)

DoctorRouter.get("/byname",Doctorbyname)
//--------> Appointments

DoctorRouter.get("/appoint/:id", getAppointments)

DoctorRouter.get("/searchDoc", getSearchedData)



module.exports = { DoctorRouter }