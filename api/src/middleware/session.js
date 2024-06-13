const { verifyToken } = require("../utils/handleJsonWebToken");
const { User } = require("../db");

const authMiddleware = async (req, res, next) => {
  try {
    // Verifica si el encabezado de autorización está presente
    if (!req.headers.authorization) {
      console.log("No authorization header found");
      return res.status(401).send("NOT_TOKEN");
    }

    // Registra el encabezado de autorización completo
    console.log("Authorization header:", req.headers.authorization);

    const token = req.headers.authorization.split(" ").pop();

    // Registra el token extraído
    console.log("Extracted token:", token);

    const dataToken = await verifyToken(token);

    // Verifica si el token es válido
    if (!dataToken) {
      console.log("Invalid token payload");
      return res.status(401).send("NOT_PAYLOAD_DATA");
    }

    // Registra los datos del token
    console.log("Token payload:", dataToken);

    const user = await User.findOne({ where: { id: dataToken.id } });
    if (!user) {
      console.log("User not found");
      return res.status(401).send("USER_NOT_FOUND");
    }

    // Registra el usuario encontrado
    console.log("Authenticated user:", user);

    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error:", error.message);
    res.status(401).send({ error: error.message });
  }
};

module.exports = authMiddleware;
