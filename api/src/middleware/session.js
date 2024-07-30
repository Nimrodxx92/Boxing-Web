const { verifyToken } = require("../utils/handleJsonWebToken");
const { User } = require("../db");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("NOT_TOKEN");
    }

    const token = req.headers.authorization.split(" ").pop();

    const dataToken = await verifyToken(token);

    if (!dataToken) {
      return res.status(401).send("NOT_PAYLOAD_DATA");
    }

    const user = await User.findOne({ where: { id: dataToken.id } });
    if (!user) {
      return res.status(401).send("USER_NOT_FOUND");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = authMiddleware;
