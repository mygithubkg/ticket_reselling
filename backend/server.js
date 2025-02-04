// Modules used 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import Nodemailer from "nodemailer";
import GoogleStrategy from "passport-google-oauth2";
import pgSession from "connect-pg-simple";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// For Socket.io importing create server to upgrade
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import router_admin from "./controllers/admin.js";
import db from "./db.js";
import router_mail from "./managemail.js";  
import chat_router from "./routes/chatbot.js";

// to find directory of file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();

// Declaring Const 
const app = express();
const port = process.env.SERVER_PORT || 5000;
const saltrounds = parseInt(process.env.SALT_ROUND,10);

const { hash } = bcrypt; 

let users = {};
let sockets = {};

// Using Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://ticket-reselling-frontend.onrender.com' || "http://localhost:3000",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(cookieParser());

app.use('/admin', router_admin);
app.use('/user', router_mail);
app.use('/chat', chat_router);

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // log the error
  res.status(500).json({ success: false, message: "Internal Server Error" });
});


//  For maintaining user signed throughout the session
app.use(session({
  store: new (pgSession(session))({
    conObject: {
      connectionString: process.env.DATABASE_URL, // Your PostgreSQL connection string
    },
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly:true,
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
  },
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());




// creating server for socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Replace with your Render client URL
    methods: ["GET", "POST","DELETE","PUT","PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow credentials (cookies)
  },
});

console.log('CORS Origin:', process.env.CLIENT_URL || 'https://ticket-reselling-frontend.onrender.com' || 'http://localhost:3000');
app.options('*', cors());

app.use((req, res, next) => {
  req.headers["socket-id"] = req.get("Socket-ID");
  next();
});

// JWT
app.use((req, res, next) => {
  req.headers["socket-id"] = req.get("Socket-ID");
  next();
});





// Use db.query instead of creating a new pg.Client instance
db.query('SELECT NOW()', [])
  .then(res => console.log('Database connected:', res.rows[0]))
  .catch(error => console.error('Error connecting to the database:', error));



// Creating Tables

// async function createTables() {
//   const schemaPath = path.join(__dirname, "schema.sql"); // Save the SQL script above in a file named 'schema.sql'
//   const schema = fs.readFileSync(schemaPath, "utf-8");

//   try {
//     await db.query(schema);
//     console.log("Database tables created successfully!");
//   } catch (error) {
//     console.error("Error creating database tables:", error);
//   }
// }

// createTables();

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle user joining
  socket.on("join", (username) => {
    users[username] = socket.id;
    sockets[socket.id] = username;
    console.log(`User ${username} joined with socket ID: ${socket.id}`);

    // Broadcast the updated user list to all clients
    io.emit("update_users", Object.keys(users));
  });

  // Listen for a message from a client
  // Add this to the `send_message` event in io.on('connection'):
socket.on("send_message", async (data) => {
const { recipient, message } = data;
const senderUsername = sockets[socket.id]; // Retrieve sender's username

try {
  // Fetch recipient user ID
  const recipientQuery = "SELECT customer_id FROM users WHERE username = $1";
  const recipientResult = await db.query(recipientQuery, [recipient]);
  if (recipientResult.rows.length === 0) {
    console.log(`Recipient ${recipient} not found`);
    return;
  }

  const recipientId = recipientResult.rows[0].customer_id;

  // Fetch sender user ID
  const senderQuery = "SELECT customer_id FROM users WHERE username = $1";
  const senderResult = await db.query(senderQuery, [senderUsername]);
  if (senderResult.rows.length === 0) {
    console.log(`Sender ${senderUsername} not found`);
    return;
  }

  const senderId = senderResult.rows[0].customer_id;

  // Insert message into the database
  const messageQuery = `
    INSERT INTO messages (sender_id, recipient_id, message)
    VALUES ($1, $2, $3)
  `;
  await db.query(messageQuery, [senderId, recipientId, message]);

  // Emit the message to the recipient
  const recipientSocketId = users[recipient];
  if (recipientSocketId) {
    io.to(recipientSocketId).emit("receive_message", {
      sender: senderUsername,
      message,
    });
  } else {
    console.log(`User ${recipient} is not connected`);
  }
} catch (error) {
  console.error("Error sending message:", error);
}
});


  // Handle user disconnection
  socket.on("disconnect", () => {
    const disconnectedUser = sockets[socket.id];
    if (disconnectedUser) {
      delete users[disconnectedUser];
      delete sockets[socket.id];
      console.log(`User ${disconnectedUser} disconnected`);

      // Broadcast the updated user list to all clients
      io.emit("update_users", Object.keys(users));
    }
  });
});


