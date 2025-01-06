  // Modules used 
  import express from "express";
  import bodyParser from "body-parser";
  import pg from "pg";
  import bcrypt from "bcryptjs";
  const { hash } = bcrypt;  
  import path from "path";
  import { fileURLToPath } from "url";
  import env from "dotenv";
  import session from "express-session";
  import passport from "passport";
  import { Strategy } from "passport-local";
  import fs from "fs";

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
  const port = process.env.SERVER_PORT || 5000;
  const saltrounds = parseInt(process.env.SALT_ROUND,10);

  // creating server for socket.io
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000", // Replace with your Render client URL
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
  });
  

  let users = {};
  let sockets = {};

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



app.use((req, res, next) => {
  req.headers["socket-id"] = req.get("Socket-ID");
  next();
});



// Connecting to database
// const db = new pg.Client({
//   user: process.env.DATABASE_USER,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_DB,
//   password: process.env.DATABASE_PASS,
//   port: process.env.DATABASE_PORT,
// });

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL, // Contains all connection details
  ssl: {
    rejectUnauthorized: true, // Required for secure connection on Render
  },
});


db.connect();



// Creating Tables

async function createTables() {
  const schemaPath = path.join(__dirname, "schema.sql"); // Save the SQL script above in a file named 'schema.sql'
  const schema = fs.readFileSync(schemaPath, "utf-8");

  try {
    await db.query(schema);
    console.log("Database tables created successfully!");
  } catch (error) {
    console.error("Error creating database tables:", error);
  }
}

createTables();

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


app.post('/event/event_name', async(req,res)=>{
  try{
    const response = await db.query("SELECT event_name FROM events");
    const names = response.rows;
    console.log(names);
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
  console.log(req.body);
  console.log(req.user);
  if (!req.isAuthenticated()){
    return res.status(500).json({ success: false, message: "Technical error" });
  }
  else{
    try{
      //Selecting username of user 
      const data = await db.query("SELECT username FROM users WHERE username = $1",[req.user.username]);


      if (data.rows.length >=1 ){
        console.log(`data :`,data.rows[0].username);

        // Selecting Name of User

        const name_of_user = await db.query("SELECT full_name FROM details WHERE username = $1",[req.user.username]);

        if (name_of_user.rows.length > 0){
          const name = name_of_user.rows[0].full_name;
          
          // rechecking Existence of user

          if (data.rows[0].username === req.user.username){
            await db.query("INSERT INTO tickets (username, ticket_type, selling_price, face_value, transferability, ticket_format, quantity, seller_name) VALUES ($1, $2,$3,$4,$5,$6,$7,$8)",[req.user.username, req.body.ticket_type, req.body.selling_price, req.body.face_value, req.body.transferability, req.body.ticket_format, req.body.quantity,name]);
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
})

app.post('/eventdetails', async (req, res) => {
  const id  = req.body.id;
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
