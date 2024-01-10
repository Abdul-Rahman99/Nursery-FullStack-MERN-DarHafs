const mongoose = require("mongoose");

const studentAbsenceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isAbsent: {
    type: Boolean,
    default: false,
  },
});

const teacherAbsenceSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isAbsent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("StudentAbsence", studentAbsenceSchema);
module.exports = mongoose.model("TeacherAbsence", teacherAbsenceSchema);
