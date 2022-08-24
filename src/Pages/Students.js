import React from 'react'
import './css/table.css'
import './css/container.css'
import './css/icons.css'
import student_data from './data/grades'
import {useState, Fragment} from 'react'
import ReadOnlyTable from '../Components/ReadOnlyTable'
import Sidebar from '../Components/Sidebar' 
import EditTable from '../Components/EditTable'



function Students(){
  const [studentdatas, setstudentdatas] = useState(student_data);

  const [editStudentID, setEditStudentId] = useState(null);
  
  const [editFormData, setEditFormData] = useState({
    student_id:"",
    student_name:"",
    first: "",
    second: "", 
    remarks:""
  })

//change of table to forms in EditTable
  const EditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

//sdadsada

  
//edit submit form
  const formsubmit = (event) => {
    event.preventDefault();

    const editedData = {
      student_id:editStudentID,
      student_name:editFormData.student_name,
      first: editFormData.first,
      second: editFormData.second,
      remarks:editFormData.remarks,
    };

    const newData = [...studentdatas];

    const index = studentdatas.findIndex((student_grade) => student_grade.student_id === editStudentID);

    newData[index] = editedData;

    setstudentdatas(newData);
    setEditStudentId(null);
  };

//edit click button in ROT
  const editclick = (event, student_grade) => {
    event.preventDefault();
    setEditStudentId(student_grade.student_id);

    const formValues = {
      student_id:student_grade.student_id,
      student_name:student_grade.student_name,
      first: student_grade.first,
      second: student_grade.second,
      remarks:student_grade.remarks,
    }
    setEditFormData(formValues);
  }

//cancel click
const CancelClick = () => {
  setEditStudentId(null);
};
  return (
    <>
    <Sidebar />
    <div className='container'>
    <h2>Capstone 2</h2>

      <form onSubmit={formsubmit}>
    <table>
  <thead>
      <th>Student ID</th>
      <th>Student Name</th>
      <th>1st</th>
      <th>2nd</th>
      <th>Remarks</th>
      <th>Action</th>
  </thead> 
  <tbody>
    {studentdatas.map((student_grade) =>(
      <Fragment>

        {editStudentID === student_grade.student_id ? 
        (<EditTable editFormData = {editFormData} 
          EditFormChange={EditFormChange} 
          CancelClick={CancelClick}/>) 
        : 
        (<ReadOnlyTable student_grade={student_grade} editclick={editclick}  />)}

      </Fragment>
    ))}
   
  </tbody>
</table>
</form>

</div>
    </>
  )
}

export default Students