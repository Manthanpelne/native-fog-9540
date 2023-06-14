const express = require("express")
const cors = require('cors');
const app = express()
const { userRoutes } = require("./Routes/User.routes")
app.use(express.json())
app.use(cors())


require("dotenv").config()
const { connection } = require("./db");
const { DoctorRouter } = require("./Routes/doctos.routes");
const { FeedBackRouter } = require("./Routes/feedback.routes");
const ClinicRouter = require("./Routes/clinic.routes");


app.get("/", (req, res) => {
    res.send("api run endpoint")
})


app.use("/user", userRoutes)
//--------->Doctor Route <-------//
app.use("/doctor", DoctorRouter)


//--------->Feedback <---------//
app.use("/feedback", FeedBackRouter)

//--------> Clinic <---------//
app.use("/clinic", ClinicRouter)





app.listen(process.env.port, async () => {

    try {
        await connection;
        console.log("connected to the db")
    } catch (error) {
        console.log("could not connected to the db")
        console.log(error.message)
    }
    console.log(`server is running in the port:${process.env.port}`);
})


