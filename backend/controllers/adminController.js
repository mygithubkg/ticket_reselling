import db from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


const saltrounds = parseInt(process.env.SALT_ROUND,10);


export const getUsers = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM users");
    if (data.rows.length == 0) {
      return res.status(200).json({ success: false, message: "No users Exist" });
    }
    res.status(200).json({ success: true, information: data.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};

export const getTickets = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM tickets");
    if (data.rows.length == 0) {
      return res.status(200).json({ success: false, message: "No Tickets Exist" });
    }
    res.status(200).json({ success: true, information: data.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};

export const getEvents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM events");
    if (data.rows.length == 0) {
      return res.status(200).json({ success: false, message: "No Event Exist" });
    }
    res.status(200).json({ success: true, information: data.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }
  try {
    await db.query("DELETE FROM users WHERE customer_id = $1", [id]);
    const check = await db.query("SELECT * FROM users WHERE customer_id = $1", [id]);
    if (check.rows.length == 0) {
      return res.status(200).json({ success: true, message: "User Deleted Successfully" });
    }
    res.status(200).json({ success: false, message: "Try again after some time facing some issues!" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Facing some problem");
  }
};

export const deleteTicket = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ success: false, message: "Ticket ID is required." });
  }
  try {
    await db.query("DELETE FROM tickets WHERE ticket_id = $1", [id]);
    const check = await db.query("SELECT * FROM tickets WHERE ticket_id = $1", [id]);
    if (check.rows.length == 0) {
      return res.status(200).json({ success: true, message: "Ticket Deleted Successfully" });
    }
    res.status(200).json({ success: false, message: "Try again after some time facing some issues!" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Facing some problem");
  }
};

export const deleteEvent = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({ success: false, message: "Event ID is required." });
  }
  try {
    await db.query("DELETE FROM events WHERE event_id = $1", [id]);
    const check = await db.query("SELECT * FROM events WHERE event_id = $1", [id]);
    if (check.rows.length == 0) {
      return res.status(200).json({ success: true, message: "Event Deleted Successfully" });
    }
    res.status(200).json({ success: false, message: "Try again after some time facing some issues!" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Facing some problem");
  }
};


export const addEvent = async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;

    const { event_name, event_date,event_time, event_location,event_bio,event_type} = req.body;

    try {
      const total = await db.query("SELECT COUNT(*) FROM events");
      const result = await db.query("INSERT INTO events (event_name, event_date,event_time, event_location,event_bio,event_type,event_id) VALUES ($1, $2, $3, $4, $5, $6)", 
        [event_name, event_date,event_time, event_location,event_bio,event_type,total.rows[0].count + 1]);
      res.status(200).json({ success: true, message: "Event added successfully",});
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err });
    }

  })
};

export const editEvent = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = decoded;
    const {event_name, event_date,event_time, event_location,event_bio,event_type} = req.body;

    try {
      const total = await db.query("SELECT COUNT(*) FROM events");
      const result = await db.query("UPDATE events SET event_name = $1, event_date = $2, event_time = $3, event_location = $4, event_bio = $5, event_type = $6 WHERE event_id = $7", 
        [event_name, event_date,event_time, event_location,event_bio,event_type,id]);
      res.status(200).json({ success: true, message: "Event added successfully",});
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err });
    }

  })
};



export const resetPassword = async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const user_token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header

  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
          return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      bcrypt.hash(password, saltrounds, async (err, hash) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ success: false, message: `Found ${err}` });
          }

          try {
              const check_user = await db.query("UPDATE users SET password=$1 WHERE username=$2 RETURNING *", [hash, email]);
              if (check_user.rows.length >= 1) {
                  return res.status(200).json({ success: true, message: `Password updated successfully` });
              } else {
                  return res.status(404).json({ success: false, message: `User not found` });
              }
          } catch (err) {
              console.log(err);
              return res.status(500).json({ success: false, message: `Try After Some Time!` });
          }
      });
  });
};