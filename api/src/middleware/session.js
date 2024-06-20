const { verifyToken } = require("../utils/handleJsonWebToken");
const { User } = require("../db");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.log("No authorization header found");
      return res.status(401).send("NOT_TOKEN");
    }

    const token = req.headers.authorization.split(" ").pop();

    const dataToken = await verifyToken(token);

    if (!dataToken) {
      console.log("Invalid token payload");
      return res.status(401).send("NOT_PAYLOAD_DATA");
    }

    const user = await User.findOne({ where: { id: dataToken.id } });
    if (!user) {
      console.log("User not found");
      return res.status(401).send("USER_NOT_FOUND");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error:", error.message);
    res.status(401).send({ error: error.message });
  }
};

module.exports = authMiddleware;
