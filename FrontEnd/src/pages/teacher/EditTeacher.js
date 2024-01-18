import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";

function EditStudent() {
  let navigate = useNavigate();
  let { teacherID } = useParams();

  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [address, setAddress] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [numberOfKids, setNumberOfKids] = useState(0);
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [exactSpecialization, setExactSpecialization] = useState("");
  const [graduationYear, setGraduationYear] = useState(0);
  const [previousExperience, setPreviousExperience] = useState("");
  const [kidsExperience, setKidsExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [readingTest, setReadingTest] = useState("");
  const [handWritingTest, setHandWritingTest] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const updatedFields = {
      ...(name && { name }),
      ...(address && { address }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(nationalId && { nationalId }),
      ...(maritalStatus && { maritalStatus }),
      ...(numberOfKids && { numberOfKids }),
      ...(qualification && { qualification }),
      ...(specialization && { specialization }),
      ...(exactSpecialization && { exactSpecialization }),
      ...(graduationYear && { graduationYear }),
      ...(previousExperience && { previousExperience }),
      ...(kidsExperience && { kidsExperience }),
      ...(phone && { phone }),
      ...(homePhone && { homePhone }),
      ...(readingTest && { readingTest }),
      ...(handWritingTest && { handWritingTest }),
    };

    Object.keys(updatedFields).forEach((key) => {
      formData.append(key, updatedFields[key]);
    });

    axios
      .put(`http://localhost:1000/api/v1/teacher/${teacherID}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        navigate("/teacher");
      });
  };

  return (
    <Card className="mx-auto mt-5 p-4" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4">قم بتعديل معلم حالي</h1>
      <Form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="teacherName" className="form-label">
            الإسم
          </label>
          <input
            type="text"
            className="form-control"
            id="teacherName"
            placeholder="أدخل اسم المعلم"
            aria-describedby="Teacher Name"
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
            placeholder="أدخل عنوان المعلم"
            aria-describedby="Teacher Address"
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
            aria-describedby="Teacher Name"
            onChange={(e) => setDateOfBirth(e.target.value)} // Consider converting to string here
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nationalId" className="form-label">
            الرقم القومي للمعلم
          </label>
          <input
            type="text"
            className="form-control"
            id="nationalId"
            placeholder="أدخل الرقم القومي الخاص بالمعلم"
            aria-describedby="Teacher National ID"
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="maritalStatus" className="form-label">
            الحالة الإجتماعية للمعلم
          </label>
          <input
            type="text"
            className="form-control"
            id="maritalStatus"
            placeholder="مقدار الحفظ"
            aria-describedby="Marital Status"
            onChange={(e) => setMaritalStatus(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numberOfKids" className="form-label">
            عدد الأطفال
          </label>
          <input
            type="text"
            className="form-control"
            id="numberOfKids"
            placeholder="أدخل عدد الأطفال"
            aria-describedby="Number Of Kids"
            onChange={(e) => setNumberOfKids(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="qualification" className="form-label">
            مؤهل المعلم
          </label>
          <input
            type="text"
            className="form-control"
            id="qualification"
            placeholder="أدخل مؤهل المعلم"
            aria-describedby="Qualification"
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="specialization" className="form-label">
            التخصص
          </label>
          <input
            type="text"
            className="form-control"
            id="specialization"
            placeholder="أدخل التخصص"
            aria-describedby="Specialization"
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exactSpecialization" className="form-label">
            التخصص الدقيق
          </label>
          <input
            type="text"
            className="form-control"
            id="exactSpecialization"
            placeholder="أدخل التخصص الدقيق"
            aria-describedby="Exact Specialization"
            onChange={(e) => setExactSpecialization(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="graduationYear" className="form-label">
            سنة التخرج
          </label>
          <input
            type="number"
            className="form-control"
            id="graduationYear"
            placeholder="أدخل سنة التخرج"
            aria-describedby="Graduation Year"
            onChange={(e) => setGraduationYear(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="previousExperience" className="form-label">
            الخبرات السابقة
          </label>
          <input
            type="text"
            className="form-control"
            id="previousExperience"
            placeholder="أدخل الخبرات السابقة"
            aria-describedby="Previous Experience"
            onChange={(e) => setPreviousExperience(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="kidsExperience" className="form-label">
            الخبرات السابقة
          </label>
          <input
            type="text"
            className="form-control"
            id="kidsExperience"
            placeholder="أدخل الخبرات السابقة"
            aria-describedby="Kids Experience"
            onChange={(e) => setKidsExperience(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            رقم الهاتف
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="أدخل رقم الهاتف"
            aria-describedby="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="homePhone" className="form-label">
            رقم الهاتف المنزلي
          </label>
          <input
            type="text"
            className="form-control"
            id="homePhone"
            placeholder="أدخل رقم الهاتف"
            aria-describedby="Home Phone"
            onChange={(e) => setHomePhone(e.target.value)}
          />
        </div>

        <Form.Group className="form-group mb-3">
          <Form.Label>اختبار القراءة</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="readingTest"
            placeholder="أدخل نتيجة اختبار القراءة"
            onChange={(e) => setReadingTest(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group mb-2">
          <Form.Label>اختبار الخط اليدوي</Form.Label>
          <Form.Control
            type="text"
            id="handWritingTest"
            placeholder="أدخل نتيجة اختبار الخط اليدوي"
            onChange={(e) => setHandWritingTest(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="btn btn-primary m-3">
          عدل المعلم
        </Button>
      </Form>
    </Card>
  );
}

export default EditStudent;
