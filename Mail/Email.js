const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const sendEmail = async(mail,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.user,
        pass: process.env.pass
        },
        });
        await transporter.sendMail({
            from: process.env.user,
            to: mail,
            subject: subject,
            text: text,
        });
        console.log("email sent sucessfully");
    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Internal Server Error"});
    }
}
module.exports={
    sendEmail
}