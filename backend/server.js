import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: 'users',
  password: 'mydatabase',
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const check_user = await db.query("SELECT * FROM users WHERE emaill = ($1)",[email]);
    if (check_user.rows.length >=1){
      res.send("User Already exist Try Logging in !");
    }
    else{
      try{
        await db.query("INSERT INTO users (emaill, password) VALUES ($1, $2)",[email,password]);
        res.render("secrets.ejs");
      }
      catch (err){
        console.log(err)
      }
    }
  }catch (err){
    console.log(err);
  }
  
  
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const check_user = await db.query("SELECT * FROM users WHERE emaill = ($1)",[email]);
  if (check_user.rows.length == 0){
    res.send("Register Now! User does not exist");
  }
  try{
    const info =await db.query("SELECT id FROM users WHERE emaill = ($1) and password = ($2)",[email,password]);
    console.log(info.rows[0].id);
    res.render("secrets.ejs");
  }
  catch (err){
    console.log(err);
    res.send("Incorrect username or Password!!")
  }
});

const port = 5000;
app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
