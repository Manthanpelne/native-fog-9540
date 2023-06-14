const express = require("express")
const { AppointmentModel } = require("../Model/Appointment.model")
const AppointmentRoute = express.Router()

AppointmentRoute.post("/Book/:id", auth , async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})


module.exports = {AppointmentRoute}