const express = require('express');
const { getClinic, postClinic, updateClinic, deleteClinic, addDoctorToClinic, getAllClinic } = require('../Controller/Clinic.controller');
const { auth } = require('../Middleware/Auth.middleware');
const { role } = require('../Middleware/Role.middleware');
const ClinicRouter = express.Router()

ClinicRouter.get("/", getClinic)
ClinicRouter.post("/add", auth, role(["Admin"]), postClinic)
ClinicRouter.patch("/update/:id", auth, role(["Admin"]), updateClinic)
ClinicRouter.delete("/delete/:id", auth, role(['Admin']), deleteClinic)
ClinicRouter.get("/getallclinic",getAllClinic)

//optional route
ClinicRouter.post("/add-doctor/:id", auth, role(['Admin']), addDoctorToClinic)

module.exports = ClinicRouter