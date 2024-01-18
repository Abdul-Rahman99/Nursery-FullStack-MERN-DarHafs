import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CameraCapture from "../../components/Camera"; // Import the CameraCapture component

import { Card, Form } from "react-bootstrap";

function CreateStudent() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [studentNationalId, setStudentNationalId] = useState("");
  const [memorization, setMemorization] = useState("");
  const [fatherQualification, setFatherQualification] = useState("");
  const [fatherJob, setFatherJob] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherQualification, setMotherQualification] = useState("");
  const [motherJob, setMotherJob] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [studentDeliveryToHome, setStudentDeliveryToHome] = useState("");
  const [additionalPeopleDelivery, setAdditionalPeopleDelivery] = useState("");
  const [studentDisease, setStudentDisease] = useState("");
  const [studentAllergyDisease, setStudentAllergyDisease] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState(null);
  const [capturedBlob, setCapturedBlob] = useState(null);

  const [initialSexValue, setInitialSexValue] = useState("");
  const [initialDeliveryValue, setInitialDeliveryValue] = useState("");
  const [initialDateOfBirth, setInitialDateOfBirth] = useState("");

  const [errors, setErrors] = useState({});

  const formSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("address", address);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("sex", sex);
      formData.append("studentNationalId", studentNationalId);
      formData.append("memorization", memorization);
      formData.append("fatherQualification", fatherQualification);
      formData.append("fatherJob", fatherJob);
      formData.append("fatherPhone", fatherPhone);
      formData.append("motherName", motherName);
      formData.append("motherQualification", motherQualification);
      formData.append("motherJob", motherJob);
      formData.append("motherPhone", motherPhone);
      formData.append("studentDeliveryToHome", studentDeliveryToHome);
      formData.append("additionalPeopleDelivery", additionalPeopleDelivery);
      formData.append("studentDisease", studentDisease);
      formData.append("studentAllergyDisease", studentAllergyDisease);
      formData.append("notes", notes);

      if (photo) {
        formData.append("photo", photo);
      } else if (capturedBlob) {
        formData.append("photo", capturedBlob, "capturedImage.jpg");
      }

      // send date to the server
      axios
        .post("http://localhost:1000/api/v1/student/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          console.log(data);
          navigate("/student");
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let errors = {};

    // student validation
    if (!name.trim()) {
      errors.name = "الإسم مطلوب";
    }

    if (!address.trim()) {
      errors.address = "العنوان مطلوب";
    }

    if (dateOfBirth === initialDateOfBirth) {
      errors.dateOfBirth = "تاريخ الميلاد مطلوب";
    }

    if (sex === initialSexValue) {
      errors.sex = "الجنس مطلوب";
    }

    if (!studentNationalId.trim()) {
      errors.studentNationalId = "الرقم القومي مطلوب";
    } else if (!/^\d{14}$/.test(studentNationalId)) {
      errors.studentNationalId = "الرقم القومي يجب أن يكون مؤلف من 14 رقمًا";
    }

    if (!memorization.trim()) {
      errors.memorization = "مقدار الحفظ مطلوب";
    }

    // father validation
    if (!fatherQualification.trim()) {
      errors.fatherQualification = "مؤهل الوالد مطلوب";
    }
    if (!fatherJob.trim()) {
      errors.fatherJob = "عمل الوالد مطلوب";
    }
    if (!fatherPhone.trim()) {
      errors.fatherPhone = "رقم الهاتف لولي الأمر مطلوب";
    } else if (!/^\d{11}$/.test(fatherPhone)) {
      errors.fatherPhone = "رقم الهاتف يجب ان يكون مؤلف من 11 رقما يبداء ب 01";
    }

    // mother validation
    if (!motherName.trim()) {
      errors.motherName = "اسم الأم مطلوب";
    }
    if (!motherQualification.trim()) {
      errors.motherQualification = "مؤهل الأم مطلوب";
    }
    if (!motherJob.trim()) {
      errors.motherJob = "عمل الأم مطلوب";
    }
    if (!motherPhone.trim()) {
      errors.motherPhone = "رقم الهاتف للأم مطلوب";
    } else if (!/^\d{11}$/.test(motherPhone)) {
      errors.motherPhone = "رقم الهاتف يجب ان يكون مؤلف من 11 رقما يبداء ب 01";
    }

    // other validation
    if (studentDeliveryToHome === initialDeliveryValue) {
      errors.studentDeliveryToHome = "يجب اختيار طريقة للتوصيل";
    }
    if (!additionalPeopleDelivery.trim()) {
      errors.additionalPeopleDelivery =
        "هل هناك أشخاص اخرون مسموح لهم بإستلام الطالب؟";
    }
    if (!studentDisease.trim()) {
      errors.studentDisease = "هل يوجد اي أمراض عند الطالب؟";
    }
    if (!studentAllergyDisease.trim()) {
      errors.studentAllergyDisease = "هل يوجد حساسية لدي الطالب؟";
    }
    if (!notes.trim()) {
      errors.notes = "هل هناك اي ملحوظات";
    }
    // photo validation
    if (!photo && !capturedBlob) {
      errors.photo = "يرجى اختيار صورة للطالب";
    }

    return errors;
  };

  return (
    <Card className="mx-auto mt-5 p-4" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4">إضافة طالب جديد</h1>
      <Form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">
            الإسم
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="studentName"
            placeholder="أدخل اسم الطالب"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            العنوان
          </label>
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            placeholder="أدخل عنوان الطالب"
            aria-describedby="Student Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
            id="exampleFormControlInput1"
            aria-describedby="Student Name"
            onChange={(e) => {
              setDateOfBirth(e.target.value); // Set date of birth as string
              if (initialDateOfBirth === null) {
                setInitialDateOfBirth(e.target.value); // Set initial date of birth as string
              }
            }}
          />
          {errors.dateOfBirth && (
            <div className="invalid-feedback">{errors.dateOfBirth}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="sex" className="form-label">
            النوع
          </label>
          <select
            className={`form-control ${errors.sex ? "is-invalid" : ""}`}
            id="sex"
            aria-describedby="Student Gender"
            onChange={(e) => {
              setSex(e.target.value);
              if (initialSexValue === null) {
                setInitialSexValue(e.target.value);
              }
            }}
          >
            <option defaultValue={null}>اختر</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
          {errors.sex && <div className="invalid-feedback">{errors.sex}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="studentNationalId" className="form-label">
            الرقم القومي للطالب
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.studentNationalId ? "is-invalid" : ""
            }`}
            id="studentNationalId"
            placeholder="أدخل الرقم القومي الخاص بالطالب"
            aria-describedby="Student National ID"
            onChange={(e) => setStudentNationalId(e.target.value)}
          />
          {errors.studentNationalId && (
            <div className="invalid-feedback">{errors.studentNationalId}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="memorization" className="form-label">
            مقدار حفظ الطالب عند إلتحاقه بالدار
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.memorization ? "is-invalid" : ""
            }`}
            id="memorization"
            placeholder="مقدار الحفظ"
            aria-describedby="Student National ID"
            onChange={(e) => setMemorization(e.target.value)}
          />
          {errors.memorization && (
            <div className="invalid-feedback">{errors.memorization}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fatherQualification" className="form-label">
            مؤهل الأب
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.fatherQualification ? "is-invalid" : ""
            }`}
            id="fatherQualification"
            placeholder="أدخل مؤهل الأب"
            aria-describedby="Father Qualification"
            onChange={(e) => setFatherQualification(e.target.value)}
          />
          {errors.fatherQualification && (
            <div className="invalid-feedback">{errors.fatherQualification}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fatherJob" className="form-label">
            وظيفة الأب
          </label>
          <input
            type="text"
            className={`form-control ${errors.fatherJob ? "is-invalid" : ""}`}
            id="fatherJob"
            placeholder="أدخل وظيفة الأب"
            aria-describedby="Father Job"
            onChange={(e) => setFatherJob(e.target.value)}
          />
          {errors.fatherJob && (
            <div className="invalid-feedback">{errors.fatherJob}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fatherPhone" className="form-label">
            هاتف الأب
          </label>
          <input
            type="text"
            className={`form-control ${errors.fatherPhone ? "is-invalid" : ""}`}
            id="fatherPhone"
            placeholder="أدخل رقم هاتف الأب يبداء ب 01"
            aria-describedby="Father Phone"
            onChange={(e) => setFatherPhone(e.target.value)}
          />
          {errors.fatherPhone && (
            <div className="invalid-feedback">{errors.fatherPhone}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="motehrName" className="form-label">
            اسم الأم
          </label>
          <input
            type="text"
            className={`form-control ${errors.motherName ? "is-invalid" : ""}`}
            id="motehrName"
            placeholder="أدخل اسم الأم"
            aria-describedby="Mother Name"
            onChange={(e) => setMotherName(e.target.value)}
          />
          {errors.motherName && (
            <div className="invalid-feedback">{errors.motherName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="motherQualification" className="form-label">
            مؤهل الأم
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.motherQualification ? "is-invalid" : ""
            }`}
            id="motherQualification"
            placeholder="أدخل مؤهل الأم"
            aria-describedby="Mother Qualification"
            onChange={(e) => setMotherQualification(e.target.value)}
          />
          {errors.motherQualification && (
            <div className="invalid-feedback">{errors.motherQualification}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="motherJob" className="form-label">
            وظيفة الأم
          </label>
          <input
            type="text"
            className={`form-control ${errors.motherJob ? "is-invalid" : ""}`}
            id="motherJob"
            placeholder="أدخل وظيفة الأم"
            aria-describedby="Mother Job"
            onChange={(e) => setMotherJob(e.target.value)}
          />
          {errors.motherJob && (
            <div className="invalid-feedback">{errors.motherJob}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="motherPhone" className="form-label">
            هاتف الأم
          </label>
          <input
            type="text"
            className={`form-control ${errors.motherPhone ? "is-invalid" : ""}`}
            id="motherPhone"
            placeholder="أدخل رقم هاتف الأم يبداء ب 01"
            aria-describedby="Mother Phone"
            onChange={(e) => setMotherPhone(e.target.value)}
          />
          {errors.motherPhone && (
            <div className="invalid-feedback">{errors.motherPhone}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="studentDeliveryToHome" className="form-label">
            طريقة توصيل الطالب للمنزل
          </label>
          <select
            className={`form-control ${
              errors.studentDeliveryToHome ? "is-invalid" : ""
            }`}
            id="studentDeliveryToHome"
            aria-describedby="Student Delivery"
            onChange={(e) => {
              setStudentDeliveryToHome(e.target.value);
              if (initialDeliveryValue === null) {
                setInitialDeliveryValue(e.target.value);
              }
            }}
          >
            <option defaultValue={null}>اختر</option>
            <option value="father">بمعرفة ولي الأمر</option>
            <option value="nursery">الحضانة</option>
          </select>
          {errors.studentDeliveryToHome && (
            <div className="invalid-feedback">
              {errors.studentDeliveryToHome}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="additionalPeopleDelivery" className="form-label">
            هل هناك أشخاص آخرين مسموح لهم بإستلام الطالب؟
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.additionalPeopleDelivery ? "is-invalid" : ""
            }`}
            id="additionalPeopleDelivery"
            placeholder="أدخل أسماء الأشخاص"
            aria-describedby="Additional People Delivery"
            onChange={(e) => setAdditionalPeopleDelivery(e.target.value)}
          />
          {errors.additionalPeopleDelivery && (
            <div className="invalid-feedback">
              {errors.additionalPeopleDelivery}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="studentDisease" className="form-label">
            هل يوجد أمراض عند الطالب؟
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.studentDisease ? "is-invalid" : ""
            }`}
            id="studentDisease"
            placeholder="أدخل أمراض الطالب إن وجدت"
            aria-describedby="Student Disease"
            onChange={(e) => setStudentDisease(e.target.value)}
          />
          {errors.studentDisease && (
            <div className="invalid-feedback">{errors.studentDisease}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="studentAllergyDisease" className="form-label">
            هل يوجد حساسية لدي الطالب؟
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.studentAllergyDisease ? "is-invalid" : ""
            }`}
            id="studentAllergyDisease"
            placeholder="أدخل حساسيات الطالب إن وجدت"
            aria-describedby="Student Allergy Disease"
            onChange={(e) => setStudentAllergyDisease(e.target.value)}
          />
          {errors.studentAllergyDisease && (
            <div className="invalid-feedback">
              {errors.studentAllergyDisease}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            هل هناك أي ملاحظات؟
          </label>
          <textarea
            className={`form-control ${errors.notes ? "is-invalid" : ""}`}
            id="notes"
            rows="3"
            placeholder="أدخل أي ملاحظات"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          {errors.notes && (
            <div className="invalid-feedback">{errors.notes}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            صورة الطالب
          </label>
          <div>
            <input
              type="file"
              className="form-control"
              id="photo"
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
                setCapturedBlob(null);
              }}
            />
            {errors.photo && (
              <div className="invalid-feedback">{errors.photo}</div>
            )}
            <br></br>
            <h4>أو</h4>
            <CameraCapture onCapture={(blob) => setCapturedBlob(blob)} />{" "}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          إنشاء الطالب
        </button>
      </Form>
    </Card>
  );
}

export default CreateStudent;
