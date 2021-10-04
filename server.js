const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");

const bodyParser = require("body-parser");

const dotenv = require("dotenv");

const { connectToDB } = require("./databaseConnection");

const http = require("http");
const ablySocket = require("./sockets");

// const ably = new require('ably').Realtime(process.env.ABLY_TOKEN);

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/User");

app.use("/api", user);

app.use(express.static(path.join(__dirname, "public")));

app.get("/demo", (req, res) => {
  let message = "Hello this is demo app for deployment";
  res.json(message);
});

// app.get("/chat",(req,res)=>{
//     res.render("chat_join");
// })

// app.get("/home",(req,res)=>{
//     res.render("chat_home");
// })

// connectToDB()

const server = http.createServer(app);

server.listen(4000, () => {
  console.log("server is listening in port 4000");
});

ablySocket(server);
