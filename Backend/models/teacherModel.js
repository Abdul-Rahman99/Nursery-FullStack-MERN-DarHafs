const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "إسم المعلم مطلوب"],
      minlength: [3, "أقل من اللازم"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "العمر مطلوب"],
    },
    nationalId: {
      unique: true,
      type: String,
      minlength: [14, "الرقم القومي اقل من 14 رقم"],
      maxlength: [14, "الرقم القومي اكثر من 14 رقم"],
    },
    address: {
      type: String,
      required: [true, "عنوان  مطلوب"],
      minlength: [3, "أقل من اللازم"],
      maxlength: [150, "أكثر من اللازم"],
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married"],
      required: [true, "الحالة الاجتماعية مطلوبة"],
    },
    numberOfKids: Number,
    qualification: String,
    specialization: String,
    exactSpecialization: String,
    graduationYear: Number,

    previousExperience: String,
    kidsExperience: String,

    phone: {
      unique: true,
      type: String,
      required: true,
    },
    homePhone: {
      unique: true,
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    readingTest: String,
    handWritingTest: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
