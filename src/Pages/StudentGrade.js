import React from 'react'
import './css/table.css'
import {Link} from 'react-router-dom'
import StudentSidebar from '../Components/Student_Sidebar'
import './css/container.css'
import student_grade from './data/student_grade1'

function StudentGrade() {
  return (
    <>
    <StudentSidebar />
    <div className='container'>
    <h2>First Semester</h2>
    <table>
  <thead>
      <th>Subject Name</th>
      <th>1st Grading</th>
      <th>2nd Grading</th>
      <th>Average</th>
      <th>Remarks</th>
      <th>Feedback</th>
  </thead>
  <tbody>
    {student_grade.map((s_grade, index) =>{
      return( 
      <tr>
        <td data-label="Subject Name">{s_grade.subject}</td>
        <td data-label="1st Grading">{s_grade.first}</td>
        <td data-label="2nd Grading">{s_grade.second}</td>
        <td data-label="Average">{s_grade.average}</td>
        <td data-label="Remarks">{s_grade.remarks}</td>
        <td data-label="Feedback"><Link className='link' to='/student/subject_feedback'>
        <input type='button' class="btn red" value='Feedback' />
        </Link></td>
      </tr>

      );
    })}
   
  </tbody>
</table>
<input type='button' class="dl-pdf pdf" value='Download PDF' />



<h2 className='pad'>Second Semester</h2>
    <table>
  <thead>
      <th >Subject Name</th>
      <th >1st Grading</th>
      <th >2nd Grading</th>
      <th >Average</th>
      <th >Remarks</th>
      <th >Feedback</th>
  </thead>
  <tbody>
    {student_grade.map((s_grade, index) =>{
      return( 
      <tr>
        <td data-label="Subject Name">{s_grade.subject}</td>
        <td data-label="1st Grading">{s_grade.first}</td>
        <td data-label="2nd Grading">{s_grade.second}</td>
        <td data-label="Average">{s_grade.average}</td>
        <td data-label="Remarks">{s_grade.remarks}</td>
        <td data-label="Feedback"><Link className='link' to='/student/feedback'>
        <input type='button' class="btn red" value='Feedback' />
        </Link></td>
      </tr>

      );
    })}
   
  </tbody>
</table>
<input type='button' class="dl-pdf" value='Download PDF' />
</div>
</>
  )
}

export default StudentGrade