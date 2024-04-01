const db = require("./../database/project.config");

const insert = async (data) => await db("absensi").insert(data);

const update = async (id, data) =>
  await db("absensi").where("absensi_id", id).update(data);

const getAll = async () =>
  await db
    .select("a.absensi_id", "a.user_id", "a.date", "a.kehadiran", "u.username")
    .from("absensi as a")
    .join("users as u", "u.user_id", "a.user_id")
    .where("a.is_deleted", 0);

const getByUser = async (id) =>
  await db
    .select("a.absensi_id", "a.user_id", "a.date", "a.kehadiran", "u.username")
    .from("absensi as a")
    .join("users as u", "u.user_id", "a.user_id")
    .where("a.is_deleted", 0)
    .andWhere("a.user_id", id);
const getTotalAbsen = async (userId) =>
  await db("absensi")
    .count("absensi_id as total_absensi")
    .where("user_id", userId);

module.exports = {
  insert,
  update,
  getAll,
  getByUser,
  getTotalAbsen,
};
