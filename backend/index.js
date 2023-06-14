const express = require("express")
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cors())


require("dotenv").config()
const { connection } = require("./db");
const { DoctorRouter } = require("./Routes/doctos.routes");


app.get("/", (req, res) => {
    res.send("api run endpoint")
})

//--------->Doctor Route <-------//
app.use("/doctor", DoctorRouter)


app.listen(4500, async () => {
    try {
        await connection
        console.log("Connected To database");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`running at port ${process.env.port}`)
})