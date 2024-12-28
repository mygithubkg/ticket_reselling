// Modules used 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

// For Socket.io importing create server to upgrade
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// to find directory of file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();

// Declaring Const 
const app = express();
const port = process.env.SERVER_PORT;
const saltrounds = parseInt(process.env.SALT_ROUND,10);

// creating server for socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // Replace with your client URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

let users = {};
let sockets = {};
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("join", (username)=> {
    users[username] = socket.id;
    sockets[socket.id] = username;
    console.log(`User ${username} joined with socket ID: ${socket.id}`);
  })

  // Listen for a message from client
  socket.on('send_message', (data) => {
    const { recipient, message } = data;
    console.log('Data received:', data);

    const recipientSocketId = users[recipient];
    const senderUsername = sockets[socket.id]; // Retrieve sender's username
    if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive_message', {
            sender: senderUsername, // You can use username if available
            recipient,
            message,
        });
    } else {
        console.log(`User ${recipient} is not connected`);
    }
  }); 

  socket.on('disconnect', () => {
    for (const [username, id] of Object.entries(users)) {
        if (id === socket.id) {
            delete users[username];
            console.log(`User ${username} disconnected`);
            break;
        }
    }
  });

});


// Connecting to database
const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});

db.connect();

// Using Middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// For maintaing user signed throughout the session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV ==='production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

app.use(passport.initialize());
app.use(passport.session());


// To verify if user is Loggedin

app.get('/verify', (req,res)=>{
  if (req.isAuthenticated()){
    res.json({success:true, username: req.user.username});
  }else{
    res.json({success:false})
  }
})


// Normal get request


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
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
                req.login(user, (err)=> {
                  console.log(err);
                  res.status(200).json({success: true, message: `Registration Success`});
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


app.post('/listing1', async (req,res)=>{
  console.log(req.body);
  if (!req.isAuthenticated()){
    return res.status(500).json({ success: false, message: "Technical error" });
  }
  else{
    try{
      const data = await db.query("SELECT username FROM users WHERE username = $1",[req.user.username]);
      if (data.rows.length >=1 ){
        console.log(`data :`,data.rows[0].username);
        console.log(req.user.username)
        if (data.rows[0].username === req.user.username){
          await db.query("INSERT INTO events (username, event_type, event_date, event_time, event_name, event_location, event_bio) VALUES ($1, $2,$3,$4,$5,$6,$7)",[req.user.username, req.body.event_type, req.body.event_date, req.body.event_time, req.body.event_name, req.body.event_location, req.body.event_bio]);
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

app.post('/listing2', async (req,res)=>{
  console.log(req.body);
  if (!req.isAuthenticated()){
    return res.status(500).json({ success: false, message: "Technical error" });
  }
  else{
    try{
      const data = await db.query("SELECT username FROM users WHERE username = $1",[req.user.username]);
      if (data.rows.length >=1 ){
        console.log(`data :`,data.rows[0].username);
        console.log(req.user.username)
        if (data.rows[0].username === req.user.username){
          await db.query("INSERT INTO tickets (username, ticket_type, selling_price, face_value, transferability, ticket_format, quantity) VALUES ($1, $2,$3,$4,$5,$6,$7)",[req.user.username, req.body.ticket_type, req.body.selling_price, req.body.face_value, req.body.transferability, req.body.ticket_format, req.body.quantity]);
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














// Sending Post request

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) {
       return next(err); 
      }
    res.json({success:true});
  });
});


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
      return res.status(200).json({ success: true, message: "Login successful" });
    });
  })(req, res, next);
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
  console.log(req.body);
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
  if (!req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
  }
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
});






passport.use(new Strategy(
  async function verification(username,password,cb){
    // console.log(username);
    // console.log(password);
    try {
      const check_user = await db.query("SELECT password FROM users WHERE username = ($1)",[username]);
      if (check_user.rows.length == 0){
          return cb(null,false,{message:"User does not Exist! Register now"})
          // res.status(500).json({success:false, message:"User does not Exist! Register now"});
      }else{
          // console.log(check_user.rows[0].password);
          const hashh = check_user.rows[0].password;
          bcrypt.compare(password,hashh, (err,result) =>{
            if (err){
              return cb(err);
            }
            if (result){
              return cb(null, { username });
            }else{
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
