const express = require("express")
const app = express()
const {userRoutes} = require("./Routes/User.routes")
app.use(express.json())
require("dotenv").config()
const {connection} = require("./db")


app.get("/",(req,res)=>{
    res.send("api run endpoint")
})

app.use("/user",userRoutes)

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