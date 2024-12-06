import nodemailer from 'nodemailer'
import { User } from '@/models/userModel'
import bcryptjs from "bcryptjs"

export const sendEmail = async({email,emailType,userId}:any) =>{
    try{
        const token = await bcryptjs.hash(userId.toString(),10)

        if(emailType==="VERIFY"){
            const response =await User.findByIdAndUpdate(userId,{
                verifyToken : token,
                verifyTokenExpiry : Date.now() + 3600000
            })
            console.log(response);
        }else if(emailType==="RESET"){
            const response = await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.user,
              pass: process.env.password
            }
        })

        const mailOptions= {
            from : "belikelord@gmail.com",
            to: email,
            subject : emailType ==="VERIFY" ? "Verify your Email" : "Reset Password",
            html: `<p>
                    Click <a href="${process.env.domain}/verifyEmail?token=${token}">here 
                    </a>
                    to
                    ${emailType==="VERIFY" ? "Verify your Email" : "Reset your password"}

                    <span>${process.env.domain}/verifyEmail?token=${token}</span>
                </p`
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    
    }catch(e : any){
        throw new Error(e.message)
    }
}