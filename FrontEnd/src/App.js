import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Student from "./pages/student/Student";
import Teachers from "./pages/teacher/Teachers";
import CreateStudent from "./pages/student/CreateStudent";

import EditStudent from "./pages/student/EditStudent";
import StudentDetails from "./pages/student/StudentDetails";
import CreateTeacher from "./pages/teacher/CreateTeacher";
import TeacherDetails from "./pages/teacher/TeacherDetails";
import EditTeacher from "./pages/teacher/EditTeacher";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div
          className="col-2 sidebar"
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Sidebar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="student"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route path="" element={<Student />} />
              <Route path="create" element={<CreateStudent />} />
              <Route path=":studentID" element={<StudentDetails />} />
              <Route path="edit/:studentID" element={<EditStudent />} />
            </Route>
            <Route
              path="teacher"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route path="" element={<Teachers />} />
              <Route path="create" element={<CreateTeacher />} />
              <Route path=":teacherID" element={<TeacherDetails />} />
              <Route path="edit/:teacherID" element={<EditTeacher />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
