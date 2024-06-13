const postUserController = require("../controllers/auth0Controller/postUserController.js");

const postUserHandler = async (req, res) => {
  const { name, email, type, status } = req.body;
  console.log(req.body);
  try {
    const newUser = await postUserController(name, email, type, status);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
    console.log(error);
  }
};

module.exports = { postUserHandler };
