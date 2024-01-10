import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    fetch("http://localhost:1000/api/v1/student")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudent(data);
      });
  };

  const deleteStudent = (student) => {
    Swal.fire({
      title: `Are you sure to Delete ${student.name} ${student.fatherName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const imageUrl = student.image;

        fetch(`http://localhost:1000/api/v1/student/${student._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (imageUrl) {
              // Make a request to your server to delete the image
              fetch(`http://localhost:1000/api/v1/delete-image`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl }),
              });
            }
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then(() => {
          getAllStudents();
        });
      }
    });
  };

  return (
    <>
      <h1>صفحة الطلاب</h1>

      <Link to={"/student/create"} className="btn btn-success m-2">
        إضافة طالب جديد
      </Link>

      <table className="table table-striped mt-1">
        <thead>
          <tr>
            <th>الإسم</th>
            <th>السن</th>
            <th>رقم ولي الأمر</th>
          </tr>
        </thead>
        <tbody>
          {student.map((student) => {
            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{calculateAge(student.dateOfBirth)}</td>
                <td>{student.fatherPhone}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm m-1"
                    onClick={() => deleteStudent(student)}
                  >
                    حذف
                  </button>
                  <Link
                    to={`/student/${student._id}`}
                    className="btn btn-info btn-sm m-1"
                  >
                    عرض
                  </Link>
                  <Link
                    to={`/student/edit/${student._id}`}
                    className="btn btn-primary btn-sm m-1"
                  >
                    تعديل
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default Student;
