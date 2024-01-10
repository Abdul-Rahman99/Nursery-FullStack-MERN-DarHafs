const slugify = require("slugify");
const { check, body } = require("express-validator");

const Teacher = require("../../models/teacherModel");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getTeacherValidator = [
  check("id").isMongoId().withMessage("Invalid Teacher id format"),
  validatorMiddleware,
];

exports.createTeacherValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name required")
    .isLength({ min: 3 })
    .withMessage("Too short Teacher name")
    .isLength({ max: 32 })
    .withMessage("Too long Teacher name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("age").notEmpty().withMessage("Add age"),
  check("address")
    .notEmpty()
    .withMessage("Address required")
    .isLength({ min: 3 })
    .withMessage("Too short Teacher name")
    .isLength({ max: 150 })
    .withMessage("Too long Teacher name"),
  check("nationalId").notEmpty().withMessage("National Id is required"),
  body().custom(async (value, { req }) => {
    const { name, age, nationalId } = req.body;
    // Check if a teacher with similar details exists
    const existingTeacher = await Teacher.findOne({
      name,
      age,
      nationalId,
    
    });

    if (existingTeacher) {
      throw new Error("Teacher with similar details already exists");
    }
    return true; // Validation passed
  }),
  validatorMiddleware,
];

exports.updateTeacherValidator = [
  check("id").isMongoId().withMessage("Invalid Teacher id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteTeacherValidator = [
  check("id").isMongoId().withMessage("Invalid Teacher id format"),
  validatorMiddleware,
];
