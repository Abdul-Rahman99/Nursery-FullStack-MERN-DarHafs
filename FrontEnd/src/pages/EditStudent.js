import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
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
  // const [image, setImage] = useState("");

  // Format date before sending
  const parsedDateOfBirth = new Date(dateOfBirth);

  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:1000/api/v1/student/create",
        {
          name: name,
          address: address,
          dateOfBirth: parsedDateOfBirth,
          sex: sex,
          studentNationalId: studentNationalId,
          memorization: memorization,
          fatherQualification: fatherQualification,
          fatherJob: fatherJob,
          fatherPhone: fatherPhone,
          motherName: motherName,
          motherQualification: motherQualification,
          motherJob: motherJob,
          motherPhone: motherPhone,
          studentDeliveryToHome: studentDeliveryToHome,
          additionalPeopleDelivery: additionalPeopleDelivery,
          studentDisease: studentDisease,
          studentAllergyDisease: studentAllergyDisease,
          notes: notes,
          // image,
        },
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/student");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <h1>قم بإنشاء طالب جديد</h1>
      <br></br>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">
            الإسم
          </label>
          <input
            type="text"
            className="form-control"
            id="studentName"
            placeholder="أدخل اسم الطالب"
            aria-describedby="Student Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            العنوان
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="أدخل عنوان الطالب"
            aria-describedby="Student Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput1"
            aria-describedby="Student Name"
            onChange={(e) => setDateOfBirth(e.target.value)} // Consider converting to string here
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sex" className="form-label">
            النوع
          </label>
          <select
            className="form-control"
            id="sex"
            aria-describedby="Student Gender"
            onChange={(e) => setSex(e.target.value)}
          >
            <option defaultValue>اختر</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="studentNationalId" className="form-label">
            الرقم القومي للطالب
          </label>
          <input
            type="text"
            className="form-control"
            id="studentNationalId"
            placeholder="أدخل الرقم القومي الخاص بالطالب"
            aria-describedby="Student National ID"
            onChange={(e) => setStudentNationalId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="studentNationalId" className="form-label">
            مقدار حفظ الطالب عند إلتحاقه بالدار
          </label>
          <input
            type="text"
            className="form-control"
            id="studentNationalId"
            placeholder="مقدار الحفظ"
            aria-describedby="Student National ID"
            onChange={(e) => setMemorization(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fatherQualification" className="form-label">
            مؤهل الأب
          </label>
          <input
            type="text"
            className="form-control"
            id="fatherQualification"
            placeholder="أدخل مؤهل الأب"
            aria-describedby="Father Qualification"
            onChange={(e) => setFatherQualification(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fatherJob" className="form-label">
            وظيفة الأب
          </label>
          <input
            type="text"
            className="form-control"
            id="fatherJob"
            placeholder="أدخل وظيفة الأب"
            aria-describedby="Father Job"
            onChange={(e) => setFatherJob(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fatherPhone" className="form-label">
            هاتف الأب
          </label>
          <input
            type="text"
            className="form-control"
            id="fatherPhone"
            placeholder="أدخل رقم هاتف الأب يبداء ب 20"
            aria-describedby="Father Phone"
            onChange={(e) => setFatherPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="motehrName" className="form-label">
            اسم الأم
          </label>
          <input
            type="text"
            className="form-control"
            id="motehrName"
            placeholder="أدخل اسم الأم"
            aria-describedby="Mother Name"
            onChange={(e) => setMotherName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="motherQualification" className="form-label">
            مؤهل الأم
          </label>
          <input
            type="text"
            className="form-control"
            id="motherQualification"
            placeholder="أدخل مؤهل الأم"
            aria-describedby="Mother Qualification"
            onChange={(e) => setMotherQualification(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="motherJob" className="form-label">
            وظيفة الأم
          </label>
          <input
            type="text"
            className="form-control"
            id="motherJob"
            placeholder="أدخل وظيفة الأم"
            aria-describedby="Mother Job"
            onChange={(e) => setMotherJob(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mohterPhone" className="form-label">
            هاتف الأم
          </label>
          <input
            type="text"
            className="form-control"
            id="mohterPhone"
            placeholder="أدخل رقم هاتف الأم يبداء ب 20"
            aria-describedby="Mother Phone"
            onChange={(e) => setMotherPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="studentDeliveryToHome" className="form-label">
            توصيل الطالب للمنزل
          </label>
          <select
            className="form-control"
            id="studentDeliveryToHome"
            aria-describedby="Student Gender"
            onChange={(e) => setStudentDeliveryToHome(e.target.value)}
          >
            <option defaultValue>اختر</option>
            <option value="father">بمعرفة ولي الأمر</option>
            <option value="nursery">الحضانة</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="additionalPeopleDelivery" className="form-label">
            الأشخاص المسموح لهم بإستلام الطفل
          </label>
          <input
            type="text"
            className="form-control"
            id="additionalPeopleDelivery"
            placeholder="مثال (العم) اسم العم"
            aria-describedby="Additional People Delivery"
            onChange={(e) => setAdditionalPeopleDelivery(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="studentDisease" className="form-label">
            هل لدى الطفل أي أمراض ؟
          </label>
          <input
            type="text"
            className="form-control"
            id="studentDisease"
            placeholder="أدخل الأمراض لدي الطفل إن وجد"
            aria-describedby="Student Disease"
            onChange={(e) => setStudentDisease(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="studentAllergyDisease" className="form-label">
            هل لدى الطفل أي نوع من أنواع الحساسية ؟
          </label>
          <input
            type="text"
            className="form-control"
            id="studentAllergyDisease"
            placeholder="أدخل الحساسية لدي الطفل إن وجد"
            aria-describedby="Student Allergy Disease"
            onChange={(e) => setStudentAllergyDisease(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            ملاحظات{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="notes"
            placeholder="ملاحظات"
            aria-describedby="notes"
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="image">أضف الصورة الشخصية</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div> */}

        <br></br>
        <button type="submit" className="btn btn-primary m-3">
          أضف الطالب الجديد
        </button>
      </form>
    </>
  );
}

export default EditStudent;
