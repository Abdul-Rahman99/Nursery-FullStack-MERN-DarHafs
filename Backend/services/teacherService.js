const factory = require("./handlersFactory");
const Teacher = require("../models/teacherModel");

// @desc    Get list of Teachers
// @route   GET /api/v1/Teachers
// @access  admin
exports.getTeachers = factory.getAll(Teacher);

// @desc    Get specific Teacher by id
// @route   GET /api/v1/Teachers/:id
// @access  admin
exports.getTeacher = factory.getOne(Teacher);

// @desc    Create Teacher
// @route   POST  /api/v1/Teachers
// @access  Private
exports.createTeacher = factory.createOne(Teacher);

// @desc    Update specific Teacher
// @route   PUT /api/v1/Teachers/:id
// @access  Private
exports.updateTeacher = factory.updateOne(Teacher);

// @desc    Delete specific Teacher
// @route   DELETE /api/v1/Teachers/:id
// @access  Private
exports.deleteTeacher = factory.deleteOne(Teacher);
