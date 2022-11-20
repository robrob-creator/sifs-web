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
import TeacherFeedback from "./Pages/Teacher_Feedback";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminTeacherDash from "./Pages/AdminTeacherDash";
import AdminStudentDash from "./Pages/AdminStudentDash";
import AdminSectionDash from "./Pages/admin/sectionsDashboard";
import AdminTeacherInfo from "./Pages/AdminTeacherInfo";
import AdminTeacherAdd from "./Pages/AdminTeacherAdd";
import AdminStudentInfo from "./Pages/AdminStudentInfo";
import AdminStudentAdd from "./Pages/AdminStudentAdd";
import SignInAdmin from "./Pages/SignInAdmin";
import SignInTeacher from "./Pages/SignInTeacher";
import AdminAccountChoice from "./Pages/AdminAccountChoice";
import AdminTeacherAccounts from "./Pages/AdminTeacherAccounts";
import AdminAccountStudents from "./Pages/AdminAccountStudents";
import AdminTeacherAccountsEdit from "./Pages/AdminTeacherAccountsEdit";
import AdminStudentAccountsEdit from "./Pages/AdminStudentAccountsEdit";
import SubjectsDashboard from "./Pages/admin/subjectsDashboard";
import UploadGrades from "./Pages/admin/uploadGrades";
import Upload from "./Pages/admin/uploadGrades/uploadGrades";
import UploadStudentsList from "./Pages/admin/uploadGrades/students";
import UploadSubjectPage from "./Pages/admin/uploadGrades/subjects";
import FeedbackDashboard from "./Pages/admin/feedbackDashboard";
import TeacherFeedbacks from "./Pages/admin/teacherFeedback";
import SentFeedback from "./Pages/admin/studentFeedbak";
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
          <Route
            path="/admin/section-dashboard"
            element={<AdminSectionDash />}
          />
          <Route path="/admin/student-info" element={<AdminStudentInfo />} />
          <Route path="/admin/student-add" element={<AdminStudentAdd />} />
          <Route
            path="/admin/account-choice"
            element={<AdminAccountChoice />}
          />
          <Route
            path="/admin/account-choice/teacher-accounts"
            element={<AdminTeacherAccounts />}
          />
          <Route
            path="/admin/account-choice/teacher-accounts/edit"
            element={<AdminTeacherAccountsEdit />}
          />
          <Route
            path="/admin/account-choice/student-accounts"
            element={<AdminAccountStudents />}
          />
          <Route
            path="/admin/account-choice/student-accounts/edit"
            element={<AdminStudentAccountsEdit />}
          />
          <Route
            path="/admin/subjects-dashboard"
            element={<SubjectsDashboard />}
          />
          <Route path="/teacher/subjects" element={<Subjects />} />
          <Route path="/teacher/feedback" element={<Feedback />} />
          <Route
            path="/teacher/feedback/student-feedback"
            element={<Student_Feedback />}
          />
          <Route path="/grade" element={<UploadGrades />} />
          <Route path="/grade/students" element={<UploadStudentsList />} />
          <Route path="/grade/subjects" element={<UploadSubjectPage />} />
          <Route path="/grade/upload" element={<Upload />} />
          <Route path="/teacher/subjects/capstone-2" element={<Students />} />
          <Route path="/view/sent-feedbacks" element={<SentFeedback />} />
          <Route path="/student" element={<StudentGrade />} />
          <Route path="/feedbacks" element={<FeedbackDashboard />} />
          <Route
            path="/teacher/feedbacks-list"
            element={<TeacherFeedbacks />}
          />
          <Route
            path="/student/subject_feedback"
            element={<TeacherFeedback />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
