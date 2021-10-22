var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var filmsRouter = require("./routes/films");
var authsRouter = require("./routes/auths");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/films", filmsRouter);
app.use("/auths", authsRouter);
app.use("/users", usersRouter);

module.exports = app;
