const express = require("express")
const cors = require('cors');
const app = express()
const {userRoutes} = require("./Routes/User.routes")
const { AppointmentRoute } = require("./Routes/Appointment.routes");
app.use(express.json())
app.use(cors())


require("dotenv").config()
const { connection } = require("./db");
const { DoctorRouter } = require("./Routes/doctos.routes");
const { FeedBackRouter } = require("./Routes/feedback.routes");


app.get("/", (req, res) => {
    res.send("api run endpoint")
})


app.use("/user",userRoutes)
app.use("/appointment",AppointmentRoute)
//--------->Doctor Route <-------//
app.use("/doctor", DoctorRouter)


//--------->Feedback <---------//
app.use("/feedback", FeedBackRouter)



app.listen(process.env.port,async () =>{

    try {
     await connection;
     console.log("connected to the db")
    } catch (error) {
       console.log("could not connected to the db")
       console.log(error.message)
    }
    console.log(`server is running in the port:${process.env.port}`);
 })


