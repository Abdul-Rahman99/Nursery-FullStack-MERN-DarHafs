import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Teachers from "./pages/Teachers";
import CreateStudent from "./pages/CreateStudent";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div className="col-2 sidebar">
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
            <Route path="/teachers" element={<Teachers />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
