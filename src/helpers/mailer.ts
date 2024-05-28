import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs";
import { User } from "@/models/userModel";

interface sendEmailProps{
  email:string,
  emailType:string,
  userId:string
}
export async function sendEmail({
  email,
  emailType,
  userId
}:sendEmailProps){
    
    
    try {
      const hashedToken = await bcrypt.hash(userId.toString(), 10)

      if (emailType === "VERIFY") {
          await User.findByIdAndUpdate(userId, 
              {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
      } else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId, 
              {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
      }

       
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ecd43a06430d6f",
          pass: "224b0c00f37451"
        }
      });
      const mailOptions = {
        from: 'dhatrish29@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
    }

       const mailresponse = await transport.sendMail
       (mailOptions);
       return mailresponse;


    } catch (error) {
        console.log("some error in mailer: %s", error)
    }
}