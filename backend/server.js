import express from "express";

const app = express();
const port = 5000;


app.get("/",(req,res) => {
    console.log("Home Page");
    res.render("../public/index.html")
})

app.listen(port,() => {
    console.log(`Listening on Port ${port}`);
});