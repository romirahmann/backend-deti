const model = require("./../../model/users.model");
const api = require("../../tools/common");
const bcrypt = require("bcrypt");

// USERS
const register = async (req, res) => {
  const new_user = req.body;
  // console.log(new_user);
  if (new_user && new_user.password && typeof new_user.password === "string") {
    try {
      const hashedPassword = await bcrypt.hash(new_user.password, 10);
      new_user.password = hashedPassword;
      console.log(new_user);
      let data = await model.insert(new_user);
      return api.ok(res, data);
    } catch {
      return api.error(res, "Internal Server Error", 500);
    }
  } else {
    return api.error(res, "Password Invalid", 500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getById(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    let data = await model.update(id, newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

// ROLE
const getAllRoleUser = async (req, res) => {
  try {
    let data = await model.getAllRole();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  register,
  getAllUsers,
  getUserById,
  updateUser,
  getAllRoleUser,
};
