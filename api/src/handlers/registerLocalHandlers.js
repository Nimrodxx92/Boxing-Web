const registerLocalController = require("../controllers/registerLocalController/registerLocalController");

const registerLocalHandler = async (req, res) => {
  const { name, surname, email, status, password: plainPassword } = req.body;
  try {
    const data = await registerLocalController(
      name,
      surname,
      email,
      status,
      plainPassword
    );
    res.status(201).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = registerLocalHandler;
