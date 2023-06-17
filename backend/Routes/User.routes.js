const express = require ("express")
const { signup, login, logout, Alluser, userdata, deleteuser, resetPassword } = require("../Controller/User.controller")
const {auth} = require("../Middleware/Auth.middleware")
const {role} = require("../Middleware/Role.middleware")
const userRoutes = express.Router()

userRoutes.post("/register",signup)
userRoutes.post("/login",login)
userRoutes.get("/logout",auth,logout)
userRoutes.get("/Alluser",auth,role(["Admin"]),Alluser)
userRoutes.get("/:id",userdata)
userRoutes.delete("/deleteuser/:id",auth,role(["Admin"]),deleteuser)
userRoutes.patch("/reset-password",resetPassword)
module.exports = {userRoutes}