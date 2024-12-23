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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
env.config();

// Declaring Const 
const app = express();
const port = process.env.SERVER_PORT;
const saltrounds = parseInt(process.env.SALT_ROUND,10);

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



app.get('/verify', (req,res)=>{
  if (req.isAuthenticated()){
    res.json({success:true});
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


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
