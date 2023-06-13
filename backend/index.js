const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const {connection} = require("./db")


app.get("/",(req,res)=>{
    res.send("api run endpoint")
})




app.listen(4500,async()=>{
    await connection
    console.log(`running at port ${process.env.port}`)
})