const model = require("./../../model/lembur.model");
const api = require("../../tools/common");

const addReport = async (req, res) => {
  const newReport = req.body;
  try {
    let data = await model.insert(newReport);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const updateReport = async (req, res) => {
  const { id } = req.params;
  const newReport = req.body;
  try {
    let data = await model.update(id, newReport);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const getAllReport = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};
const getByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getByUser(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  addReport,
  updateReport,
  getAllReport,
  getByUserId,
};
