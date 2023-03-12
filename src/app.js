const express = require("express");

//Import des modules
const cors = require('cors');
const cookieParser = require("cookie-parser");

//Import des routes
const movieRoutes = require('./routes/movie.routes');
const bookRoutes = require('./routes/book.routes')
const userRoutes = require('./routes/user.routes');

/*
const userHandlers = require("../userHandlers");
const loginHandlers = require("./controllers/loginHandlers");
const validator2 = require("../validator2");
const { hashPassword, verifyPassword, verifyToken, verifyAccess } = require("./services/auth.js");
*/

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const welcome = (req, res) => {
  console.log('bla');
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

// API routes
app.use('/api/movies', movieRoutes);
app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes);

module.exports = app;