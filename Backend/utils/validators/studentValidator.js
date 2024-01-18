const slugify = require("slugify");
const { check, body } = require("express-validator");

const Student = require("../../models/studentModel");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getStudentValidator = [
  check("id").isMongoId().withMessage("Invalid Student id format"),
  validatorMiddleware,
];

exports.createStudentValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name required")
    .isLength({ min: 3 })
    .withMessage("Too short Student name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("dateOfBirth").notEmpty().withMessage("Add date of birth"),
  check("fahterPhone")
    .notEmpty()
    .withMessage("Father Phone Required")
    .isLength({ min: 12 })
    .withMessage("Number should be 11 charcters started with (0)")
    .isLength({ max: 12 })
    .withMessage("Number should be 11 charcters started with (0)"),
  check("address")
    .notEmpty()
    .withMessage("Address required")
    .isLength({ min: 3 })
    .withMessage("Too short Address")
    .isLength({ max: 150 })
    .withMessage("Too long Address"),
  check("image").notEmpty().withMessage("image is required"),
  check("studentNationalId")
    .notEmpty()
    .withMessage("National Id is required")
    .isLength({ min: 14 })
    .withMessage("National ID must be 14 number")
    .isLength({ max: 14 })
    .withMessage("National ID must be 14 number"),
  body().custom(async (value, { req }) => {
    const { name, age, fatherName, fatherNationalId } = req.body;
    // Check if a student with similar details exists
    const existingStudent = await Student.findOne({
      name,
      age,
      fatherName,
      fatherNationalId,
    });

    if (existingStudent) {
      throw new Error("Student with similar details already exists");
    }
    return true; // Validation passed
  }),
  validatorMiddleware,
];

exports.updateStudentValidator = [
  check("id").isMongoId().withMessage("Invalid Student id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteStudentValidator = [
  check("id").isMongoId().withMessage("Invalid Student id format"),
  validatorMiddleware,
];
