const { Sign} = require('../Models/models');
const {updateschema } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../Mail/Email");
const dotenv = require("dotenv").config();


const userSign = async(req,res)=>{
    try{
        const userVal = updateschema.validate(req.body);
        if(userVal.error){
            return res.status(400).json({ message: userVal.error.details[0].message });
        }
        
        const userDetail = {
            mail:req.body.mail,
            password:req.body.password
        }
        const existingUser = await Sign.findOne({where:{mail:userDetail.mail}});
        if(!existingUser) {
        return res.status(200).json(`User Does Not Exists`);}
        else{
            const hash = await bcrypt.compareSync(userDetail.password, existingUser.password);
            if (existingUser.mail = userDetail.mail && hash){
                return res.status(200).json({message:"User login Successfull"});
            }else{
                return res.status(200).json({message:"User login Failed"});
            }
        }


    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Server Error"})
    }
}


const passRequest = async(req,res)=>{
    try{
        const userVal = updateschema.validate(req.body);
        if(userVal.error){
            return res.status(400).json({ message: userVal.error.details[0].message });
        }
        const existingUser = await Sign.findOne({where:{mail:req.body.mail}});
        if(!existingUser) {
        return res.status(200).json(`User Does Not Exists`);}
        else{
            const resetToken = jwt.sign( {mail : existingUser.mail},process.env.secretToken);
            const link = `http://localhost:3800/api/PassChange/${resetToken}`;
            sendEmail(existingUser.mail, 'Password Reset Request', link);
            return res.status(200).json({ message: "Password reset link sent successfully" });
        }
    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}


const passChange = async(req,res)=>{
    try{
        const resetToken = req.params;
        
        console.log(resetToken)
        const decodedToken = jwt.verify(resetToken.token, process.env.secretToken);
        console.log(decodedToken)
        if (!decodedToken || !decodedToken.mail) {
            return res.status(400).json({ message: "Invalid token" });
        }



        const existingUser = await Sign.findOne({ where: { mail: decodedToken.mail } });
        console.log(existingUser)
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword)
        await existingUser.update({password:hashedPassword});
        return res.status(200).json({ message: "Password changed successfully" });
    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {
    userSign,
    passRequest,
    passChange
}