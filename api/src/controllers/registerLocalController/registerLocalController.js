const { User } = require("../../db");
const { tokenSign } = require("../../utils/handleJsonWebToken");
const { encrypt } = require("../../utils/handlePassword");

const adminEmails = ["silviojuarez60@gmail.com", "cnmonsalvo@gmail.com"];
const MAX_USERS = 100;

const registerLocalController = async (
  name,
  surname,
  email,
  status,
  plainPassword
) => {
  let type = "Client";

  if (adminEmails.includes(email)) {
    type = "Admin";
  }

  // Contar el número actual de usuarios
  const userCount = await User.count();
  if (userCount >= MAX_USERS) {
    throw new Error("Se ha alcanzado el límite máximo de usuarios.");
  }

  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const encryptedPassword = await encrypt(plainPassword);

  const newUser = await User.create({
    name,
    surname,
    email,
    type,
    status,
    password: encryptedPassword,
  });
  newUser.set("password", undefined, { strict: false });

  const data = {
    token: await tokenSign(newUser),
    user: newUser,
  };

  return data;
};

module.exports = registerLocalController;
