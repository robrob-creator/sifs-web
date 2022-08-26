import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subjects from "./Pages/Subjects";
import Feedback from "./Pages/Feedback";
import Student_Feedback from "./Pages/Student_Feedback";
import Students from "./Pages/Students";
import SignInChoices from "./Pages/SignInChoices";
import SignInStudent from "./Pages/SignInStudent";
import StudentGrade from "./Pages/StudentGrade";
import Teacher_Feedback from "./Pages/Teacher_Feedback";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminTeacherDash from "./Pages/AdminTeacherDash";
import AdminStudentDash from "./Pages/AdminStudentDash";
import AdminTeacherInfo from "./Pages/AdminTeacherInfo";
import AdminTeacherAdd from "./Pages/AdminTeacherAdd";
import AdminStudentInfo from "./Pages/AdminStudentInfo";
import AdminStudentAdd from "./Pages/AdminStudentAdd";
import AdminSubjecttAdd from "./Pages/admin/subjectsDashboard";
import SignInAdmin from "./Pages/SignInAdmin";
import SignInTeacher from "./Pages/SignInTeacher";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignInChoices />} />
          <Route path="/student-signup" element={<SignInStudent />} />
          <Route path="/admin-signup" element={<SignInAdmin />} />
          <Route path="/teacher-signup" element={<SignInTeacher />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/teachers-dashboard"
            element={<AdminTeacherDash />}
          />
          <Route path="/admin/teacher-info" element={<AdminTeacherInfo />} />
          <Route path="/admin/teacher-add" element={<AdminTeacherAdd />} />
          <Route
            path="/admin/students-dashboard"
            element={<AdminStudentDash />}
          />
          <Route path="/admin/student-info" element={<AdminStudentInfo />} />
          <Route path="/admin/student-add" element={<AdminStudentAdd />} />
          <Route
            path="/admin/subjects-dashboard"
            element={<AdminSubjecttAdd />}
          />

          <Route path="/teacher/subjects" element={<Subjects />} />
          <Route path="/teacher/feedback" element={<Feedback />} />
          <Route
            path="/teacher/feedback/student-feedback"
            element={<Student_Feedback />}
          />
          <Route path="/teacher/subjects/capstone-2" element={<Students />} />

          <Route path="/student" element={<StudentGrade />} />
          <Route
            path="/student/subject_feedback"
            element={<Teacher_Feedback />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
