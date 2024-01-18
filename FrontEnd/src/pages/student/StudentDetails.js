import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import { Card, Container, Row, Col } from "react-bootstrap";

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

  return (
    <Container className="mt-5">
      <h1 className="mb-5 text-center">بيانات الطالب</h1>
      {student && (
        <Card className="mx-auto">
          <Card.Header>
            <h2 className="text-center">الاسم: {student.name}</h2>
          </Card.Header>
          <Card.Body>
            <Row className="justify-content-center">
              <Col md={6} className="text-center">
                {student.photo && (
                  <img
                    src={`data:${
                      student.photo.contentType
                    };base64,${Buffer.from(student.photo.data).toString(
                      "base64"
                    )}`}
                    alt="Student"
                    className="img-fluid rounded"
                  />
                )}
              </Col>
              <Col md={8} className="text-center">
                <Card.Text>
                  <p>العنوان: {student.address}</p>
                  <p>تاريخ الميلاد: {student.dateOfBirth.slice(0, 10)}</p>
                  <p>النوع: {student.sex}</p>
                  <p>الرقم القومي للطالب: {student.studentNationalId}</p>
                  <p>مقدار الحفظ عند الإلتحاق بالدار: {student.memorization}</p>
                  <p>مؤهل الأب: {student.fatherQualification}</p>
                  <p>وظيفة الأب: {student.fatherJob}</p>
                  <p>رقم هاتف الأب: {student.fatherPhone}</p>
                  <p>اسم الأم: {student.motherName}</p>
                  <p>مؤهل الأم: {student.motherQualification}</p>
                  <p>وظيفة الأم: {student.motherJob}</p>
                  <p>رقم هاتف الأم: {student.motherPhone}</p>
                  <p>تم الإلتحاق في: {student.createdAt.slice(0, 10)}</p>
                  <p>توصيل الطالب: {student.studentDeliveryToHome}</p>
                  <p>
                    الأشخاص المسموح لهم بتوصيل الطالب:
                    {student.additionalPeopleDelivery}
                  </p>
                  <p>أمراض عند الطالب: {student.studentDisease}</p>
                  <p>
                    هل يوجد حساسية عند الطالب؟ {student.studentAllergyDisease}
                  </p>
                  <p>ملاحظات: {student.notes}</p>
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default StudentDetails;
