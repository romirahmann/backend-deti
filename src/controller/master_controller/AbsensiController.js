const model = require("./../../model/absensi.model");
const api = require("../../tools/common");

const addAbsensi = async (req, res) => {
  const newAbsensi = req.body;
  try {
    let data = await model.insert(newAbsensi);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const updateAbsensi = async (req, res) => {
  const { id } = req.params;
  const newAbsensi = req.body;
  try {
    let data = await model.update(id, newAbsensi);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const getAbsensiByUser = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getByUser(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const getAllAbsensi = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const getTotalAbsensi = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getTotalAbsen(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  addAbsensi,
  updateAbsensi,
  getAbsensiByUser,
  getAllAbsensi,
  getTotalAbsensi,
};
