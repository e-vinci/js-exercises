var express = require("express");
var router = express.Router();
const { Users } = require("../models/users");
const userModel = new Users();

//const { authorize } = require("../utils/auths");

/* Register a user : POST /auths/register */
router.post("/register", async function (req, res, next) {
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.username && req.body.username.length === 0) ||
    (req.body.password && req.body.password.length === 0)
  )
    return res.status(400).end();

  const authenticatedUser = await userModel.register(
    req.body.username,
    req.body.password
  );
  // Error code '409 Conflict' if the username already exists
  if (!authenticatedUser) return res.status(409).end();

  return res.json(authenticatedUser);
});

/* login a user : POST /auths/login */
router.post("/login", async function (req, res, next) {
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.username && req.body.username.length === 0) ||
    (req.body.password && req.body.password.length === 0)
  )
    return res.status(400).end();

  const authenticatedUser = await userModel.login(
    req.body.username,
    req.body.password
  );
  // Error code '401 Unauthorized' if the user could not be authenticated
  if (!authenticatedUser) return res.status(401).end();

  return res.json(authenticatedUser);
});

module.exports = router;
