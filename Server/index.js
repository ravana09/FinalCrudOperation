const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const randomstring = require("randomstring");
const nodemailer =require("nodemailer")



require('dotenv').config();


const port = 5000 || process.env.PORT


const app = express();
app.use(express.json());
app.use(cors());



// Define Profile schema
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: Number,
  avatar: String,
},{
    timestamps:true
}

);

const Profile = mongoose.model('Profile', profileSchema);

//reading data 
app.get("/", async(req,res)=>{

    const data = await Profile.find({})
    res.json( {success: true , data: data })
})

//craete data 
app.post("/create", async(req,res)=>{

    console.log(req.body)
    const data = new Profile(req.body)
    await data.save()
    res.json( {success: true , message: "Data has been saved succesfully ",Data:data })
});


//update data 
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {id,...rest}=req.body;
    console.log(rest)
    const data= await Profile.updateOne({_id:id},rest)
    res.json( {success: true , message: "Data has been updated  succesfully ", Data:data })

})

//delete data

app.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id;
    console.log(id)
    const data =await Profile.deleteOne({_id:id})


    res.json( {success: true , message: "Data has been deleted   succesfully ",Data:data })

})

//connection of db

mongoose.connect('mongodb://localhost:27017/crudData')
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port:http://localhost:${port}`);
      });
})
.catch((err)=>{
console.log(`Error fetch in db connection :${err}`)
})

//email validation 

// Temporary storage for OTPs (in a real-world scenario, use a database)
const otpStorage = {};

// Nodemailer configuration (replace with your email service provider settings)
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2ff6572b915291",
      pass: "77482357d6b8fb"
    }
  });

// Generate and send OTP
app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  const otp = randomstring.generate({ length: 6, charset: "numeric" });

  // Save OTP to temporary storage
  otpStorage[email] = otp;

  // Email options
  const mailOptions = {
    from: "pradeep09sathish@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    }
  });
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // Retrieve OTP from temporary storage
  const storedOtp = otpStorage[email];

  if (otp === storedOtp) {
    // OTP is valid
    res.status(200).json({ valid: true, message: "OTP is valid" });
  } else {
    // OTP is invalid
    res.status(400).json({ valid: false, message: "Invalid OTP" });
  }
})







