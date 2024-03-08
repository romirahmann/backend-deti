const db = require("./../database/project.config");

const getAll = async () =>
  await db
    .select(
      "u.user_id",
      "u.username",
      "u.password",
      "u.role_id",
      "u.foto_profil",
      "ur.role_name",
      "ur.role_description"
    )
    .from("users as u")
    .join("user_role as ur", "ur.role_id", "u.role_id");

const getById = async (id) =>
  await db
    .select(
      "u.user_id",
      "u.username",
      "u.password",
      "u.role_id",
      "u.foto_profil",
      "ur.role_name",
      "ur.role_description"
    )
    .from("users as u")
    .join("user_role as ur", "ur.role_id", "u.role_id")
    .where("u.user_id", id);

const insert = async (data) => await db("users").insert(data);

const update = async (id, data) =>
  await db("users").where("user_id", id).update(data);

const getAllRole = async () => await db.select("*").from("user_role");

module.exports = {
  getAll,
  getById,
  insert,
  update,
  getAllRole,
};
