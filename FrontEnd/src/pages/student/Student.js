import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Search from "../../components/Search"; // Import the StudentSearch component
import { Button, Card, Table } from "react-bootstrap";

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
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllStudents();
  }, []);

  useEffect(() => {
    // Update filtered students whenever the searchQuery changes
    const searchTerm = searchQuery.toLowerCase();
    const filteredResults = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.studentNationalId.toLowerCase().includes(searchTerm) ||
        student.fatherPhone.toLowerCase().includes(searchTerm)
    );

    setFilteredStudents(filteredResults);
  }, [searchQuery, students]);

  const getAllStudents = () => {
    fetch("http://localhost:1000/api/v1/student")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
        setFilteredStudents(data); // Initialize filteredStudents with all students
      });
  };

  const deleteStudent = (student) => {
    Swal.fire({
      title: `Are you sure to Delete ${student.name}?`,
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

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  return (
    <Card className="m-3 p-3">
      <h1 className="text-center m-5">صفحة الطلاب</h1>
      <Search onSearch={handleSearch} />
      <Link to={"/student/create"} className="btn btn-success m-2">
        إضافة طالب جديد
      </Link>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>الإسم</th>
            <th>السن</th>
            <th>رقم ولي الأمر</th>
            <th>الخيارات</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => {
            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{calculateAge(student.dateOfBirth)}</td>
                <td>
                  {student.fatherPhone} / {student.motherPhone}
                </td>
                <td>
                  <Button variant="danger" size="sm" 
                    className="m-1"
                    onClick={() => deleteStudent(student)}
                  >
                    حذف
                  </Button>
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
      </Table>
    </Card>
  );
}

export default Student;
