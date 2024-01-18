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

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllTeachers();
  }, []);

  useEffect(() => {
    // Update filtered students whenever the searchQuery changes
    const searchTerm = searchQuery.toLowerCase();
    const filteredResults = teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm) ||
        teacher.nationalId.toLowerCase().includes(searchTerm) ||
        teacher.phone.toLowerCase().includes(searchTerm)
    );

    setFilteredTeachers(filteredResults);
  }, [searchQuery, teachers]);

  const getAllTeachers = () => {
    fetch("http://localhost:1000/api/v1/teacher")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTeachers(data);
        setFilteredTeachers(data); // Initialize filteredStudents with all students
      });
  };

  const deleteTeacher = (teacher) => {
    Swal.fire({
      title: `Are you sure to Delete ${teacher.name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const imageUrl = teacher.image;

        fetch(`http://localhost:1000/api/v1/teacher/${teacher._id}`, {
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
          getAllTeachers();
        });
      }
    });
  };

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  return (
    <Card className="m-3 p-3">
      <h1 className="text-center m-5">صفحة المعلمين</h1>
      <Search onSearch={handleSearch} />
      <Link to={"/teacher/create"} className="btn btn-success m-2">
        إضافة معلم جديد
      </Link>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>الإسم</th>
            <th>السن</th>
            <th>رقم المعلم</th>
            <th>المؤهل</th>
            <th>الخيارات</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => {
            return (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{calculateAge(teacher.dateOfBirth)}</td>
                <td>{teacher.phone} / {teacher.homePhone}</td>
                <td>{teacher.qualification}</td>
                <td>
                  <Button variant="danger" size="sm"
                    className="m-1"
                    onClick={() => deleteTeacher(teacher)}
                  >
                    حذف
                  </Button>
                  <Link
                    to={`/teacher/${teacher._id}`}
                    className="btn btn-info btn-sm m-1"
                  >
                    عرض
                  </Link>
                  <Link
                    to={`/teacher/edit/${teacher._id}`}
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
    </ Card>
  );
}

export default Teachers;
