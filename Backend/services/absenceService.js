const asyncHandler = require("express-async-handler");

const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

const StudentAbsence = require("../models/absenceModel");
const TeacherAbsence = require("../models/absenceModel");

const ApiError = require("../utils/apiError");

exports.createStudentAbsence = asyncHandler(async (req, res, next) => {
  // 1- Storing student data and chicking if exists
  const { id } = req.params;
  const student = await Student.findOne(id);
  if (!student) {
    return next(new ApiError(`لا يوجد مستند بهذا الرقم ${id}`, 404));
  }
  res.status(200).json({ status: "Success" });

  // 2- Create an absence record for the student
  const newStudentAbsence = new StudentAbsence({
    student: student._id,
    date: new Date(),
    isAbsent: true,
  });

  // - Save the absence record to the db
  try {
    await newStudentAbsence.save();
    res.status(200).json({ status: "تم تسجيل الغياب" });
  } catch (err) {
    res
      .status(400)
      .json({ status: `لم يتم تسجيل الغياب حاول مرة اخري ${err.message}` });
  }
});


exports.createTeacherAbsence = asyncHandler(async (req, res, next) => {
  // 1- Storing teacher data and chicking if exists
  const { id } = req.params;
  const teacher = await Teacher.findOne(id);
  if (!teacher) {
    return next(new ApiError(`لا يوجد مستند بهذا الرقم ${id}`, 404));
  }
  res.status(200).json({ status: "Success" });

  // 2- Create an absence record for the teacher
  const newTeacherAbsence = new TeacherAbsence({
    teacher: teacher._id,
    date: new Date(),
    isAbsent: true,
  });

  // - Save the absence record to the db
  try {
    await newTeacherAbsence.save();
    res.status(200).json({ status: "تم تسجيل الغياب" });
  } catch (err) {
    res
      .status(400)
      .json({ status: `لم يتم تسجيل الغياب حاول مرة اخري ${err.message}` });
  }
});

// // Function to create an absence record for a student by their unique identifier
// async function createAbsenceForStudent(studentIdentifier) {
//   try {
//     // Create an absence record for the student

//     // Save the absence record

//     console.log("Absence record created:", absence);
//   } catch (error) {
//     console.error("Error creating absence record:", error);
//   }
// }

// // Example usage:
// createAbsenceForStudent("UniqueStudentIdentifier"); // Replace with the actual identifier you're using
