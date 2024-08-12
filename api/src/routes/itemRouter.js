const { Router } = require("express");
const {
  postItemHandler,
  putItemHandler,
  deleteItemHandler,
} = require("../handlers/itemHandlers");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

const itemRouter = Router();

itemRouter.post("/", authMiddleware, checkRol(["Client"]), postItemHandler);
itemRouter.put("/", authMiddleware, checkRol(["Client"]), putItemHandler);
itemRouter.delete(
  "/:id",
  authMiddleware,
  checkRol(["Client"]),
  deleteItemHandler
);

module.exports = itemRouter;
