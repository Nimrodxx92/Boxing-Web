const { User } = require("../../db");

const deleteUserController = async (userId) => {
  try {
    await User.destroy({ where: { id: userId } });
    return { message: "Usuario eliminado exitosamente" };
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
};

module.exports = deleteUserController;
