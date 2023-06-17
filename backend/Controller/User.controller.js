const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/User.model");
const { BlacklistModel } = require("../Model/Blacklist.model");
const { sendEmail } = require("../Services/mail")
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
        const users = await UserModel.find({role:"User"})
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

const resetPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).send({
          msg: "User does not exist",
        });
      }
  
      // Generate a new plain text password
      const plainTextPassword = generateRandomPassword();
  
      // Generate the bcrypt hash of the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  
      // Update the user's password in the database with the bcrypt hash
      await UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
  
      // Send the email with the plain text password
      let data = {
        email: user.email,
        subject: "Password Reset",
        body: `
          Hi,<br>
          Your password has been reset. Your new password is:<br>
          ${plainTextPassword}<br>
          Please change your password once you log in.<br>
          Thanks,<br>
          Dent Desk
        `,
      };
      await sendEmail(data);
  
      res.status(200).send({
        msg: "Password has been reset",
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message,
      });
    }
  };
  
  // Helper function to generate a random plain text password
  function generateRandomPassword() {
    const length = 10; // Length of the password
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return password;
  }  

module.exports = {signup,login,logout,Alluser,userdata,deleteuser,resetPassword }