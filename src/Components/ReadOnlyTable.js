import React from 'react'
import * as FaIcons from 'react-icons/fa';

function ReadOnlyTable({student_grade, editclick}) {
  return (
    <tr>
        <td data-label="Student ID">{student_grade.student_id}</td>
        <td data-label="Student Name">{student_grade.student_name}</td>
        <td data-label="1st">{student_grade.first}</td>
        <td data-label="2nd">{student_grade.second}</td>
        <td data-label="Remarks">{student_grade.remarks}</td>
        <td data-label="Action">

        <button className='icons-grn' onClick={(event)=> editclick(event, student_grade)}><FaIcons.FaEdit/></button>
        </td>
      </tr>
  )
}

export default ReadOnlyTable




