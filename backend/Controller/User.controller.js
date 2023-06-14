const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/User.model");
const { BlacklistModel } = require("../Model/Blacklist.model");
require("dotenv").config();

const signup = async (req, res) => {
    const {name,email,password,role} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user) return res.status(400).send({"msg":"User Already There Login"})
        bcrypt.hash(password, 5, async(err, hash)=> {
            const newuser = new UserModel({name,email,password:hash,role})
            await newuser.save()
            res.status(200).send({"msg":"Register Success"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}

const login = async(req,res) =>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user) return res.status(400).send({"msg":"register First"})
        bcrypt.compare(password, user.password, async(err, result) =>{
            if(err) return res.status(400).send("Wrong Password")
           if(result){
            const accessToken = jwt.sign({UserId:`${user._id}`,role:user.role}, process.env.TOKENKEY,{expiresIn:"7d"})
            const refreshToken = jwt.sign({UserId:`${user._id}`,role:user.role},process.env.REFRESHTOKENKEY,{expiresIn:"28d"})

            

            res.status(200).send({"msg":"login Success",accessToken,refreshToken,user})
           }else{
            return res.status(400).send({"msg":"Wrong Password"})
           }
        });
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}

const logout = async (req,res)=>{
    try {
        const token = req.headers.authorization;
        const newAccessToken = new BlacklistModel({ token: token });
        await newAccessToken.save();
        res.status(200).send({ msg: "Logout Success" });
      } catch (error) {
        res.status(400).send({ msg: error.message });
      }
}

const Alluser = async (req,res)=>{
    try {
        const users = await UserModel.find()
        res.status(200).send({"msg": "all users",users})
    } catch (err) {
        res.send(err.message)
    }
}

const userdata = async(req,res)=>{
    try {
        const id = req.params.id

        const user =  await UserModel.findOne({_id:id})

        if(!user) return res.status(400).send({"msg":"No User"})

        res.status(200).send({"user":user})
     } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}

const deleteuser = async(req,res)=>{
    try {
        const id = req.params.id

        const user =  await UserModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"User deleted successfully."})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}

module.exports = {signup,login,logout,Alluser,userdata,deleteuser}