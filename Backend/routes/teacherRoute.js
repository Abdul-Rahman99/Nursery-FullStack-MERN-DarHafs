const express = require("express");
const {
  getTeacherValidator,
  createTeacherValidator,
  updateTeacherValidator,
  deleteTeacherValidator,
} = require("../utils/validators/teacherValidator");

const {
  getTeacher,
  getTeachers,
  createTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../services/teacherService");

const router = express.Router();

router.route("/").get(getTeachers);
router.route("/create").post(createTeacherValidator, createTeacher);
router
  .route("/:id")
  .get(getTeacherValidator, getTeacher)
  .put(updateTeacherValidator, updateTeacher)
  .delete(deleteTeacherValidator, deleteTeacher);

module.exports = router;
