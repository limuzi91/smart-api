const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");
const register = require("../controllers/register");
const signin = require("../controllers/signin");
const profile = require("../controllers/profile");
const entries = require("../controllers/entries");

const db = knex({
  client: "pg",
  // connection: {
  //   host: "127.0.0.1",
  //   user: "muzili",
  //   password: "",
  //   database: "smart-brain"
  // }
  // connection: {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true
  // }
  connection: {
    connectionString:
      "postgres://jeztuzvacnggtk:7fbed0fbb2920e95e2e4db8629b5f76d923802565b7ca6a3436e54b4b68b145f@ec2-54-225-95-183.compute-1.amazonaws.com:5432/d7v50d055i9jqi",
    ssl: true //fix bug: Unhandled rejection Error: The server does not support SSL connections
  }
});

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Hello World!"));

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:userId", (req, res) => {
  profile.handleGetProfile(req, res, db);
});

app.put("/entries", (req, res) => {
  entries.handleUpdateUserEntries(req, res, db);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT} lol!`)
);
