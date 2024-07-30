const postUserController = require("../controllers/auth0Controller/postUserController.js");

const postUserHandler = async (req, res) => {
  const { name, email, type, status } = req.body;
  try {
    const newUser = await postUserController(name, email, type, status);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
    throw error  }
};

module.exports = { postUserHandler };
