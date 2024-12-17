// Modules used 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";


// Declaring Const 
const app = express();
const port = 5000;
const saltrounds = 10;

// Connecting to database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: 'users',
  password: 'mydatabase',
  port: 5432,
});

db.connect();

// Using Middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



// Normal get request

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});


// Sending Post request

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password,saltrounds, async (err,hash)=> {
    if (err){
        console.log(err);
    }
    else{
        try {
            const check_user = await db.query("SELECT * FROM users WHERE emaill = ($1)",[email]);
            if (check_user.rows.length >=1){
              res.send("User Already exist Try Logging in !");
            }
            else{
              try{
                await db.query("INSERT INTO users (emaill, password) VALUES ($1, $2)",[email,hash]);
                res.render("secrets.ejs");
              }
              catch (err){
                console.log(err)
              }
            }
          }catch (err){
            console.log(err);
          }
    }
  })
  
  
  
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const check_user = await db.query("SELECT password FROM users WHERE emaill = ($1)",[email]);
    if (check_user.rows.length == 0){
        res.send("Register Now! User does not exist");
    }else{
        console.log(check_user.rows[0].password);
        const hashh = check_user.rows[0].password;
        bcrypt.compare(password,hashh, (err,result) =>{
            if (result){
                res.render("secrets.ejs");
            }
            else{
                res.send("Incorrect Password");
            }
        })
        }
    }
    catch(err){
        console.log(err);
    }
    
  
});


app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
