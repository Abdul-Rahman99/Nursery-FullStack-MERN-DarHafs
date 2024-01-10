import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentDetails() {
  const [student, setStudent] = useState();

  let { studentID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:1000/api/v1/student/${studentID}`)
      .then((res) => res.json())
      .then((studentData) => {
        console.log(studentData);
        setStudent(studentData);
      });
  }, [studentID]);

  function convertToBase64(e) {
    
  }

  return (
    <>
      <h1 className="m-5">بيانات الطالب</h1>
      {student && (
        <div className=" m-1" style={{ width: "auto" }}>
          <div>{<img src={student.image || ""} alt="" />}</div>
          <div className="col">
            <br></br>
            <h2>الاسم: {student.name}</h2>
            <br></br>
            <h5>العنوان: {student.address}</h5>
            <br></br>
            <h5>تاريخ الميلاد: {student.dateOfBirth.slice(0, 10)}</h5>
            <br></br>
            <h5>النوع: {student.sex}</h5>
            <br></br>
            <h5>الرقم القومي للطالب: {student.studentNationalId}</h5>
            <br></br>
            <h5>مقدار الحفظ عند الإلتحاق بالدار: {student.memorization}</h5>
            <br></br>
            <h5>مؤهل الأب: {student.fatherQualification}</h5>
            <br></br>
            <h5>وظيفة الأب: {student.fatherJob}</h5>
            <br></br>
            <h5>رقم هاتف الأب: {student.fatherPhone}</h5>
            <br></br>
            <h5>اسم الأم: {student.motherName}</h5>
            <br></br>
            <h5>مؤهل الأم: {student.motherQualification}</h5>
            <br></br>
            <h5>وظيفة الأم: {student.motherJob}</h5>
            <br></br>
            <h5>رقم هاتف الأم: {student.motherPhone}</h5>
            <br></br>
            <h5>تم الإلتحاق في: {student.createdAt.slice(0, 10)}</h5>
            <br></br>
            <h5>توصيل الطالب: {student.studentDeliveryToHome}</h5>
            <br></br>
            <h5>
              الأشخاص المسموح لهم بتوصيل الطالب:
              {student.additionalPeopleDelivery}
            </h5>
            <br></br>
            <h5>أمراض عند الطالب: {student.studentDisease}</h5>
            <br></br>
            <h5>هل يوجد حساسية عند الطالب؟ {student.studentAllergyDisease}</h5>
            <br></br>
            <h5>ملاحظات: {student.notes}</h5>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentDetails;
