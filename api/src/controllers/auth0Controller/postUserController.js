const { User } = require("../../db");
const { tokenSign } = require("../../utils/handleJsonWebToken");

const postUserController = async (name, email, type, status) => {
  let newUser = {};
  if (
    email === "silviojuarez60@gmail.com" ||
    email === "cnmonsalvo@gmail.com"
  ) {
    type = "Admin";
  }

  if (type === "guest") {
    newUser = await User.create({ name, email, type, status });
  } else {
    const userByEmail = await User.findAll({
      where: { email: email },
    });
    if (!userByEmail.length) {
      newUser = await User.create({ name, email, type, status });
    }
  }
  const token = await tokenSign(newUser);
  return { token, user: newUser };
};

module.exports = postUserController;
