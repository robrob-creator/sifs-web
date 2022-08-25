import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Subjects from './Pages/Subjects';
import Feedback from './Pages/Feedback'
import Student_Feedback from './Pages/Student_Feedback';
import Students from './Pages/Students';
import SignInChoices from './Pages/SignInChoices';
import SignInStudent from './Pages/SignInStudent';
import StudentGrade from './Pages/StudentGrade';
import Teacher_Feedback from './Pages/Teacher_Feedback';
import AdminDashboard from './Pages/AdminDashboard';
import AdminTeacherDash from './Pages/AdminTeacherDash';
import AdminStudentDash from './Pages/AdminStudentDash';
import AdminTeacherInfo from './Pages/AdminTeacherInfo';
import AdminTeacherAdd from './Pages/AdminTeacherAdd';
import AdminStudentInfo from './Pages/AdminStudentInfo';
import AdminStudentAdd from './Pages/AdminStudentAdd';
import SignInAdmin from './Pages/SignInAdmin';
import SignInTeacher from './Pages/SignInTeacher';
import AdminAccountChoice from './Pages/AdminAccountChoice';
import AdminTeacherAccounts from './Pages/AdminTeacherAccounts';
import AdminAccountStudents from './Pages/AdminAccountStudents';
import AdminTeacherAccountsEdit from './Pages/AdminTeacherAccountsEdit';
import AdminStudentAccountsEdit from './Pages/AdminStudentAccountsEdit';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
            <Route path='/' element={<SignInChoices/>} />
            <Route path='/student-signup' element={<SignInStudent/>} />
            <Route path='/admin-signup' element={<SignInAdmin/>} />
            <Route path='/teacher-signup' element={<SignInTeacher/>} />
    
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
            <Route path='/admin/teachers-dashboard' element={<AdminTeacherDash/>} />
            <Route path='/admin/teacher-info' element={<AdminTeacherInfo/>} />
            <Route path='/admin/teacher-add' element={<AdminTeacherAdd/>} />
            <Route path='/admin/students-dashboard' element={<AdminStudentDash/>} />
            <Route path='/admin/student-info' element={<AdminStudentInfo/>} />
            <Route path='/admin/student-add' element={<AdminStudentAdd/>} />
            <Route path='/admin/account-choice' element={<AdminAccountChoice/>} />
            <Route path='/admin/account-choice/teacher-accounts' element={<AdminTeacherAccounts/>} />
            <Route path='/admin/account-choice/teacher-accounts/edit' element={<AdminTeacherAccountsEdit/>} />
            <Route path='/admin/account-choice/student-accounts' element={<AdminAccountStudents/>} />
            <Route path='/admin/account-choice/student-accounts/edit' element={<AdminStudentAccountsEdit/>} />
            
    
            <Route path='/teacher/subjects' element={<Subjects/>} />
            <Route path='/teacher/feedback' element={<Feedback/>} />
            <Route path='/teacher/feedback/student-feedback' element={<Student_Feedback/>} />
            <Route path='/teacher/subjects/capstone-2' element={<Students />} />
    
            <Route path='/student' element={<StudentGrade />} /> 
            <Route path='/student/subject_feedback' element={<Teacher_Feedback />} /> 
      </Routes>
    </Router>
  </>
      
    
  );
};

export default App;
