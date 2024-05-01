const registerLocalController = require("../controllers/registerLocalController/registerLocalController");

const registerLocalHandler = async (req, res) => {
  const { name, email, status, password: plainPassword } = req.body;
  console.log(req.body);
  try {
    const data = await registerLocalController(
      name,
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
