const db = require("./../database/project.config");

const insert = async (data) => await db("report_lembur").insert(data);

const update = async (id, data) =>
  await db("report_lembur").where("lembur_id", id).update(data);

const getAll = async () =>
  await db
    .select(
      "r.lembur_id",
      "r.client_name",
      "r.duration",
      "u.username",
      "u.role_id",
      "u.foto_profil",
      "a.approval_desc"
    )
    .from("report_lembur as r")
    .join("users as u", "u.user_id", "r.user_id")
    .leftJoin("approval as a", "a.approval_id", "r.approval_id")
    .where("r.is_deleted", 0);
const getByUser = async (id) =>
  await db
    .select(
      "r.lembur_id",
      "r.client_name",
      "r.duration",
      "u.username",
      "u.role_id",
      "u.foto_profil",
      "a.approval_desc"
    )
    .from("report_lembur as r")
    .join("users as u", "u.user_id", "r.user_id")
    .leftJoin("approval as a", "a.approval_id", "r.approval_id")
    .where("r.user_id", id);

module.exports = {
  insert,
  update,
  getAll,
  getByUser,
};
