const factory = require("./handlersFactory");
const Student = require("../models/studentModel");

const asyncHandler = require("express-async-handler");
const fs = require("fs").promises;

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
exports.createStudent = (Model) =>
  asyncHandler(async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const { name, address, dateOfBirth, ...otherFields } = req.body;

    try {
      // Read the image file as a buffer
      const imageBuffer = await fs.readFile(req.file.path);

      // Create a new student with image buffer
      const newDocument = await Model.create({
        name,
        address,
        dateOfBirth,
        // // 1
        photo: {
          data: imageBuffer,
          contentType: req.file.mimetype,
        },
        ...otherFields,
      });

      // Delete the temporary file after processing
      await fs.unlink(req.file.path);

      res.status(201).json({ data: newDocument });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// @desc    Update specific Student
// @route   PUT /api/v1/Students/:id
// @access  Private
exports.updateStudent = factory.updateOne(Student);

// @desc    Delete specific Student
// @route   DELETE /api/v1/Students/:id
// @access  Private
exports.deleteStudent = factory.deleteOne(Student);
