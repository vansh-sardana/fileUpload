const mongoose= require("mongoose");
const nodemailer= require("nodemailer");
require("dotenv").config();

const fileSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

fileSchema.post("save", async(post)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: 'Vansh Sardana', // sender address
        to: `${post.email}`, // list of receivers
        subject: `Hi ${post.name}, A new file uploaded to the Database`, // Subject line
        text: "This is an alert for a new file uploaded to the database", // plain text body
        html: `Link: <a href=${post.imageUrl}>${post.imageUrl}</a>`, // html body
      });

      console.log("Email sent");
      console.log(info);
})

  
module.exports= mongoose.model("File", fileSchema);