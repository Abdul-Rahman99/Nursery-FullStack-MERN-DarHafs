const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const factory = require("./handlersFactory");
const Student = require("../models/studentModel");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.uploadStudentImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `student-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/students/${filename}`);
  }

  // save image into DB
  req.body.image = filename;

  next();
});

// @desc    Get list of Students
// @route   GET /api/v1/Students
// @access  admin
exports.getStudents = factory.getAll(Student);

// @desc    Get specific student by id
// @route   GET /api/v1/Students/:id
// @access  admin
exports.getStudent = factory.getOne(Student);

// @desc    Create Student
// @route   POST  /api/v1/Students
// @access  Private
exports.createStudent = factory.createOne(Student);

// @desc    Update specific Student
// @route   PUT /api/v1/Students/:id
// @access  Private
exports.updateStudent = factory.updateOne(Student);

// @desc    Delete specific Student
// @route   DELETE /api/v1/Students/:id
// @access  Private
exports.deleteStudent = factory.deleteOne(Student);
