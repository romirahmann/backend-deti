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
      "r.user_id",
      "r.date",
      "r.file_bukti",
      "r.approval_id",
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
      "r.user_id",
      "r.date",
      "r.file_bukti",
      "r.approval_id",
      "u.username",
      "u.role_id",
      "u.foto_profil",
      "a.approval_desc"
    )
    .from("report_lembur as r")
    .join("users as u", "u.user_id", "r.user_id")
    .leftJoin("approval as a", "a.approval_id", "r.approval_id")
    .where("r.user_id", id)
    .andWhere("r.is_deleted", 0);

const getAkumulasiLembur = async (id, month, year) => {
  // Query untuk mendapatkan daftar report lembur sesuai dengan id, bulan, dan tahun yang ditentukan
  const daftarReport = await db
    .select(
      "lembur_id",
      "date",
      "client_name",
      "duration",
      "approval_id",
      "username"
    )
    .from("report_lembur")
    .leftJoin("users", "users.user_id", "report_lembur.user_id")
    .whereRaw("MONTH(date) = ?", [month])
    .whereRaw("YEAR(date) = ?", [year])
    .andWhere("report_lembur.user_id", id);

  // Query untuk menghitung total durasi lembur
  const akumulasiJamLembur = await db("report_lembur")
    .sum("duration as totalDuration")
    .whereRaw("MONTH(date) = ?", [month])
    .whereRaw("YEAR(date) = ?", [year])
    .andWhere("user_id", id);

  // Mengambil nilai total durasi dari hasil query
  const totalDuration = akumulasiJamLembur[0].totalDuration || 0;

  return {
    daftarReport,
    totalDuration,
  };
};

const getTotalLaporan = async (userId) =>
  await db("report_lembur")
    .count("lembur_id as total_laporan_lembur")
    .where("user_id", userId);

module.exports = {
  insert,
  update,
  getAll,
  getByUser,
  getAkumulasiLembur,
  getTotalLaporan,
};
