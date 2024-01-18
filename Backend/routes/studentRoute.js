const express = require("express");
const {
  getStudentValidator,
  createStudentValidator,
  deleteStudentValidator,
  updateStudentValidator,
} = require("../utils/validators/studentValidator");

const {
  getStudent,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../services/studentService");
const upload = require("../middlewares/uploadImageMiddleware");
const studentModel = require("../models/studentModel");

const router = express.Router();

router.route("/").get(getStudents);
router
  .route("/create")
  .post(upload.single("photo"), createStudent(studentModel));
router
  .route("/:id")
  .get(getStudentValidator, getStudent)
  .put(upload.single("photo"), updateStudentValidator, updateStudent)
  .delete(deleteStudentValidator, deleteStudent);

module.exports = router;