// To verify if user is Loggedin

// app.get('/verify', (req,res)=>{
//   // console.log("user session:", req.session); // Log the session object
//   // console.log("User g:", req.user); // Log the user object
//   if (req.isAuthenticated()){
//     res.json({success:true, username: req.user.username});
//   }else{
//     res.json({success:false})
//   }
// })

app.get('/verify', (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  if (!user_token) {
    return res.json({ success: false });
  }
  jwt.verify(user_token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ success: false });
    }
    res.json({ success: true, username: decoded.username });
  });
});


// Normal get request

app.get('*', (req, res) => {
  res.status(404).send('Incorrect URL');
});





app.use((req, res, next) => {
  console.log("Authenticated:", req.isAuthenticated());
  next();
});

app.post('/verify/account', async(req,res)=>{
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
  if (err) {
    return res.status(500).json({ success: false });
  }
  req.user = decoded;
  try{
    const verify = await db.query("SELECT verified FROM users")
    if (verify){
      res.status(200).json({success:true})
    }
    else{
      res.status(200).json({success:false})
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
})
})

app.post('/verify/otp', async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  const OTP = req.body.otp;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ success: false });
    }
    req.user = decoded;
    const code = req.body.otp;
    const email = req.user.username;
    console.log("otp is:",OTP);
    console.log(code);
    if (code == OTP){
      try {
          const result = await db.query("SELECT * FROM users WHERE username = $1", [email]);
          if (result.rows.length === 0) {
              return res.status(404).json({ success: false, message: "User not found" });
          } else{
              await db.query("UPDATE users SET verified = true WHERE username = $1", [email]);
              return res.status(200).json({ success: true, message: "Account verified successfully" });
          }
      } catch (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: "Server error" });
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  });

});
app.post('/listing1', async (req,res)=>{
  // console.log(req.body);
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.json({ success: false });
    }
    else{ 
      req.user = decoded;
      try{
        const data = await db.query("SELECT username FROM users WHERE username = $1",[req.user.username]);
        const id = await db.query("SELECT COUNT(*) FROM events");
        if (data.rows.length >=1 ){
          // console.log(`data :`,data.rows[0].username);
          // console.log(req.user.username)
          if (data.rows[0].username === req.user.username){
            await db.query("INSERT INTO events (username, event_type, event_date, event_time, event_name, event_location, event_bio,event_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8)",[req.user.username, req.body.event_type, req.body.event_date, req.body.event_time, req.body.event_name, req.body.event_location, req.body.event_bio,parseInt(id.rows[0].count) + 1]);
            res.status(200).json({success:true, message:"Event Details Added!!"});
          }else{
            res.status(500).json({success:false, message:"Problem adding Event Details"});
          }
        }else{
          res.status(500).json({success:false, message:"User not Authorized"});
        }
      }catch(err){
        console.log(err);
      }
    }
    })
  });


    app.post('/event/event_name', async(req,res)=>{
    try{
      const response = await db.query("SELECT event_name FROM events");
      const names = response.rows;
      // console.log(names);
      if (response.rows.length > 0){
        res.status(200).json({success:true, names});
      }
      else{
        res.status(500).json({success:false,message: "Add event first"} )
    }
    }catch(err){
      console.log(err);
    }  
})


