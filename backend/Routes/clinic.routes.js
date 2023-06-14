const express = require('express');
const { getClinic, postClinic } = require('../Controller/Clinic.controller');
const ClinicRouter = express.Router()

ClinicRouter.get("/", getClinic)
ClinicRouter.post("/add", postClinic)


module.exports = ClinicRouter