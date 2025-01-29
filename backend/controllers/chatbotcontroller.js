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
