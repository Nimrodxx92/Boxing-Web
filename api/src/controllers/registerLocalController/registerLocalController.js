const { User } = require("../../db");
const { tokenSign } = require("../../utils/handleJsonWebToken");
const { encrypt } = require("../../utils/handlePassword");

const adminEmails = ["silviojuarez60@gmail.com", "cnmonsalvo@gmail.com"];

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
  console.log("Nuevo usuario creado:", newUser);
  newUser.set("password", undefined, { srtrict: false });

  const data = {
    token: await tokenSign(newUser),
    user: newUser,
  };

  return data;
};

module.exports = registerLocalController;
