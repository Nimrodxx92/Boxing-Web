const { Router } = require("express");
const { postUserHandler } = require("../handlers/userHandlers");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

const auth0Router = Router();

auth0Router.post("/", authMiddleware, checkRol(["Client"]), postUserHandler);

module.exports = auth0Router;
