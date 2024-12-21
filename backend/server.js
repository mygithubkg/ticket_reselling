// Modules used 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";

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

// Normal get request

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

app.post("/register", (req, res)=> {
  const email = req.body.username;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  bcrypt.hash(password,saltrounds, async (err,hash)=> {
    console.log(hash);
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
                await db.query("INSERT INTO users (username, password) VALUES ($1, $2)",[email,hash]);
                res.status(200).json({success: true, message: `Registration Success`});
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


app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const check_user = await db.query("SELECT password FROM users WHERE username = ($1)",[email]);
    if (check_user.rows.length == 0){
        res.status(500).json({success:false, message:"User does not Exist! Register now"});
    }else{
        console.log(check_user.rows[0].password);
        const hashh = check_user.rows[0].password;
        bcrypt.compare(password,hashh, (err,result) =>{
            if (result){
                res.status(200).json({success:true, message:"User Signned In"});
            }
            else{
                res.status(200).json({success:false, message:"Incorrect Password"});
            }
        })
        }
    }
    catch(err){
        res.status(500).json({success:false, message:"Technical Error"});
    }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