app.post('/listing2', async (req,res)=>{
  // console.log(req.body);
  // console.log(req.user);
  console.log(req.body.event_name);
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.json({ success: false });
    }
    else{
      req.user = decoded;
      try{
        //Selecting username of user 
        const data = await db.query("SELECT username FROM users WHERE username = $1",[req.user.username]);
  
  
        if (data.rows.length >=1 ){
          console.log(`data :`,data.rows[0].username);
  
          // Selecting Name of User
  
          const name_of_user = await db.query("SELECT full_name FROM details WHERE username = $1",[req.user.username]);
  
          if (name_of_user.rows.length > 0){
            const name = name_of_user.rows[0].full_name;
            
            if (data.rows[0].username === req.user.username){
              await db.query("INSERT INTO tickets (username, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name,event_name) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9)",[req.user.username, req.body.ticket_type, req.body.selling_price, req.body.face_value, req.body.transferability, req.body.ticket_format, req.body.quantity,name, req.body.event_name]);
              res.status(200).json({success:true, message:"Event Details Added!!"});
            }else{
              res.status(500).json({success:false, message:"Problem adding Event Details"});
            }
          }else{
            res.status(500).json({success:false, message: "Kindly update your Profile first!"});
          }
        }else{
          res.status(500).json({success:false, message:"User not Authorized"});
        }
      }catch(err){
        console.log(err);
      }
    }
  // if (!req.isAuthenticated()){
  //   return res.status(500).json({ success: false, message: "Kindly Log In to Add Tickets" });
  // }

})
});

app.post('/eventdetails/:id', async (req, res) => {
  const id = parseInt(req.params.id,10);
  console.log(id);

  if (!id) {
    return res.status(400).json({ success: false, message: "Event ID is required." });
  }

  try {
    const data = await db.query("SELECT * FROM events WHERE event_id = $1", [id]);
    // console.log(data);
    if (data.rows.length > 0) {
      const event = data.rows[0];
      // console.log(event);
      res.status(200).json({ success: true, event });
    } else {
      res.status(404).json({ success: false, message: "No event found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.post('/eventdetail', async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM events");
    if (data.rows.length > 0) {
      const event = data.rows;
      // console.log(event);
      res.status(200).json({ success: true, event });
    } else {
      res.status(404).json({ success: false, message: "No event found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.post('/ticketdetails', async (req, res) => {
  const event_name = req.body.event_name;
  // console.log(event_name)
  try {
    const data = await db.query("SELECT * FROM tickets WHERE event_name = $1", [event_name]);
    // console.log(data.rows);
    if (data.rows.length > 0) {
      const ticket= data.rows;
      // console.log(ticket);
      res.status(200).json({ success: true, ticket });
    } else {
      res.status(404).json({ success: false, message: "No event found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});




// Sending Post request

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) {
       return next(err); 
      }
      const token = req.cookies.jwt_user_cookie;
      res.cookie('jwt_user_cookie', '', { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });
      res.json({success:true});
  });
});

// Message Backend
app.get("/getMessages", async (req, res) => {
  const { recipientId } = req.query;
  const senderUsername = sockets[req.headers["socket-id"]];

  try {
    const senderQuery = "SELECT customer_id FROM users WHERE username = $1";
    const senderResult = await db.query(senderQuery, [senderUsername]);
    if (senderResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sender not found" });
    }

    const senderId = senderResult.rows[0].customer_id;

    const messageQuery = `
      SELECT m.message, u.username AS sender
      FROM messages m
      JOIN users u ON m.sender_id = u.customer_id
      WHERE (m.sender_id = $1 AND m.recipient_id = $2)
         OR (m.sender_id = $2 AND m.recipient_id = $1)
      ORDER BY m.created_at
    `;
    const messageResult = await db.query(messageQuery, [senderId, recipientId]);

    res.json({ success: true, messages: messageResult.rows });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to verify and "add" an existing user to the chat list
app.post("/addUser", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: "Username is required" });
  }

  try {
    const userQuery = "SELECT * FROM users WHERE username = $1";
    const userResult = await db.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const user = userResult.rows[0];
    return res.status(200).json({
      success: true,
      message: "User exists and is added to your chat list.",
      user: { username: user.username, userId: user.id },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});




// Saving user details

app.post('/save',async (req,res)=>{
  const full_name = req.body.full_name;
  const want_to = req.body.want_to;
  const phone_number = req.body.phone_number;
  const gender = req.body.gender;
  const age = req.body.age;
  const bio = req.body.bio;
  const username = req.body.username;
  // console.log(req.body);
  try{
    await db.query('UPDATE details SET full_name = $1, want_to = $2, phone_number = $3, gender = $4, age = $5, bio = $6 WHERE username = $7',[full_name,want_to,phone_number,gender,age,bio,username
    ]);
    console.log("done");
    res.json({success:true});
  }catch(err){
    console.log(err);
    res.json({success:false, message: err});
  }
  
})


app.post('/usersinfo', async (req, res) => {
  const user_token = req.cookies.jwt_user_cookie;
  jwt.verify(user_token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(500).json({ success: false, message: "Try Again after Some Time" });
    }else{
      req.user = decoded;
      try {
          const info = await db.query('SELECT * FROM details WHERE username = $1', [req.user.username]);
          if (info.rows.length > 0) {
              return res.status(200).json(info.rows[0]);
          } else {
              return res.status(404).json({ success: false, message: "User details not found" });
          }
      } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Server error" });
      }
    }
  });
});


app.post("/register", (req, res)=> {
  const email = req.body.username;
  const password = req.body.password; 
  // console.log(email);
  // console.log(password);
  
  bcrypt.hash(password,saltrounds, async (err,hash)=> {
    // console.log(hash);
    if (err){
        console.log(err);
        res.status(500).json({success: false, message: `Found ${err}`});
    }
    else{
        try {
            const check_user = await db.query("SELECT * FROM users WHERE username = ($1)",[email]);
            if (check_user.rows.length >=1){
              res.status(200).json({success: false, message: `Already Registered try Logging In`});
            }
            else{
              try{
                const result = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",[email,hash]);
                await db.query("INSERT INTO details (username) VALUES ($1)",[email]);
                const user = result.rows[0];
                const token = generateToken(user);
                const update_profile = await db.query("UPDATE details SET username = $1 WHERE username = $2",[email,email]);
                req.login(user, (err)=> {
                  console.log(err);
                  res.cookie('jwt_user_cookie', token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });
                  res.status(200).json({success: true, message: `Registration Success, Login if Required`});
                })
              }

              catch (err){
                res.status(500).json({success: false, message: `Try After Some Time! `});
              }
            }
          }catch (err){
            res.status(500).json({success: false, message: `Try After Some Time Server Error! `});
          }
    }
  });
});
 

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

app.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Technical error" });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Login failed" });
      }
      const token = generateToken(user);
      res.cookie('jwt_user_cookie', token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });
      return res.status(200).json({ success: true, message: "Login successful" ,token_1: token});
    });
  })(req, res, next);
});


