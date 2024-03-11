const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/'); // Set destination folder for uploads
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set filename with current timestamp
  }
});

const upload = multer({ storage: storage });

// Define Profile schema
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: Number,
  avatar: String,
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/crudData')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error fetching db connection :${err}`);
  });

// Email configuration
const transporter = nodemailer.createTransport({
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
});

// Create data with file upload
app.post("/create", upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const avatar = req.file ? req.file.path : null; // Check if avatar file exists in request

    const data = new Profile({ name, email, password, phoneNumber, avatar });
    await data.save();
    res.json({ success: true, message: "Data has been saved successfully", Data: data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error in saving data" });
  }
});








