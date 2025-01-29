import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
    ``
// Setting up email sending 
const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    secure:  false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  }
);

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to mail server:", error);
  } else {
    console.log("Mail server is ready to take our messages");
  }
});


export const sendOTP =  async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(500).json({ success: false });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const OTP = otp;
  req.user = decoded;
  const email = req.user.username;
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Use this OTP to verify your account',
    html: `<h1>Welcome User!</h1>
    <br>
    <p>We're excited to have you on board. Verify yourself and become an exciting member of Trademyticket</p>
    <br>
    <p> Your OTP is </p> <br>
    <h2>${otp}</h2>
    <p>only valid for 10 minutes.</p>`, 
  };
  try{
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
      }
    });
  }catch(err){
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
  });
};

export const sendEmail = async (req, res) => {
    const {name, email, message } = req.body;
    const user_token = req.cookies.jwt_user_cookie;
    jwt.verify(user_token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(500).json({ success: false });
    }
    req.user = decoded;
    var mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'New message from Trademyticket',
        html: `<h1>New message from Trademyticket</h1>
        <br>
        <p>Name: ${name}</p>
        <p>Email of User: ${email}</p>
        <p>Message of user: ${message}</p>`,
    };
    try{
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: "Email sent successfully" });
        }
        });
    }catch(err){    
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }   
});
};