app.get('/auth/google', passport.authenticate('google',{
  scope: ['profile', 'email']
}
));
app.get('google/auth/signIn', passport.authenticate('google', {
  
}));


passport.use("local",new Strategy(
  async function verification(username,password,cb){
    // console.log(username);
    // console.log(password);
    try {
      const check_user = await db.query("SELECT password FROM users WHERE username = ($1)",[username]);
      // console.log(`Database query result: ${JSON.stringify(check_user.rows)}`);
      if (check_user.rows.length == 0){
          console.log("User does not exist");
          return cb(null,false,{message:"User does not Exist! Register now"})
          // res.status(500).json({success:false, message:"User does not Exist! Register now"});
      }else{
          // console.log(check_user.rows[0].password);
          const hashh = check_user.rows[0].password;
          bcrypt.compare(password,hashh, (err,result) =>{
            if (err){
              console.log(`Bcrypt error: ${err}`)
              return cb(err);
            }
            if (result){
              // console.log("Password match");
              return cb(null, { username });
            }else{
              console.log("Incorrect password");
              return cb(null, false, { message: "Incorrect password." });
            }
          })
          }
      }
      catch(err){
        console.log(err);
        return cb(err);
      }
  }
))

passport.use("google",new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google",
  passReqToCallback: true
}, async(req, accessToken, refreshToken, profile, cb) => {
  
}));



passport.serializeUser((user,cb) =>{
  cb(null,user);
});

passport.deserializeUser(async (user, cb) => {
  try {
      const result = await db.query("SELECT username FROM users WHERE username = $1", [user.username]);
      if (result.rows.length > 0) {
          cb(null, result.rows[0]);
      } else {
          cb(new Error("User not found"), null);
      }
  } catch (err) {
      cb(err, null);
  }
});
// listening to server instead of app to incorporate the socket feature
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
