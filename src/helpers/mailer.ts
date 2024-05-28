import nodemailer from 'nodemailer';

export async function sendEmail(email:string,emailType:string,userId:string){
    try {

       
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from:  'dhatrish29@gmail.com', // sender address
            to: email, 
            subject: emailType == "VERIFY" ? "verify your email":"reset your password", // Subject line
         
            html: "<b>Hello world?</b>", // html body
          }

          const info = await transporter.sendMail(mailOptions);
        
          console.log("Message sent: %s", info.messageId);
          return info ;

    } catch (error) {
        console.log("some error in mailer: %s", error)
    }
}