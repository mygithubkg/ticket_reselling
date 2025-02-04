import db from '../db.js';
import jwt from 'jsonwebtoken';

// Building the chat system

const questions_chat_bot = {
  1: "Know more about the seller",
  2: "Proceed to payment Gateway",
  3: "Want to negotiate the amount",
  4: "Any specific query, write to us.."
};

export const chat_system = async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    res.status(200).json({ success: true, questions: questions_chat_bot });
  });
};

export const reply_1 = async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    try {
      const data = await db.query("SELECT * FROM details WHERE username = $1", [req.user.username]);
      const info = data.rows[0];
      res.status(200).json({
        success: true,
        detail: info,
        questions: { 1: "Return to main page" }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Try again after some time" });
    }
  });
};

export const reply_2 = async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    res.status(200).json({
      success: true,
      message: "Redirecting to payment gateway...",
      questions: { 1: "Return to main page" }
    });
  });
};

export const reply_3 = async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    try {
      const data = await db.query("SELECT * FROM details WHERE username = $1", [req.user.username]);
      const info = data.rows[0];
      res.status(200).json({
        success: true,
        detail: info,
        questions: { 1: "Return to main page" }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Try again after some time" });
    }
  });
};

export const reply_4 = async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    const { query } = req.body;
    try {
      // Handle the specific query here
      res.status(200).json({
        success: true,
        message: "Your query has been received. We will get back to you soon.",
        questions: { 1: "Return to main page" }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Try again after some time" });
    }
  });
};


export const chat_userinfo = async(req, res) => {
  const username = req.body.username;
  const user_token = req.cookies.jwt_user_cookie;
  console.log(username);
  jwt.verify(user_token, process.env.JWT_SECRET, async(err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    try {
      const data = await db.query("SELECT * FROM details WHERE username = $1", [username]);
      const info = data.rows[0];
      console.log(info);
      res.status(200).json({ success: true, userinfo: info });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Try again after some time" });
    }
  });
};


export const chat_nego = async(req,res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async(err,decoded) =>{
    if (err){
      return res.status(401).json({succes:false, message: "Unauthorized"});
    }
    req.user = decoded;
  })
  const {amount, ticket_id, ticket_owner, message} = req.body;
  console.log(amount,ticket_id,req.user.username, message, ticket_owner)
  try{
    const insertnegotiation = await db.query('INSERT INTO negotiatedAmount (ticket_owner, ticket_buyer,ticket_id, message, amount) VALUES ($1,$2,$3,$4,$5)',[ticket_owner,req.user.username,ticket_id,message,amount]);
    res.json({ success: true, message: "Negotiation saved successfully" });
  }catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving negotiation" });
}
}


export const chat_noti = async (req,res) => {
  const user_token = req.cookies.jwt_user_cookie;
    jwt.verify(user_token, process.env.JWT_SECRET, async(err,decoded) =>{
      if (err){
        return res.status(401).json({succes:false, message: "Unauthorized"});
      }
      req.user = decoded;
    })
    const { sender_username, message_text } = req.body;
    try {
        const insertQuery = `
            INSERT INTO notifications (sender_username, recipient_username, message_text)
            VALUES ($1, $2, $3)
        `;
        await db.query(insertQuery, [sender_username, req.user.username, message_text]);
        res.json({ success: true, message: "Notification saved successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error saving notification" });
    }
}