var express = require("express");
var router = express.Router();

const UserController = require("./../../controller/master_controller/UsersController");
const ReportController = require("./../../controller/master_controller/LemburController");
const AbsensiController = require("./../../controller/master_controller/AbsensiController");

// USERS
router.get("/users", UserController.getAllUsers);
router.get("/user/:id", UserController.getUserById);
router.post("/user", UserController.register);
router.put("/user/:id", UserController.updateUser);

// ROLE
router.get("/user-role", UserController.getAllRoleUser);

//REPORT
router.get("/reports", ReportController.getAllReport);
router.get("/reportByUserId/:id", ReportController.getByUserId);
router.post("/report", ReportController.addReport);
router.put("/report/:id", ReportController.updateReport);
router.get("/akumulasi-report/:id/:month/:year", ReportController.getAkumulasi);
router.get("/total-reports/:id", ReportController.getTotalLaporanLembur);

// ABSENSI
router.get("/absensis", AbsensiController.getAllAbsensi);
router.get("/absensi-by-user/:id", AbsensiController.getAbsensiByUser);
router.post("/absensi", AbsensiController.addAbsensi);
router.put("/absensi/:id", AbsensiController.updateAbsensi);
router.get("/total-absensi/:id", AbsensiController.getTotalAbsensi);

module.exports = router;
