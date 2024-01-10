const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "إسم الطالب مطلوب"],
      minlength: [3, "أقل من اللازم"],
      maxlength: [32, "أكثر من اللازم"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, "العمر مطلوب"],
    },
    phone: {
      unique: [true],
      type: String,
      required: [true, "Please insert phone number"],
    },
    address: {
      type: String,
      required: [true, "عنوان  مطلوب"],
      minlength: [3, "أقل من اللازم"],
      maxlength: [150, "أكثر من اللازم"],
    },
    nationalId: {
      unique: [true, "Phone in unique"],
      type: String,
      minlength: [14, "الرقم القومي اقل من 14 رقم"],
      maxlength: [14, "الرقم القومي اكثر من 14 رقم"],
    },
    qualification: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
