import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

function CreateTeacher() {
  let navigate = useNavigate();

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

  const [initialDateOfBirth, setInitialDateOfBirth] = useState("");
  const [initialMaritalStatus, setInitialMaritalStatus] = useState("");

  const [errors, setErrors] = useState({});

  const formSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("nationalId", nationalId);
      formData.append("address", address);
      formData.append("maritalStatus", maritalStatus);
      formData.append("numberOfKids", numberOfKids);
      formData.append("qualification", qualification);
      formData.append("specialization", specialization);
      formData.append("exactSpecialization", exactSpecialization);
      formData.append("graduationYear", graduationYear);
      formData.append("previousExperience", previousExperience);
      formData.append("kidsExperience", kidsExperience);
      formData.append("phone", phone);
      formData.append("homePhone", homePhone);
      formData.append("readingTest", readingTest);
      formData.append("handWritingTest", handWritingTest);

      // Send data to the server
      axios
        .post("http://localhost:1000/api/v1/teacher/create", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((data) => {
          console.log(data);
          navigate("/teacher");
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let errors = {};

    // Teacher name validation
    if (!name.trim()) {
      errors.name = "الإسم مطلوب";
    }

    // Date of Birth validation
    if (dateOfBirth === initialDateOfBirth) {
      errors.dateOfBirth = "تاريخ الميلاد مطلوب";
    }

    // Address validation
    if (!address.trim()) {
      errors.address = "عنوان المعلم مطلوب";
    }

    // National Id validation
    if (!nationalId.trim()) {
      errors.nationalId = "الرقم القومي مطلوب";
    } else if (!/^\d{14}$/.test(nationalId)) {
      errors.nationalId = "الرقم القومي يجب أن يكون مؤلف من 14 رقمًا";
    }

    // Marital Status validation
    if (maritalStatus === initialMaritalStatus) {
      errors.maritalStatus = "الحالة الاجتماعية مطلوبة";
    }

    // Number of Kids validation
    if (isNaN(numberOfKids) || numberOfKids < 0) {
      errors.numberOfKids = "عدد الأطفال يجب أن يكون رقمًا صحيحًا وإيجابيًا";
    }

    // Qualification validation
    if (!qualification.trim()) {
      errors.qualification = "المؤهل مطلوب";
    }

    // Specialization validation
    if (!specialization.trim()) {
      errors.specialization = "التخصص مطلوب";
    }

    // Exact Specialization validation
    if (!exactSpecialization.trim()) {
      errors.exactSpecialization = "التخصص الدقيق مطلوب";
    }

    // Graduation Year validation
    if (isNaN(graduationYear) || graduationYear <= 0) {
      errors.graduationYear = "سنة التخرج يجب أن تكون رقمًا صحيحًا وإيجابيًا";
    }

    // Previous Experience validation
    if (!previousExperience.trim()) {
      errors.previousExperience = "الخبرة السابقة مطلوبة";
    }

    // Kids Experience validation
    if (!kidsExperience.trim()) {
      errors.kidsExperience = "الخبرة في التعامل مع الأطفال مطلوبة";
    }

    // Phone validation
    if (!phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    } else if (!/^\d{11}$/.test(phone)) {
      errors.phone = "رقم الهاتف يجب أن يكون مؤلف من 11 رقمًا يبدأ ب 01";
    }

    // Home Phone validation
    if (!homePhone.trim()) {
      errors.homePhone = "رقم الهاتف المنزلي مطلوب";
    } else if (!/^\d{11}$/.test(homePhone)) {
      errors.homePhone = "رقم الهاتف يجب أن يكون مؤلف من 11 رقمًا يبدأ ب 01";
    }

    // Reading Test validation
    if (!readingTest.trim()) {
      errors.readingTest = "اختبار القراءة مطلوب";
    }

    // Handwriting Test validation
    if (!handWritingTest.trim()) {
      errors.handWritingTest = "اختبار الخط مطلوب";
    }

    return errors;
  };

  return (
    <Card className="mx-auto mt-5 p-4" style={{ maxWidth: "600px" }}>
      <h1>إضافة معلم جديد</h1>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>إسم المعلم</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            placeholder="أدخل اسم المعلم"
            aria-describedby="Teacher Name"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="dateOfBirth" className="form-label">
            تاريخ الميلاد
          </Form.Label>
          <Form.Control
            type="date"
            className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
            id="dateOfBirth"
            aria-describedby="Teacher Date of Birth"
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>الرقم القومي</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${errors.nationalId ? "is-invalid" : ""}`}
            id="nationalId"
            placeholder="أدخل الرقم القومي"
            aria-describedby="Teacher National ID"
            onChange={(e) => setNationalId(e.target.value)}
          />
          {errors.nationalId && (
            <div className="invalid-feedback">{errors.nationalId}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>العنوان</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            placeholder="أدخل عنوان المعلم"
            aria-describedby="Teacher Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>الحالة الاجتماعية</Form.Label>
          <Form.Select
            className={`form-control ${
              errors.maritalStatus ? "is-invalid" : ""
            }`}
            id="maritalStatus"
            aria-describedby="Teacher Marital Status"
            onChange={(e) => {
              setMaritalStatus(e.target.value);
              if (initialMaritalStatus === null) {
                setInitialMaritalStatus(e.target.value);
              }
            }}
          >
            <option defaultValue={null}>اختر</option>
            <option value="single">أعزب</option>
            <option value="married">متزوج</option>
          </Form.Select>
          {errors.maritalStatus && (
            <div className="invalid-feedback">{errors.maritalStatus}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>عدد الأطفال</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${
              errors.numberOfKids ? "is-invalid" : ""
            }`}
            id="numberOfKids"
            placeholder="أدخل عدد الأطفال"
            aria-describedby="Teacher Number of Kids"
            onChange={(e) => setNumberOfKids(parseInt(e.target.value))}
          />
          {errors.numberOfKids && (
            <div className="invalid-feedback">{errors.numberOfKids}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>المؤهل</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${
              errors.qualification ? "is-invalid" : ""
            }`}
            id="qualification"
            placeholder="أدخل المؤهل"
            aria-describedby="Teacher Qualification"
            onChange={(e) => setQualification(e.target.value)}
          />
          {errors.qualification && (
            <div className="invalid-feedback">{errors.qualification}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>التخصص</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${
              errors.specialization ? "is-invalid" : ""
            }`}
            id="specialization"
            placeholder="أدخل التخصص"
            aria-describedby="Teacher Specialization"
            onChange={(e) => setSpecialization(e.target.value)}
          />
          {errors.specialization && (
            <div className="invalid-feedback">{errors.specialization}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>التخصص الدقيق</Form.Label>
          <Form.Select
            type="text"
            className={`form-control ${
              errors.exactSpecialization ? "is-invalid" : ""
            }`}
            id="exactSpecialization"
            placeholder="أدخل التخصص الدقيق"
            aria-describedby="Teacher Exact Specialization"
            onChange={(e) => setExactSpecialization(e.target.value)}
          />
          {errors.exactSpecialization && (
            <div className="invalid-feedback">{errors.exactSpecialization}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>سنة التخرج</Form.Label>
          <Form.Control
            type="number"
            className={`form-control ${
              errors.graduationYear ? "is-invalid" : ""
            }`}
            id="graduationYear"
            placeholder="أدخل سنة التخرج"
            aria-describedby="Teacher Graduation Year"
            onChange={(e) => setGraduationYear(parseInt(e.target.value))}
          />
          {errors.graduationYear && (
            <div className="invalid-feedback">{errors.graduationYear}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>الخبرة السابقة</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${
              errors.previousExperience ? "is-invalid" : ""
            }`}
            id="previousExperience"
            placeholder="أدخل الخبرة السابقة"
            aria-describedby="Teacher Previous Experience"
            onChange={(e) => setPreviousExperience(e.target.value)}
          />
          {errors.previousExperience && (
            <div className="invalid-feedback">{errors.previousExperience}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>الخبرة مع الأطفال</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${
              errors.kidsExperience ? "is-invalid" : ""
            }`}
            id="kidsExperience"
            placeholder="أدخل الخبرة مع الأطفال"
            aria-describedby="Teacher Kids Experience"
            onChange={(e) => setKidsExperience(e.target.value)}
          />
          {errors.kidsExperience && (
            <div className="invalid-feedback">{errors.kidsExperience}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>رقم الهاتف</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            placeholder="أدخل رقم الهاتف"
            aria-describedby="Teacher Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>رقم الهاتف المنزلي</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${errors.homePhone ? "is-invalid" : ""}`}
            id="homePhone"
            placeholder="أدخل رقم الهاتف المنزلي"
            aria-describedby="Teacher Home Phone"
            onChange={(e) => setHomePhone(e.target.value)}
          />
          {errors.homePhone && (
            <div className="invalid-feedback">{errors.homePhone}</div>
          )}
        </Form.Group>

        <Form.Group className="form-group mb-3">
          <Form.Label>اختبار القراءة</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${errors.readingTest ? "is-invalid" : ""}`}
            id="readingTest"
            placeholder="أدخل نتيجة اختبار القراءة"
            onChange={(e) => setReadingTest(e.target.value)}
          />
          {errors.readingTest && (
            <div className="invalid-feedback">{errors.readingTest}</div>
          )}
        </Form.Group>

        <Form.Group className="form-group mb-2">
          <Form.Label>اختبار الخط اليدوي</Form.Label>
          <Form.Control
            type="text"
            className={`form-control ${
              errors.handWritingTest ? "is-invalid" : ""
            }`}
            id="handWritingTest"
            placeholder="أدخل نتيجة اختبار الخط اليدوي"
            onChange={(e) => setHandWritingTest(e.target.value)}
          />
          {errors.handWritingTest && (
            <div className="invalid-feedback">{errors.handWritingTest}</div>
          )}
        </Form.Group>

        <Button type="submit" className="btn btn-primary m-3">
          إضافة المعلم
        </Button>
      </Form>
    </Card>
  );
}

export default CreateTeacher;
