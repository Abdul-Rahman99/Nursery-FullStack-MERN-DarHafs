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
  uploadStudentImage,
  resizeImage,
} = require("../services/studentService");

const router = express.Router();

router.route("/").get(getStudents);
router
  .route("/create")
  .post(uploadStudentImage, resizeImage, createStudent);
router
  .route("/:id")
  .get(getStudentValidator, getStudent)
  .put(uploadStudentImage, resizeImage, updateStudentValidator, updateStudent)
  .delete(deleteStudentValidator, deleteStudent);

module.exports = router;
