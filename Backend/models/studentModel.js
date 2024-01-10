const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // student Schema
    name: {
      type: String,
      required: [true, "إسم الطالب مطلوب"],
      minlength: [3, "أقل من اللازم"],
    },
    address: {
      type: String,
      required: [true, "العنوان مطلوب"],
      minlength: [3, "أقل من اللازم"],
      maxlength: [150, "أكثر من اللازم"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "العمر مطلوب"],
    },
    sex: {
      type: String,
      enum: ["male", "female"], // Assuming two options for gender
      required: [true, "الجنس مطلوب"],
    },
    studentNationalId: {
      required: true,
      type: String,
      minlength: [14, "الرقم القومي اقل من 14 رقم"],
      maxlength: [14, "الرقم القومي اكثر من 14 رقم"],
    },
    memorization: {
      type: String,
      required: [true, "الحفظ مطلوب"],
    },

    // father schema for the student
    fatherQualification: {
      type: String,
      minlength: [3, "أقل من اللازم"],
      maxlength: [32, "أكثر من اللازم"],
    },
    fatherJob: {
      type: String,
      minlength: [3, "أقل من اللازم"],
      maxlength: [32, "أكثر من اللازم"],
    },
    fatherPhone: {
      type: String,
      required: [true, "يرجي إدخال رقم الهاتف"],
    },

    // mother schema for the student
    motherName: {
      type: String,
      minlength: [3, "أقل من اللازم"],
      maxlength: [32, "أكثر من اللازم"],
    },
    motherQualification: {
      type: String,
      minlength: [3, "أقل من اللازم"],
      maxlength: [32, "أكثر من اللازم"],
    },
    motherJob: {
      type: String,
      minlength: [3, "أقل من اللازم"],
      maxlength: [32, "أكثر من اللازم"],
    },
    motherPhone: {
      type: String,
      required: [true, "يرجى إدخال رقم الهاتف للأم"],
    },
    studentDeliveryToHome: {
      type: String,
      enum: ["father", "nursery"], // Assuming two options for delivery
    },
    additionalPeopleDelivery: {
      name: String,
      relation: String,
    },
    studentDisease: String,
    studentAllergyDisease: String,
    notes: String,

    date: {
      type: Date,
      default: Date.now,
    },

    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
