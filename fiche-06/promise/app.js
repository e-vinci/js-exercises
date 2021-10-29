var express = require("express");
var logger = require("morgan");

var pizzaRouter = require("./routes/pizzas");
var authsRouter = require("./routes/auths");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pizzas", pizzaRouter);
app.use("/auths", authsRouter);

module.exports = app;
