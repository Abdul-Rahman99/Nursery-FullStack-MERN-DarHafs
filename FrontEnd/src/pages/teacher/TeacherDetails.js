import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TeacherDetails() {
  const [teacher, setTeachers] = useState();

  let { teacherID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:1000/api/v1/teacher/${teacherID}`)
      .then((res) => res.json())
      .then((teacherData) => {
        setTeachers(teacherData);
      });
  }, [teacherID]);

  return (
    <div className="container mt-5">
      <h1 className="mb-5">بيانات المعلم</h1>
      {teacher && (
        <div className="row">
          
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">الاسم: {teacher.name}</h2>
                <p className="card-text">
                  تاريخ الميلاد: {teacher.dateOfBirth.slice(1, 10)}
                </p>
                <p className="card-text">الرقم القومي: {teacher.nationalId}</p>
                <p className="card-text">العنوان: {teacher.address}</p>
                <p className="card-text">رقم الهاتف: {teacher.phone}</p>

                <p className="card-text">
                  الحالة الإجتماعية: {teacher.maritalStatus}
                </p>
                <p className="card-text">عدد الأطفال: {teacher.numberOfKids}</p>
                <p className="card-text">المؤهل: {teacher.qualification}</p>
                <p className="card-text">التخصص: {teacher.specialization}</p>
                <p className="card-text">
                  التخصص الفرعي: {teacher.exactSpecialization}
                </p>
                <p className="card-text">
                  سنة التخرج: {teacher.graduationYear}
                </p>
                <p className="card-text">
                  الخبرات السابقة: {teacher.previousExperience}
                </p>
                <p className="card-text">
                  خبرات التعامل مع الأطفال: {teacher.kidsExperience}
                </p>
                <p className="card-text">
                  رقم هاتف المنزل: {teacher.homePhone}
                </p>
                <p className="card-text">
                  اختبار القراءة: {teacher.readingTest}
                </p>
                <p className="card-text">
                  اختبار الخط: {teacher.handWritingTest}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDetails;
