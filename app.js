require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const validator2 = require("./validator2");
const { hashPassword } = require("./auth.js");

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);

app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", validator2.validateMovieExpress, movieHandlers.addMovie);

app.put("/api/movies/:id", validator2.validateMovieExpress, movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);


app.get("/api/users", userHandlers.getUsers);

app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users", validator2.validateUserExpress, hashPassword, userHandlers.addUser);

app.put("/api/users/:id", validator2.validateUserExpress, hashPassword, userHandlers.updateUser);

app.delete("/api/users/:id", userHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
