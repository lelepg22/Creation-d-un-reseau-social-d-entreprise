const express = require('express');
const env = require('dotenv').config();
const xss = require('xss-clean');
const helmet = require('helmet');
var mysql = require('mysql');

const auth = require('./routes/auth');
const posts = require('./routes/posts');



var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'gaglianone_projet7'
}

var con = mysql.createConnection(options);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();

app.use(express.json());
app.use(xss())
app.use(helmet())
app.use('/api/auth', auth);
app.use('/api',posts);

app.listen(3000, () =>{
  console.log("Ecoute sur le port 3000")
})